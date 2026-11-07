import { createReport, GeoError, hashToken, publicReport, validToken, validateInput } from './core.ts';
import type { GeoStore } from './core.ts';

export interface GeoRequest { method: string; path: string; body?: string; token?: string; client: string }
export interface GeoRuntime { store: GeoStore; model: string; configured: boolean; enqueue: (id: string) => Promise<void> }

export async function geoApi(request: GeoRequest, runtime: GeoRuntime) {
  try {
    const { method, path } = request;
    if (path === '/checks' && method === 'POST') {
      if (!runtime.configured) throw new GeoError(503, 'Der GEO Check ist noch nicht eingerichtet. Bitte versuchen Sie es später.');
      if (!request.body || Buffer.byteLength(request.body) > 4096) throw new GeoError(400, 'Die Anfrage ist ungültig oder zu groß.');
      let value: unknown;
      try { value = JSON.parse(request.body); } catch { throw new GeoError(400, 'Ungültige Anfrage.'); }
      const { report, ticket } = createReport(validateInput(value), runtime.model);
      await runtime.store.reserve(report, hashToken(request.client));
      try { await runtime.enqueue(report.id); }
      catch {
        report.status = 'failed'; report.analysisStatus = 'unavailable'; report.error = 'Die Prüfung konnte nicht gestartet werden.';
        await runtime.store.save(report);
        throw new GeoError(503, 'Die Prüfung konnte nicht gestartet werden. Bitte versuchen Sie es später.');
      }
      return { status: 202, body: ticket };
    }
    const match = /^\/checks\/([a-f0-9-]{36})$/.exec(path);
    if (match && ['GET', 'DELETE'].includes(method)) {
      const stored = await runtime.store.get(match[1]);
      if (!stored || stored.expiresAt <= Math.floor(Date.now() / 1000) || !validToken(request.token || '', stored.tokenHash)) throw new GeoError(404, 'Bericht nicht gefunden oder Zugriff abgelaufen.');
      // Surface workers interrupted by a timeout or a dev-server restart instead of polling forever.
      if (['queued', 'running'].includes(stored.status) && Date.now() - Date.parse(stored.updatedAt) > 8 * 60_000) {
        stored.status = stored.metrics.successful ? 'partial' : 'failed';
        stored.error = 'Die Prüfung wurde unterbrochen. Bitte starten Sie einen neuen Check.';
        stored.analysisStatus = 'failed';
      }
      if (method === 'DELETE') {
        if (['queued', 'running'].includes(stored.status)) throw new GeoError(409, 'Bitte warten Sie, bis die Prüfung abgeschlossen ist.');
        await runtime.store.remove(stored.id);
        return { status: 200, body: { deleted: true } };
      }
      return { status: 200, body: publicReport(stored) };
    }
    throw new GeoError(404, 'Endpunkt nicht gefunden.');
  } catch (error) {
    return { status: error instanceof GeoError ? error.status : 500, body: { error: error instanceof GeoError ? error.message : 'Der Bericht konnte nicht gespeichert oder geladen werden. Bitte versuchen Sie es später.' } };
  }
}
