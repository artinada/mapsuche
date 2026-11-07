import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { languages, localizedPath } from '../shared/locales.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const origin = 'https://mapsuche.de';
const privateRoutes = new Set(['/geo-check/results', '/geo/dashboard']);

function parse(source, name, kind) {
  const tree = ts.createSourceFile(name, source, ts.ScriptTarget.Latest, true, kind);
  if (tree.parseDiagnostics.length) throw new Error(`Cannot parse ${name}; refusing to generate a partial sitemap.`);
  return tree;
}

export function readRoutePaths(source) {
  const tree = parse(source, 'App.tsx', ts.ScriptKind.TSX);
  const routes = [];
  function visit(node) {
    if ((ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) && node.tagName.getText(tree) === 'Route') {
      const attribute = node.attributes.properties.find(p => ts.isJsxAttribute(p) && p.name.getText(tree) === 'path');
      if (attribute) {
        const value = attribute.initializer;
        const literal = value && ts.isJsxExpression(value) ? value.expression : value;
        if (!literal || !ts.isStringLiteralLike(literal)) throw new Error('Route paths must be string literals for sitemap generation.');
        routes.push(literal.text);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  if (!routes.length) throw new Error('No app routes found.');
  if (new Set(routes).size !== routes.length) throw new Error('Duplicate app route paths found.');
  return routes;
}

export function readPublishedBlogPaths(source) {
  const tree = parse(source, 'blogConfig.ts', ts.ScriptKind.TS);
  let posts;
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(tree) === 'blogPosts') posts = node.initializer;
    ts.forEachChild(node, visit);
  }
  visit(tree);
  if (!posts || !ts.isArrayLiteralExpression(posts)) throw new Error('blogPosts must be an array literal.');
  const paths = new Set();
  for (const post of posts.elements) {
    if (!ts.isObjectLiteralExpression(post)) throw new Error('Unsupported blog post configuration.');
    const property = name => post.properties.find(p => ts.isPropertyAssignment(p) && p.name.getText(tree).replace(/^['"]|['"]$/g, '') === name)?.initializer;
    const published = property('published');
    if (!published || ![ts.SyntaxKind.TrueKeyword, ts.SyntaxKind.FalseKeyword].includes(published.kind)) throw new Error('Each blog post must declare a literal published status.');
    if (published.kind === ts.SyntaxKind.FalseKeyword) continue;
    const slug = property('slug');
    if (!slug || !ts.isStringLiteralLike(slug) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.text)) throw new Error('Invalid published blog slug.');
    const route = `/blog/${slug.text}`;
    if (paths.has(route)) throw new Error(`Duplicate published blog route: ${route}`);
    paths.add(route);
  }
  return paths;
}

const escapeXml = text => text.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character]);

export function generateSitemap(routes, publishedBlogPaths) {
  for (const route of publishedBlogPaths) {
    if (!routes.includes(route)) throw new Error(`Published blog post has no app route: ${route}`);
  }
  const publicPaths = routes.filter(route => {
    if (privateRoutes.has(route) || /[:*?]/.test(route)) return false;
    if (!route.startsWith('/') || route.startsWith('//') || route.includes('#')) throw new Error(`Invalid app route: ${route}`);
    return !route.startsWith('/blog/') || publishedBlogPaths.has(route);
  });
  if (!publicPaths.length || new Set(publicPaths).size !== publicPaths.length) throw new Error('Public sitemap routes are empty or duplicated.');
  // Blog date is a publication date, not a verified last-content-update date.
  // Omit optional lastmod/changefreq/priority rather than inventing freshness.
  const entries = publicPaths.flatMap(route => languages.map(language => `  <url>\n    <loc>${escapeXml(origin + localizedPath(route, language))}</loc>\n  </url>`)).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

export function updateSitemap() {
  const routes = readRoutePaths(fs.readFileSync(path.join(root, 'client/src/App.tsx'), 'utf8'));
  const blogs = readPublishedBlogPaths(fs.readFileSync(path.join(root, 'client/src/lib/blogConfig.ts'), 'utf8'));
  const xml = generateSitemap(routes, blogs);
  fs.writeFileSync(path.join(root, 'client/public/sitemap.xml'), xml);
  console.log(`Sitemap generated: ${(xml.match(/<loc>/g) || []).length} public URLs, including ${blogs.size} published articles.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { updateSitemap(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
