import outputs from '../../../amplify_outputs.json';
import type { GeoInput, GeoReport, GeoTicket } from '../../../shared/geo';
export type { GeoReport, GeoTicket } from '../../../shared/geo';

const historyKey = 'mapsuche.geo.reports.v1';
const custom = (outputs as unknown as { custom?: { geoApiUrl?: string } }).custom;
const env = (import.meta as ImportMeta & { env: { DEV: boolean; VITE_GEO_API_URL?: string } }).env;
const base = (env.VITE_GEO_API_URL || (env.DEV ? '/api/geo' : custom?.geoApiUrl) || '').replace(/\/$/, '');

export function savedTickets(): GeoTicket[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(historyKey) || '[]');
    if (!Array.isArray(value)) return [];
    return value.filter((v): v is GeoTicket => v && typeof v.id === 'string' && typeof v.token === 'string' && typeof v.createdAt === 'string').slice(0, 30);
  } catch { return []; }
}
export function saveTicket(ticket: GeoTicket) {
  try { localStorage.setItem(historyKey, JSON.stringify([ticket, ...savedTickets().filter(t => t.id !== ticket.id)].slice(0, 30))); }
  catch { /* The token remains in the URL fragment when storage is unavailable. */ }
}
export function forgetTicket(id: string) {
  try { localStorage.setItem(historyKey, JSON.stringify(savedTickets().filter(t => t.id !== id))); } catch { /* Storage is optional. */ }
}
export function reportUrl(ticket: GeoTicket) { return `/geo-check/results?id=${encodeURIComponent(ticket.id)}#token=${encodeURIComponent(ticket.token)}`; }

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!base) throw new Error('Der GEO Check ist noch nicht eingerichtet. Bitte versuchen Sie es später.');
  let response: Response;
  try { response = await fetch(`${base}${path}`, { ...options, signal: AbortSignal.timeout(25_000), cache: 'no-store' }); }
  catch { throw new Error('Der GEO-Dienst ist nicht erreichbar. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es erneut.'); }
  let data: unknown;
  try { data = await response.json(); } catch { throw new Error('Der GEO-Dienst hat keine gültige Antwort geliefert.'); }
  if (!response.ok) throw new Error((data as { error?: string }).error || 'Die Anfrage konnte nicht verarbeitet werden.');
  return data as T;
}
export const startCheck = (input: GeoInput) => request<GeoTicket>('/checks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) });
export const getReport = (ticket: GeoTicket) => request<GeoReport>(`/checks/${encodeURIComponent(ticket.id)}`, { headers: { 'X-Geo-Token': ticket.token } });
export const deleteReport = (ticket: GeoTicket) => request(`/checks/${encodeURIComponent(ticket.id)}`, { method: 'DELETE', headers: { 'X-Geo-Token': ticket.token } });
