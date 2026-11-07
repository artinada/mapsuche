import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { splitLocale } from '../shared/locales.mjs';

const defaultDist = fileURLToPath(new URL('../dist/', import.meta.url));
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };

export async function createSiteServer(directory = defaultDist) {
  const manifest = JSON.parse(await fs.readFile(path.join(directory, 'route-manifest.json'), 'utf8'));
  return http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      const pathname = decodeURIComponent(url.pathname);
      if (pathname.startsWith('/api/')) { res.writeHead(404, { 'Content-Type': 'application/json', 'X-Robots-Tag': 'noindex' }); res.end('{"error":"API requests require the configured backend."}'); return; }
      if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return; }
      const redirect = manifest.redirects[pathname];
      if (redirect) { res.writeHead(301, { Location: redirect + url.search }); res.end(); return; }
      const document = manifest.documents[pathname];
      let filename = document ? document.file : pathname.replace(/^\//, '');
      let status = 200;
      const candidate = path.resolve(directory, filename);
      if (!candidate.startsWith(path.resolve(directory) + path.sep)) { res.writeHead(404); res.end(); return; }
      let content;
      try { content = await fs.readFile(candidate); }
      catch {
        if (path.extname(pathname) || pathname.startsWith('/assets/')) { res.writeHead(404, { 'X-Robots-Tag': 'noindex' }); res.end('Not found'); return; }
        filename = manifest.notFoundByLanguage[splitLocale(pathname).language]; status = 404;
        content = await fs.readFile(path.join(directory, filename));
      }
      const robots = status === 404 ? 'noindex, nofollow' : document?.robots;
      const headers = { 'Content-Type': mime[path.extname(filename)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' };
      if (robots) headers['X-Robots-Tag'] = robots;
      headers['Content-Language'] = document?.language || splitLocale(pathname).language;
      if (robots?.includes('noindex')) headers['Cache-Control'] = 'no-store';
      res.writeHead(status, headers);
      res.end(req.method === 'HEAD' ? undefined : content);
    } catch { res.writeHead(400, { 'X-Robots-Tag': 'noindex' }); res.end('Invalid request'); }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const argument = (name, fallback) => { const index = process.argv.indexOf(name); return index < 0 ? fallback : process.argv[index + 1]; };
  const host = argument('--host', '127.0.0.1');
  const port = Number(argument('--port', '4173'));
  const server = await createSiteServer();
  server.listen(port, host, () => console.log(`Production preview: http://${host}:${port}/`));
  server.on('error', error => { console.error(error.message); process.exitCode = 1; });
}
