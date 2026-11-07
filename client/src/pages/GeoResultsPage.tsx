import { useGeoLanguage } from '@/hooks/useGeoLanguage';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link, useSearch } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink, Info, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getReport, savedTickets, saveTicket } from '@/lib/geo';
import type { GeoAnswer } from '../../../shared/geo';

function CitedAnswer({ answer }: { answer: GeoAnswer }) {
  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const [index, source] of [...answer.citations].sort((a, b) => a.start - b.start).entries()) {
    if (source.start < cursor || source.end <= source.start || source.end > answer.text.length) continue;
    parts.push(answer.text.slice(cursor, source.start));
    parts.push(<a key={index} href={source.url} target="_blank" rel="noopener noreferrer" title={source.title} className="text-primary underline font-medium">{answer.text.slice(source.start, source.end)}</a>);
    cursor = source.end;
  }
  parts.push(answer.text.slice(cursor));
  return <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed break-words">{parts}</div>;
}

export default function GeoResultsPage() {
  const { g, locale } = useGeoLanguage();
  const id = new URLSearchParams(useSearch()).get('id') || '';
  const fragmentToken = new URLSearchParams(typeof window === 'undefined' ? '' : window.location.hash.slice(1)).get('token');
  const ticket = fragmentToken ? { id, token: fragmentToken, createdAt: new Date().toISOString() } : savedTickets().find(t => t.id === id);
  const query = useQuery({ queryKey: ['geo-report', id, ticket?.token], queryFn: () => getReport(ticket!), enabled: Boolean(id && ticket?.token), retry: 1,
    refetchInterval: state => ['queued', 'running'].includes(state.state.data?.status || '') ? 2500 : false,
  });
  const report = query.data;
  useEffect(() => { if (ticket?.id && fragmentToken) saveTicket({ ...ticket, createdAt: report?.createdAt || ticket.createdAt }); }, [id, fragmentToken, report?.createdAt]);
  const running = report && ['queued', 'running'].includes(report.status);
  function download() {
    if (!report) return;
    const url = URL.createObjectURL(new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = `geo-check-${report.id}.json`; link.click(); URL.revokeObjectURL(url);
  }
  return <div className="min-h-screen bg-gray-50 py-12"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <Link href="/geo/dashboard" className="text-primary hover:underline text-sm">{g("← Gespeicherte Berichte")}</Link>
    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-6 mb-4">{g("Ihr GEO Check")}</h1>
    {!ticket && <div role="alert" className="bg-white border rounded-xl p-7"><p>{g("Öffnen Sie den privaten Berichtslink oder starten Sie einen neuen Check. In diesem Browser ist kein Zugriffsschlüssel für diesen Bericht gespeichert.")}</p><Link href="/geo-check" className="text-primary underline mt-4 inline-block">{g("Kostenlosen Check starten")}</Link></div>}
    {ticket && query.isPending && <p role="status" className="flex gap-2 items-center"><Loader2 className="animate-spin h-5 w-5"/> {g("Bericht wird geladen…")}</p>}
    {query.isError && <div role="alert" className="bg-red-50 border border-red-200 p-5 rounded-xl mb-6"><p>{g(query.error.message)}</p><Button variant="outline" onClick={() => void query.refetch()} className="mt-3">{g("Erneut laden")}</Button></div>}
    {report && <>
      <p className="text-gray-600 break-words">{report.input.business} · {report.input.city} · {report.input.service}</p>
      <p className="text-sm text-gray-500 mt-2">{report.input.website} · {new Date(report.createdAt).toLocaleString(locale)} · OpenAI {report.model}</p>
      <div role="status" aria-live="polite" className="my-6 p-4 rounded-lg bg-primary/10 flex gap-3 items-start">
        {running ? <Loader2 className="animate-spin shrink-0 h-5 w-5 mt-1"/> : <Info className="shrink-0 h-5 w-5 mt-1"/>}
        <div><p className="font-semibold">{running ? g("Prüfung läuft · {count} von 3 Fragen bearbeitet", { count: report.answers.length }) : report.status === 'completed' ? g("Prüfung abgeschlossen") : report.status === 'partial' ? g("Prüfung teilweise abgeschlossen") : g("Prüfung fehlgeschlagen")}</p>
          <p className="text-sm mt-1">{running ? g("Antworten und Quellen erscheinen nach und nach. Sie können den Bericht später erneut öffnen.") : g("{count} von 3 Fragen erfolgreich. Fehlgeschlagene Fragen zählen nicht als fehlende Sichtbarkeit.", { count: report.metrics.successful })}</p></div>
      </div>
      {report.error && <p role="alert" className="text-red-700 mb-6">{g(report.error)}</p>}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[{ label: g("Unternehmensname erwähnt"), value: report.metrics.mentionRate === null ? '—' : `${report.metrics.mentionRate} %`, sub: g("{count} von {total} erfolgreichen Antworten", { count: report.metrics.mentions, total: report.metrics.successful }) },
          { label: g("Website als Quelle zitiert"), value: report.metrics.citationRate === null ? '—' : `${report.metrics.citationRate} %`, sub: g("{count} von {total} erfolgreichen Antworten", { count: report.metrics.citations, total: report.metrics.successful }) },
          { label: g("Andere Anbieter genannt"), value: report.analysisStatus === 'completed' ? String(report.competitors.length) : '—', sub: report.analysisStatus === 'completed' ? g("Mit belegter Textstelle") : g("Auswertung noch nicht verfügbar") }].map(metric => <Card key={metric.label}><CardContent className="p-6"><p className="text-gray-500 text-sm">{metric.label}</p><p className="text-3xl font-bold mt-2">{metric.value}</p><p className="text-gray-500 text-sm mt-1">{metric.sub}</p></CardContent></Card>)}
      </div>
      <h2 className="text-2xl font-semibold mb-5">{g("KI-Antworten und Quellen")}</h2>
      <p className="text-sm text-gray-500 mb-5">{g("Sprache der Prüfung: {language}", { language: g(report.input.language === "en" ? "Englisch" : "Deutsch") })}. {g("KI-Antworten, Suchfragen, Empfehlungen und Zitate bleiben in der Originalsprache der Prüfung.")}</p>
      <div className="space-y-5 mb-8">{report.answers.map((answer, index) => <Card key={answer.question}><CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-3">{index + 1}. {answer.question}</h3>
        {answer.status === 'failed' ? <p role="alert" className="text-red-700 text-sm">{g(answer.error || "Die Anfrage konnte nicht ausgewertet werden.")}</p> : <>
          <p className="text-sm mb-5">{answer.mentioned ? g("✓ Name erwähnt") : g("Name nicht erkannt")} · {answer.cited ? g("✓ Website zitiert") : g("Website nicht zitiert")}</p>
          <CitedAnswer answer={answer}/>
          <div className="border-t mt-5 pt-4"><h4 className="text-sm font-semibold mb-2">{g("Zitierte Quellen")}</h4>{answer.citations.length ? <ul className="space-y-2">{answer.citations.filter((c, i, all) => all.findIndex(s => s.url === c.url) === i).map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline break-words">{source.title} <ExternalLink className="inline h-3 w-3"/></a></li>)}</ul> : <p className="text-sm text-gray-500">{g("Die KI-Antwort enthält keine Quellenzitate.")}</p>}</div>
          <p className="text-xs text-gray-500 mt-4">{answer.model} · {new Date(answer.checkedAt).toLocaleString(locale)}</p>
        </>}
      </CardContent></Card>)}</div>
      {report.competitors.length > 0 && <Card className="mb-6"><CardContent className="p-6"><h2 className="text-xl font-semibold mb-4">{g("Andere genannte Anbieter")}</h2><ul className="space-y-4">{report.competitors.map(c => <li key={c.name}><p className="font-semibold">{c.name}</p><blockquote className="text-sm text-gray-600 border-l-2 pl-3 mt-1">„{c.evidence}“</blockquote><p className="text-xs text-gray-500 mt-1">{g("Antwort {count} · automatisch extrahiert, keine verifizierte Anbieterbewertung", { count: c.questionIndex + 1 })}</p></li>)}</ul></CardContent></Card>}
      <Card className="mb-6"><CardContent className="p-6"><h2 className="text-xl font-semibold mb-4">{g("Empfehlungen aus Ihrer Auswertung")}</h2>{report.recommendations.length ? <ul className="list-disc pl-5 space-y-3 text-gray-700">{report.recommendations.map(text => <li key={text}>{text}</li>)}</ul> : <p className="text-gray-600">{running ? g("Die Empfehlungen folgen nach den Suchanfragen.") : g("Die automatische Empfehlungsauswertung war nicht verfügbar. Die gespeicherten Antworten und Quellen können Sie oben einsehen.")}</p>}<Link href="/geo-optimierung"><Button className="mt-6 bg-secondary text-white">{g("GEO-Optimierung anfragen")}</Button></Link></CardContent></Card>
      <div className="text-sm text-gray-500 space-y-2 mb-6"><p>{g("Dies ist eine Momentaufnahme von drei API-Anfragen mit Websuche, kein allgemeiner KI-Sichtbarkeitswert und keine Messung der ChatGPT-App. Antworten können bei einer Wiederholung abweichen.")}</p><p>{g("Namensnennungen werden durch Textabgleich erkannt; abweichende Schreibweisen können unentdeckt bleiben. Website-Zitate zählen nur Quellen auf Ihrer Domain oder deren Subdomains. Empfehlungen und Anbieterextraktion sind KI-generiert. Die Zielwebsite wird nicht technisch geprüft.")}</p><p>{g("Der Bericht ist bis {date} abrufbar. Ihr Link enthält einen privaten Zugriffsschlüssel; geben Sie ihn nur bewusst weiter.", { date: new Date(report.expiresAt * 1000).toLocaleDateString(locale) })}</p></div>
      <div className="flex flex-wrap gap-3"><Button variant="outline" onClick={download}>{g("Bericht herunterladen (JSON)")}</Button><Link href="/geo-check"><Button variant="outline">{g("Neuen Check starten")}</Button></Link></div>
    </>}
  </div></div>;
}
