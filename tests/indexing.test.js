import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { once } from 'node:events';
import { createSiteServer } from '../scripts/serve-site.js';
import { hostingRules, renderDocument } from '../scripts/prerender.js';
import { readRoutePaths } from '../scripts/update-sitemap.js';
import { buildRouteConfig } from '../scripts/route-config.js';
import { localizedPath, splitLocale } from '../shared/locales.mjs';

const read = relative => fs.readFile(new URL(relative, import.meta.url), 'utf8');
const manifest = JSON.parse(await read('../dist/route-manifest.json'));
const sitemap = await read('../dist/sitemap.xml');
const publicPaths = [...sitemap.matchAll(/<loc>https:\/\/mapsuche\.de([^<]*)<\/loc>/g)].map(match => match[1]);
const baseRoutes = readRoutePaths(await read('../client/src/App.tsx'));
const { paths: routes } = buildRouteConfig(baseRoutes);

test('every router path has a built document, public text and its own metadata before JavaScript', async () => {
  assert.deepEqual(Object.keys(manifest.documents), routes);
  const titles = { en: new Set(), de: new Set() };
  for (const [route, document] of Object.entries(manifest.documents)) {
    const html = await read(`../dist/${document.file}`);
    assert.match(html, /<main[^>]*>[\s\S]*?<h1[\s>]/, route);
    const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1].replace(/<[^>]*>/g, '').trim();
    assert.ok(main.length > 50, `Missing main text: ${route}`);
    const canonical = `https://mapsuche.de${route}`;
    const language = splitLocale(route).language;
    assert.ok(html.includes(`<html lang="${language}"`), route);
    for (const link of html.matchAll(/<a[^>]+href="(\/[^\"]*)"/g)) {
      assert.ok(/^\/(en|de)\//.test(link[1]), `Unlocalized internal link on ${route}: ${link[1]}`);
      const target = new URL(link[1].replaceAll('&amp;', '&'), 'https://mapsuche.de').pathname;
      assert.ok(manifest.documents[target], `Internal link has no document: ${target}`);
    }
    assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`), route);
    assert.ok(html.includes(`<meta property="og:url" content="${canonical}"`), route);
    for (const key of ['description', 'twitter:title', 'twitter:description']) {
      assert.equal([...html.matchAll(new RegExp(`<meta name="${key}" content="([^"]+)"`, 'g'))].length, 1, `${route}: ${key}`);
    }
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title && !titles[language].has(title), `Missing/duplicate title: ${route}`);
    titles[language].add(title);
    const decode = text => text.replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&quot;', '"');
    assert.ok(decode(title).length <= 65, `Review long title: ${route}`);
    assert.ok(decode(html.match(/<meta name="description" content="([^"]+)"/)[1]).length <= 160, `Review long description: ${route}`);
    const robots = publicPaths.includes(route) ? 'index, follow' : 'noindex, follow';
    for (const name of ['robots', 'googlebot']) assert.ok(html.includes(`<meta name="${name}" content="${robots}"`), route);
    assert.equal(document.robots, robots);
    assert.ok(html.includes(`data-hydrate="${publicPaths.includes(route)}"`));
    if (publicPaths.includes(route)) {
      const schema = JSON.parse(html.match(/<script type="application\/ld\+json" data-page-schema="true">(.*?)<\/script>/s)[1]);
      assert.equal(schema.url, canonical);
      assert.equal(schema['@type'], 'WebPage');
      assert.equal(schema.inLanguage, language);
      const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
      assert.equal(alternates.length, 3, route);
      for (const alternateLanguage of ['en', 'de', 'x-default']) {
        const target = localizedPath(route, alternateLanguage === 'x-default' ? 'en' : alternateLanguage);
        assert.ok(publicPaths.includes(target), `Alternate is not public: ${target}`);
        assert.ok(alternates.some(match => match[1] === alternateLanguage && match[2] === `https://mapsuche.de${target}`));
        const alternateDocument = await read(`../dist/${manifest.documents[target].file}`);
        assert.ok(alternateDocument.includes(`href="${canonical}"`), `Missing reciprocal alternate: ${target} -> ${route}`);
      }
    } else assert.ok(!sitemap.includes(`<loc>${canonical}</loc>`));
    if (!publicPaths.includes(route)) assert.ok(!html.includes('hreflang="'));
    const ownLocale = language === 'de' ? 'de_DE' : 'en_GB';
    const otherLocale = language === 'de' ? 'en_GB' : 'de_DE';
    assert.ok(html.includes(`<meta property="og:locale" content="${ownLocale}"`));
    assert.ok(html.includes(`<meta property="og:locale:alternate" content="${otherLocale}"`));
  }
});

test('404 HTML is readable, has no canonical and cannot be indexed', async () => {
  const html = await read('../dist/404.html');
  assert.match(html, /404 Page Not Found/);
  assert.ok(!html.includes('rel="canonical"'));
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.match(html, /name="googlebot" content="noindex, nofollow"/);
  const german = await read('../dist/de/404.html');
  assert.match(german, /<html lang="de"/);
  assert.match(german, /404 Seite nicht gefunden/);
  assert.ok(!german.includes('rel="canonical"') && !german.includes('hreflang="'));
});

test('hosting rules rewrite only known pages and preserve genuine 404 responses', async () => {
  const rules = JSON.parse(await read('../hosting/amplify-rules.json'));
  assert.deepEqual(rules, hostingRules(baseRoutes));
  assert.ok(!rules.some(rule => rule.source.includes('<*>')));
  assert.ok(rules.every(rule => ['301', '200'].includes(rule.status)));
  for (const route of routes) {
    assert.ok(rules.some(rule => rule.source === route && rule.status === '200' && rule.target === `${route.replace(/\/$/, '')}/index.html`));
  }
  for (const rule of rules.filter(rule => rule.status === '301')) {
    assert.ok(manifest.documents[rule.target], `Redirect must resolve in one hop: ${rule.source}`);
    assert.ok(!manifest.redirects[rule.target], `Redirect loop: ${rule.source}`);
  }
});

test('metadata is escaped and cannot introduce executable markup', () => {
  const document = renderDocument('<html lang="en"><head><title>Default</title></head><body><div id="root"></div></body></html>', '<main>Safe body</main>', {
    language: 'en', title: '<img onerror="alert(1)">', description: '"/><script>alert(1)</script>', robots: 'index, follow',
    structuredData: { name: '</script><script>alert(1)</script>' },
  });
  assert.ok(!document.includes('<script>alert(1)</script>'));
  assert.match(document, /&lt;img onerror=&quot;/);
  assert.match(document, /\\u003c\/script>/);
});

test('production server returns correct page, redirect, missing asset and private-view responses', async () => {
  const server = await createSiteServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    for (const route of routes) {
      const response = await fetch(base + route);
      assert.equal(response.status, 200, route);
      assert.match(response.headers.get('content-type'), /text\/html/);
      assert.equal(response.headers.get('x-robots-tag'), manifest.documents[route].robots);
      assert.equal(response.headers.get('content-language'), splitLocale(route).language);
      assert.match(await response.text(), /<main/);
      if (!publicPaths.includes(route)) assert.equal(response.headers.get('cache-control'), 'no-store');
    }
    for (const [source, target] of [['/', '/en/'], ['/en', '/en/'], ['/de', '/de/'], ['/maps', '/en/services/google-maps'], ['/de/maps', '/de/services/google-maps'], ['/website', '/en/services/website'], ['/services/', '/en/services'], ['/services.html', '/en/services'], ['/de/services/', '/de/services'], ['/de/services/index.html', '/de/services'], ['/geo-check/results', '/en/geo-check/results']]) {
      const response = await fetch(`${base}${source}?ref=test`, { redirect: 'manual' });
      assert.equal(response.status, 301);
      assert.equal(response.headers.get('location'), target + '?ref=test');
    }
    const missing = await fetch(base + '/not-a-real-page');
    assert.equal(missing.status, 404);
    assert.equal(missing.headers.get('x-robots-tag'), 'noindex, nofollow');
    assert.match(await missing.text(), /404 Page Not Found/);
    const germanMissing = await fetch(base + '/de/not-a-real-page');
    assert.equal(germanMissing.status, 404);
    assert.equal(germanMissing.headers.get('content-language'), 'de');
    assert.match(await germanMissing.text(), /404 Seite nicht gefunden/);
    for (const route of ['/assets/missing.js', '/missing.css', '/api/missing']) {
      const response = await fetch(base + route);
      assert.equal(response.status, 404, route);
      assert.ok(!(await response.text()).includes('<html'), route);
    }
    const home = await (await fetch(base)).text();
    const asset = home.match(/<script[^>]+src="([^"]+\.js)"/)[1];
    const javascript = await fetch(base + asset);
    assert.equal(javascript.status, 200);
    assert.match(javascript.headers.get('content-type'), /javascript/);
    assert.equal((await fetch(base + '/en/services', { method: 'HEAD' })).status, 200);
    assert.equal((await fetch(base + '/en/services', { method: 'POST' })).status, 405);
  } finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
});

test('language URL helpers preserve report access parameters and distinguish language prefixes', () => {
  assert.equal(localizedPath('/en/geo-check/results?id=abc#token=private', 'de'), '/de/geo-check/results?id=abc#token=private');
  assert.equal(localizedPath('/de/', 'en'), '/en/');
  assert.equal(splitLocale('/dentist').prefix, '');
  assert.equal(splitLocale('/de/services?ref=source#section').pathname, '/services');
});
