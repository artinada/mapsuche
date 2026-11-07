import type { Plugin } from 'vite';
import { loadEnv } from 'vite';
import { geoApi } from './api.ts';
import { openAIClient, runReport } from './core.ts';
import { localStore } from './local-store.ts';
import path from 'node:path';

export function geoPlugin(): Plugin {
  return { name: 'local-geo-api', configureServer(server) {
    const store = localStore(path.resolve('.local-data/geo'));
    server.middlewares.use('/api/geo', async (req, res) => {
      const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
      const origin = req.headers.origin;
      if (origin && !['http://localhost:3000', 'http://127.0.0.1:3000'].includes(origin)) { res.writeHead(403, headers); res.end(JSON.stringify({ error: 'Diese Herkunft ist nicht erlaubt.' })); return; }
      if (req.method === 'POST' && !req.headers['content-type']?.startsWith('application/json')) { res.writeHead(415, headers); res.end(JSON.stringify({ error: 'JSON erwartet.' })); return; }
      let body = '';
      try {
        for await (const chunk of req) {
          body += chunk.toString();
          if (Buffer.byteLength(body) > 4096) { res.writeHead(413, headers); res.end(JSON.stringify({ error: 'Die Anfrage ist zu groß.' })); return; }
        }
        // Read server credentials for each request so replacing .env.local does
        // not leave a long-running development server using a rejected key.
        const env = { ...loadEnv(server.config.mode, server.config.envDir, ''), ...process.env };
        const result = await geoApi({ method: req.method || '', path: (req.url || '').split('?')[0], body,
          token: typeof req.headers['x-geo-token'] === 'string' ? req.headers['x-geo-token'] : '', client: req.socket.remoteAddress || 'local' }, {
          store, configured: Boolean(env.OPENAI_API_KEY), model: env.GEO_MODEL || 'gpt-5.6-terra',
          enqueue: async id => { setImmediate(() => { void runReport(id, store, openAIClient(env.OPENAI_API_KEY)).catch(() => console.error('GEO worker failed; see saved report status.')); }); },
        });
        res.writeHead(result.status, headers); res.end(JSON.stringify(result.body));
      } catch { res.writeHead(500, headers); res.end(JSON.stringify({ error: 'Der GEO Check ist momentan nicht verfügbar.' })); }
    });
  } };
}
