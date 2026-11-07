import { useGeoLanguage } from '@/hooks/useGeoLanguage';
import { useState, type FormEvent } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight, BarChart3, CheckCircle2, Globe2, SearchCheck, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { reportUrl, saveTicket, startCheck } from '@/lib/geo';

export default function GeoCheckPage() {
  const { g, language } = useGeoLanguage();
  const [, navigate] = useLocation();
  const [website, setWebsite] = useState('');
  const [city, setCity] = useState('');
  const [business, setBusiness] = useState('');
  const [error, setError] = useState('');
  const [service, setService] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError('');
    setBusy(true);
    try {
      if (!consent) throw new Error(g("Bitte stimmen Sie der Verarbeitung zu."));
      const ticket = await startCheck({ business, website, city, service, consent: true, language });
      saveTicket(ticket);
      navigate(reportUrl(ticket));
    } catch (err) { setError(err instanceof Error ? err.message : g("Die Prüfung konnte nicht gestartet werden.")); }
    finally { setBusy(false); }
  }

  return <div className="min-h-screen bg-gray-50">
    <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm mb-6"><Sparkles size={16}/> {g("GEO Analytics für lokale Unternehmen")}</span>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">{g("Wird Ihr Unternehmen von KI gefunden und empfohlen?")}</h1>
          <p className="text-lg text-blue-50 mb-8">{g("Entdecken Sie, wie Ihr Unternehmen in KI-gestützten Suchantworten sichtbar werden kann. Verstehen Sie Erwähnungen, Wettbewerber und Optimierungsmöglichkeiten.")}</p>
          <div className="flex flex-wrap gap-4 text-sm"><span className="flex gap-2 items-center"><CheckCircle2 size={18}/> {g("Lokaler Fokus")}</span><span className="flex gap-2 items-center"><CheckCircle2 size={18}/> {g("Verständliche Analysen")}</span></div>
        </div>
        <Card className="shadow-2xl border-0"><CardContent className="p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{g("Kostenloser GEO Check")}</h2>
          <p className="text-gray-600 mb-6 text-sm">{g("Drei echte KI-Suchanfragen mit Websuche. Sie erhalten Antworten, Quellen und eine Auswertung. Die Prüfung dauert etwa 1–4 Minuten.")}</p>
          <form onSubmit={submit} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">{g("Unternehmensname")}<input value={business} onChange={e=>setBusiness(e.target.value)} required maxLength={120} placeholder={g("Musterfriseur GmbH")} className="mt-2 w-full border rounded-lg px-4 py-3 text-gray-900"/></label>
            <label className="block text-sm font-medium text-gray-700">Website<input value={website} onChange={e=>setWebsite(e.target.value)} required maxLength={500} placeholder={g("www.meine-firma.de")} className="mt-2 w-full border rounded-lg px-4 py-3 text-gray-900"/></label>
            <label className="block text-sm font-medium text-gray-700">{g("Stadt oder Region")}<input value={city} onChange={e=>setCity(e.target.value)} required maxLength={100} placeholder="Lutherstadt Wittenberg" className="mt-2 w-full border rounded-lg px-4 py-3 text-gray-900"/></label>
            <label className="block text-sm font-medium text-gray-700">{g("Branche oder Leistung")}<input value={service} onChange={e=>setService(e.target.value)} required minLength={2} maxLength={100} placeholder={g("z. B. Friseur oder Steuerberatung")} className="mt-2 w-full border rounded-lg px-4 py-3 text-gray-900"/></label>
            <label className="flex items-start gap-3 text-xs text-gray-600"><input type="checkbox" required checked={consent} onChange={e=>setConsent(e.target.checked)} className="mt-1"/><span>{g("Ich stimme zu, dass meine Unternehmensangaben zur Analyse an OpenAI übermittelt und der Bericht 30 Tage gespeichert wird. Zugriffsschlüssel werden in diesem Browser gespeichert.")} <Link href="/privacy" className="text-primary underline">{g("Datenschutz")}</Link></span></label>
            {error && <p role="alert" className="text-red-600 text-sm">{g(error)}</p>}
            <Button type="submit" disabled={busy} className="w-full bg-primary hover:bg-blue-700 text-white">{busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> {g("Prüfung wird gestartet…")}</> : <>{g("Kostenlosen Check starten")} <ArrowRight className="ml-2 h-4 w-4"/></>}</Button>
            <p className="text-xs text-gray-500">{g("Ohne Anmeldung · bis zu 3 Checks pro Tag und IP-Adresse · Ergebnisse können variieren.")}</p>
            <Link href="/geo/dashboard" className="block text-sm text-primary hover:underline">{g("Gespeicherte Berichte öffnen →")}</Link>
          </form>
        </CardContent></Card>
      </div>
    </section>
    <section className="py-16"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-10">{g("So funktioniert GEO Analytics")}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[{icon:Globe2,title:g("Unternehmen erfassen"),desc:g("Website, Standort und lokale Leistungen definieren.")},{icon:SearchCheck,title:g("KI-Sichtbarkeit prüfen"),desc:g("Relevante Suchfragen, Erwähnungen und zitierte Quellen auswerten.")},{icon:BarChart3,title:g("Gezielt verbessern"),desc:g("Erkenntnisse verstehen und auf Wunsch GEO-Optimierung beauftragen.")}].map(item=><Card key={item.title}><CardContent className="p-7"><item.icon className="text-primary mb-4" size={32}/><h3 className="font-semibold text-xl mb-3">{item.title}</h3><p className="text-gray-600">{item.desc}</p></CardContent></Card>)}
      </div>
      <div className="mt-12 text-center"><Link href="/geo-optimierung" className="text-primary font-semibold hover:underline">{g("Unsere GEO-Optimierung kennenlernen →")}</Link></div>
    </div></section>
  </div>;
}
