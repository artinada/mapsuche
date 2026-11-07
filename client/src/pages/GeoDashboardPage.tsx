import { useGeoLanguage } from '@/hooks/useGeoLanguage';
import { useState } from 'react';
import { Link } from 'wouter';
import { useQueries } from '@tanstack/react-query';
import { ArrowRight, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { deleteReport, forgetTicket, getReport, reportUrl, savedTickets } from '@/lib/geo';
import type { GeoTicket } from '@/lib/geo';

export default function GeoDashboardPage() {
  const { g, locale } = useGeoLanguage();
  const [tickets, setTickets] = useState(savedTickets);
  const [period, setPeriod] = useState('30');
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState('');
  const queries = useQueries({ queries: tickets.map(ticket => ({ queryKey: ['geo-report', ticket.id, ticket.token], queryFn: () => getReport(ticket), retry: 1,
    refetchInterval: (state: { state: { data?: { status: string } } }) => ['queued', 'running'].includes(state.state.data?.status || '') ? 5000 : false,
  })) });
  async function remove(ticket: GeoTicket) {
    setDeleting(ticket.id); setError('');
    try { await deleteReport(ticket); forgetTicket(ticket.id); setTickets(savedTickets()); }
    catch (err) { setError(err instanceof Error ? err.message : g("Bericht konnte nicht gelöscht werden.")); }
    finally { setDeleting(''); }
  }
  const visible = tickets.map((ticket, i) => ({ ticket, query: queries[i] })).filter(({ ticket }) => Date.now() - Date.parse(ticket.createdAt) <= Number(period) * 86400_000);
  return <div className="min-h-screen bg-gray-50 py-12"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-wrap justify-between gap-5 items-start mb-8"><div><p className="uppercase tracking-wide text-primary font-semibold text-xs mb-2">GEO Analytics</p><h1 className="text-3xl font-bold">{g("Ihre gespeicherten GEO Checks")}</h1><p className="text-gray-600 mt-3">{g("Echte Ergebnisse Ihrer bisherigen Prüfungen. Zugriffsschlüssel werden in diesem Browser gespeichert; Berichte bleiben 30 Tage abrufbar.")}</p></div><select aria-label={g("Zeitraum")} value={period} onChange={e=>setPeriod(e.target.value)} className="border bg-white rounded-lg px-4 py-3"><option value="7">{g("Letzte 7 Tage")}</option><option value="30">{g("Letzte 30 Tage")}</option></select></div>
    <Link href="/geo-check"><Button className="bg-primary text-white mb-8">{g("Kostenlosen Check starten")} <ArrowRight className="ml-2 h-4 w-4"/></Button></Link>
    {error && <p role="alert" className="text-red-700 mb-6">{g(error)}</p>}
    {!visible.length && <Card><CardContent className="p-8"><h2 className="text-xl font-semibold mb-3">{g("Noch keine Berichte in diesem Zeitraum")}</h2><p className="text-gray-600">{g("Starten Sie Ihren ersten GEO Check. Es werden drei lokale Suchfragen mit OpenAI-Websuche geprüft und ausgewertet.")}</p></CardContent></Card>}
    <div className="grid md:grid-cols-2 gap-6">{visible.map(({ ticket, query }) => {
      const report = query.data;
      const running = report && ['queued', 'running'].includes(report.status);
      return <Card key={ticket.id}><CardContent className="p-6">
        {query.isPending && <p role="status" className="flex gap-2 items-center"><Loader2 className="animate-spin h-4 w-4"/> {g("Bericht wird geladen…")}</p>}
        {query.isError && <div><p role="alert" className="text-red-700 text-sm">{g(query.error.message)}</p><div className="flex gap-4 mt-4"><button onClick={() => void query.refetch()} className="text-primary underline text-sm">{g("Erneut laden")}</button><button className="text-gray-600 underline text-sm" onClick={() => { forgetTicket(ticket.id); setTickets(savedTickets()); }}>{g("Aus Browserliste entfernen")}</button></div><p className="text-xs text-gray-500 mt-2">{g("Das Entfernen aus der Liste löscht keinen Bericht auf dem Server.")}</p></div>}
        {report && <><h2 className="text-xl font-semibold break-words">{report.input.business}</h2><p className="text-sm text-gray-600 mt-1">{report.input.city} · {report.input.service}</p><p className="text-xs text-gray-500 mt-2">{new Date(report.createdAt).toLocaleString(locale)}</p>
          <p className="my-4 text-sm font-medium">{running ? g("Prüfung läuft · {count}/3 bearbeitet", { count: report.answers.length }) : report.status === 'completed' ? g("Abgeschlossen") : report.status === 'partial' ? g("Teilweise abgeschlossen") : g("Fehlgeschlagen")}</p>
          <div className="grid grid-cols-2 gap-4 mb-5"><div><p className="text-2xl font-bold">{report.metrics.mentionRate === null ? '—' : `${report.metrics.mentionRate} %`}</p><p className="text-xs text-gray-500">{g("Namensnennung")}</p></div><div><p className="text-2xl font-bold">{report.metrics.citationRate === null ? '—' : `${report.metrics.citationRate} %`}</p><p className="text-xs text-gray-500">{g("Website zitiert")}</p></div></div>
          <div className="flex flex-wrap items-center justify-between gap-3"><Link href={reportUrl(ticket)} className="text-primary font-semibold hover:underline">{g("Bericht öffnen →")}</Link>{!running && <Button aria-label={g("Bericht von {business} löschen", { business: report.input.business })} variant="ghost" disabled={Boolean(deleting)} onClick={() => void remove(ticket)}><Trash2 className="h-4 w-4 mr-2"/>{deleting === ticket.id ? g("Wird gelöscht…") : g("Löschen")}</Button>}</div>
        </>}
      </CardContent></Card>;
    })}</div>
    <p className="text-sm text-gray-500 mt-8">{g("Jeder Check ist eine einzelne Momentaufnahme. Dieses Dashboard führt keine automatischen Folgeprüfungen aus.")}</p>
  </div></div>;
}
