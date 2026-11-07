import fs from 'node:fs';
import { readRoutePaths } from './update-sitemap.js';
import { buildRouteConfig } from './route-config.js';

export function localePlugin() {
  return { name: 'language-route-redirects', configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (!['GET', 'HEAD'].includes(req.method)) return next();
      const url = new URL(req.url, 'http://localhost');
      const routes = readRoutePaths(fs.readFileSync(new URL('../client/src/App.tsx', import.meta.url), 'utf8'));
      const target = buildRouteConfig(routes).redirects[url.pathname];
      if (!target) return next();
      res.writeHead(301, { Location: target + url.search }); res.end();
    });
  } };
}
