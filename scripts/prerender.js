import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { readRoutePaths, readPublishedBlogPaths, generateSitemap } from './update-sitemap.js';
import { buildRouteConfig, hostingRules } from './route-config.js';
export { hostingRules } from './route-config.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const serverOut = path.join(root, '.local-data/prerender/server');
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

export function renderDocument(template, html, seo, hydrate = true) {
  let output = template.replace(/<html\s+lang="[^"]*"/, `<html lang="${seo.language}"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`)
    .replace(/<div id="root"><\/div>/, `<div id="root" data-hydrate="${hydrate}">${html}</div>`);
  const meta = (attribute, name, content) => {
    const expression = new RegExp(`<meta\\s+${attribute}="${name}"[^>]*>`, 'g');
    output = output.replace(expression, '');
    if (content !== undefined) output = output.replace('</head>', `  <meta ${attribute}="${name}" content="${escapeHtml(content)}" />\n  </head>`);
  };
  meta('name', 'description', seo.description);
  meta('name', 'robots', seo.robots);
  meta('name', 'googlebot', seo.robots);
  meta('name', 'twitter:title', seo.title);
  meta('name', 'twitter:description', seo.description);
  meta('property', 'og:title', seo.title);
  meta('property', 'og:description', seo.description);
  meta('property', 'og:url', seo.canonicalUrl);
  meta('property', 'og:locale', seo.language === 'de' ? 'de_DE' : 'en_GB');
  meta('property', 'og:locale:alternate', seo.language === 'de' ? 'en_GB' : 'de_DE');
  output = output.replace(/<link\s+rel="canonical"[^>]*>/g, '');
  output = output.replace(/<link\s+[^>]*hreflang="[^"]*"[^>]*>/g, '');
  for (const alternate of seo.alternates || []) output = output.replace('</head>', `  <link rel="alternate" hreflang="${alternate.language}" href="${escapeHtml(alternate.href)}" />\n  </head>`);
  if (seo.canonicalUrl) output = output.replace('</head>', `  <link rel="canonical" href="${escapeHtml(seo.canonicalUrl)}" />\n  </head>`);
  if (seo.structuredData) output = output.replace('</head>', `  <script type="application/ld+json" data-page-schema="true">${JSON.stringify(seo.structuredData).replace(/</g, '\\u003c')}</script>\n  </head>`);
  return output;
}

export async function prerender() {
  const routes = readRoutePaths(await fs.readFile(path.join(root, 'client/src/App.tsx'), 'utf8'));
  const published = readPublishedBlogPaths(await fs.readFile(path.join(root, 'client/src/lib/blogConfig.ts'), 'utf8'));
  const publicPaths = [...generateSitemap(routes, published).matchAll(/<loc>https:\/\/mapsuche\.de([^<]*)<\/loc>/g)].map(match => match[1]);
  process.env.NODE_ENV = 'production';
  await build({ configFile: false, plugins: [react()], root: path.join(root, 'client'), logLevel: 'warn',
    resolve: { alias: { '@': path.join(root, 'client/src') } },
    build: { ssr: path.join(root, 'client/src/entry-server.tsx'), outDir: serverOut, emptyOutDir: true, target: 'node22' },
  });
  const { render } = await import(pathToFileURL(path.join(serverOut, 'entry-server.js')).href);
  const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
  const documents = {};
  const { paths, redirects } = buildRouteConfig(routes);
  for (const route of paths) {
    const { html, seo } = render(route);
    if (!seo.found) throw new Error(`Missing SEO metadata for app route ${route}`);
    if (!html.includes('<main') || !html.includes('<h1')) throw new Error(`Missing prerendered main text or H1 for ${route}`);
    if (publicPaths.includes(route) !== (seo.robots === 'index, follow')) throw new Error(`Sitemap/indexing policy mismatch for ${route}`);
    const filename = `${route.slice(1).replace(/\/$/, '')}/index.html`;
    const destination = path.join(dist, filename);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, renderDocument(template, html, seo, publicPaths.includes(route)));
    documents[route] = { file: filename, status: 200, robots: seo.robots, language: seo.language };
  }
  for (const language of ['en', 'de']) {
    const missing = render(`/${language}/__not_found__`);
    const document = renderDocument(template, missing.html, missing.seo, false);
    await fs.writeFile(path.join(dist, `${language}/404.html`), document);
    if (language === 'en') await fs.writeFile(path.join(dist, '404.html'), document);
  }
  await fs.writeFile(path.join(dist, 'index.html'), '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex, follow"><meta http-equiv="refresh" content="0;url=/en/"><title>MapSuche</title></head><body><a href="/en/">MapSuche — English</a> · <a href="/de/">Deutsch</a></body></html>');
  await fs.writeFile(path.join(dist, 'route-manifest.json'), JSON.stringify({ version: 2, documents, redirects, notFound: '404.html', notFoundByLanguage: { en: 'en/404.html', de: 'de/404.html' } }, null, 2) + '\n');
  await fs.mkdir(path.join(root, 'hosting'), { recursive: true });
  await fs.writeFile(path.join(root, 'hosting/amplify-rules.json'), JSON.stringify(hostingRules(routes), null, 2) + '\n');
  console.log(`Prerendered ${publicPaths.length} public language pages, ${paths.length - publicPaths.length} noindex views, and EN/DE 404 documents.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  prerender().catch(error => { console.error(error); process.exitCode = 1; });
}
