import { useState, type FormEvent } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight, BarChart3, CheckCircle2, Globe2, SearchCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function GeoCheckPage() {
  const [, navigate] = useLocation();
  const [website, setWebsite] = useState('');
  const [city, setCity] = useState('');
  const [business, setBusiness] = useState('');
  const [error, setError] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    try {
      const normalized = website.match(/^https?:\/\//i) ? website : 'https://' + website;
      const url = new URL(normalized);
      if (!['http:', 'https:'].includes(url.protocol) || !url.hostname.includes('.')) throw new Error('Invalid website');
      if (!city.trim() || !business.trim()) { setError('Bitte geben Sie Unternehmensname und Standort an.'); return; }
      const params = new URLSearchParams({ website: url.href, city: city.trim(), business: business.trim() });
      navigate('/geo-check/results?' + params.toString());
    } catch { setError('Bitte geben Sie eine gültige Website ein.'); }
  }

  return <div className="min-h-screen bg-gray-50">
    <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm mb-6"><Sparkles size={16}/> GEO Analytics für lokale Unternehmen</span>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">Wird Ihr Unternehmen von KI gefunden und empfohlen?</h1>
          <p className="text-lg text-blue-50 mb-8">Entdecken Sie, wie Ihr Unternehmen in KI-gestützten Suchantworten sichtbar werden kann. Verstehen Sie Erwähnungen, Wettbewerber und Optimierungsmöglichkeiten.</p>
          <div className="flex flex-wrap gap-4 text-sm"><span className="flex gap-2 items-center"><CheckCircle2 size={18}/> Lokaler Fokus</span><span className="flex gap-2 items-center"><CheckCircle2 size={18}/> Verständliche Analysen</span></div>
        </div>
        <Card className="shadow-2xl border-0"><CardContent className="p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Kostenlosen GEO Check entdecken</h2>
          <p className="text-gray-600 mb-6 text-sm">Starten Sie mit einer Vorschau. Die Live-Analyse wird derzeit entwickelt.</p>
          <form onSubmit={submit} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Unternehmensname<input value={business} onChange={e=>setBusiness(e.target.value)} required maxLength={120} placeholder="Musterfriseur GmbH" className="mt-2 w-full border rounded-lg px-4 py-3 text-gray-900"/></label>
            <label className="block text-sm font-medium text-gray-700">Website<input value={website} onChange={e=>setWebsite(e.target.value)} required placeholder="www.meine-firma.de" className="mt-2 w-full border rounded-lg px-4 py-3 text-gray-900"/></label>
            <label className="block text-sm font-medium text-gray-700">Stadt oder Region<input value={city} onChange={e=>setCity(e.target.value)} required maxLength={100} placeholder="Lutherstadt Wittenberg" className="mt-2 w-full border rounded-lg px-4 py-3 text-gray-900"/></label>
            {error && <p role="alert" className="text-red-600 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-primary hover:bg-blue-700 text-white">Demo-Bericht ansehen <ArrowRight className="ml-2 h-4 w-4"/></Button>
            <p className="text-xs text-gray-500">Hinweis: Noch keine echte KI-Prüfung. Die nächste Seite zeigt gekennzeichnete Beispieldaten.</p>
          </form>
        </CardContent></Card>
      </div>
    </section>
    <section className="py-16"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-10">So funktioniert GEO Analytics</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[{icon:Globe2,title:'Unternehmen erfassen',desc:'Website, Standort und lokale Leistungen definieren.'},{icon:SearchCheck,title:'KI-Sichtbarkeit prüfen',desc:'Relevante Suchfragen, Erwähnungen und zitierte Quellen auswerten.'},{icon:BarChart3,title:'Gezielt verbessern',desc:'Erkenntnisse verstehen und auf Wunsch GEO-Optimierung beauftragen.'}].map(item=><Card key={item.title}><CardContent className="p-7"><item.icon className="text-primary mb-4" size={32}/><h3 className="font-semibold text-xl mb-3">{item.title}</h3><p className="text-gray-600">{item.desc}</p></CardContent></Card>)}
      </div>
      <div className="mt-12 text-center"><Link href="/geo-optimierung" className="text-primary font-semibold hover:underline">Unsere GEO-Optimierung kennenlernen →</Link></div>
    </div></section>
  </div>;
}
