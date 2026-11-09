import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { readRoutePaths, readPublishedBlogPaths, generateSitemap } from '../scripts/update-sitemap.js';
import { languages, localizedPath } from '../shared/locales.mjs';

test('uses current static app routes and excludes dynamic and private reports', () => {
  const routes = readRoutePaths(`const App = () => <Switch>
    <Route path="/" component={Home} />
    <Route path="/services/google-maps" component={Maps} />
    <Route path={'/services/website'} component={Website} />
    <Route path="/geo-check" component={Check} />
    <Route path="/geo-check/results" component={Results} />
    <Route path="/geo/dashboard" component={Dashboard} />
    <Route path="/business/:id" component={Business} />
    <Route component={NotFound} />
  </Switch>`);
  const xml = generateSitemap(routes, new Set());
  for (const language of languages) {
    assert.ok(xml.includes(`https://mapsuche.de/${language}/services/google-maps`));
    assert.ok(xml.includes(`https://mapsuche.de/${language}/services/website`));
    assert.ok(xml.includes(`https://mapsuche.de/${language}/geo-check`));
  }
  for (const excluded of ['/geo-check/results', '/geo/dashboard', '/business/:id', 'lastmod', 'changefreq', 'priority']) assert.ok(!xml.includes(excluded));
});

test('includes only published blog posts and does not treat publication dates as lastmod', () => {
  const posts = readPublishedBlogPaths(`const blogPosts: BlogPost[] = [
    { slug: 'published', title: {en: 'Nested metadata'}, date: '2024-01-01', published: true },
    { slug: 'draft', published: false }
  ];`);
  const xml = generateSitemap(['/', '/blog', '/blog/published', '/blog/draft'], posts);
  for (const language of languages) assert.ok(xml.includes(`/${language}/blog/published`));
  assert.ok(!xml.includes('/blog/draft'));
  assert.ok(!xml.includes('2024-01-01'));
});

test('fails when a published article has no matching route or source cannot be parsed safely', () => {
  assert.throws(() => generateSitemap(['/'], new Set(['/blog/missing'])), /no app route/);
  assert.throws(() => readRoutePaths('<Route path={variable} />'), /string literals/);
  assert.throws(() => readRoutePaths('<><Route path="/"/><Route path="/"/></>'), /Duplicate/);
  assert.throws(() => readRoutePaths('<Route path="/"'), /Cannot parse/);
  assert.throws(() => readPublishedBlogPaths('const blogPosts = [{slug:"test",published:flag}]'), /published status/);
});

test('escapes XML URL characters', () => {
  const xml = generateSitemap(['/offers/a&b'], new Set());
  assert.ok(xml.includes('/offers/a&amp;b'));
});

test('checked-in sitemap covers the actual router and every published article without obsolete URLs', () => {
  const read = relative => fs.readFileSync(new URL(relative, import.meta.url), 'utf8');
  const routes = readRoutePaths(read('../client/src/App.tsx'));
  const blogs = readPublishedBlogPaths(read('../client/src/lib/blogConfig.ts'));
  const xml = read('../client/public/sitemap.xml');
  assert.equal(xml, generateSitemap(routes, blogs));
  const paths = [...xml.matchAll(/<loc>https:\/\/mapsuche\.de([^<]*)<\/loc>/g)].map(match => match[1]);
  for (const required of ['/services/google-maps', '/services/business-profile', '/services/website', '/services/ablauf-audit', '/geo-check', '/geo-optimierung', '/blog/mobile-first-lokale-unternehmen', '/blog/google-bewertungen-richtig-managen', '/blog/local-seo-grundlagen-kleine-unternehmen']) for (const language of languages) assert.ok(paths.includes(localizedPath(required, language)));
  for (const obsolete of ['/maps', '/website', '/business-profile', '/blog/mobile-first-lokale-unternehmen-optimierung']) assert.ok(!paths.includes(obsolete));
  for (const route of blogs) for (const language of languages) assert.ok(paths.includes(localizedPath(route, language)));
  assert.equal(paths.length, new Set(paths).size, 'Sitemap URLs must be unique');
  for (const language of languages) assert.ok(paths.includes(localizedPath('/blog/wie-wird-mein-unternehmen-bei-chatgpt-gefunden', language)));
  assert.equal(paths.filter(route => route.startsWith('/en/')).length, paths.filter(route => route.startsWith('/de/')).length);
  assert.ok(paths.every(route => /^\/(en|de)\//.test(route)));
});
