import { Link, useSearch } from 'wouter';
import { ArrowRight, CheckCircle2, CircleHelp, ExternalLink, Info, MinusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const examples = [
  {question:'Welche lokalen Unternehmen bieten diese Dienstleistung an?',mentioned:true},
  {question:'Welcher Anbieter in der Nähe wird empfohlen?',mentioned:false},
  {question:'Welche Alternativen gibt es in der Region?',mentioned:false},
];

export default function GeoResultsPage() {
  const query = new URLSearchParams(useSearch());
  const business = (query.get('business') || 'Musterunternehmen').slice(0, 120);
  const city = (query.get('city') || 'Ihre Region').slice(0, 100);
  const website = query.get('website') || '';
  return <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8"><span className="inline-flex items-center gap-2 bg-accent/20 text-gray-800 rounded-full px-3 py-1 text-sm font-medium mb-4"><Info size={16}/> Demonstration · Keine Live-Daten</span><h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">GEO Check: Beispielbericht</h1><p className="text-gray-600">{business} · {city}{website ? ' · ' + website : ''}</p></div>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[{label:'Erwähnungen',value:'3 / 10',sub:'Beispielanfragen'},{label:'Website-Zitate',value:'2 / 10',sub:'Beispielanfragen'},{label:'Wettbewerber',value:'4',sub:'Beispielunternehmen'}].map(metric=><Card key={metric.label}><CardContent className="p-6"><div className="text-gray-500 text-sm">{metric.label}</div><div className="text-3xl font-bold mt-2">{metric.value}</div><p className="text-gray-500 text-sm mt-1">{metric.sub}</p></CardContent></Card>)}
      </div>
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2"><CardContent className="p-6"><h2 className="text-xl font-semibold mb-5">Beispielhafte KI-Suchfragen</h2><div className="space-y-5">{examples.map(row=><div key={row.question} className="flex gap-3">{row.mentioned?<CheckCircle2 className="text-secondary shrink-0"/>:<MinusCircle className="text-gray-400 shrink-0"/>}<div><p className="font-medium text-gray-900">{row.question}</p><span className="text-sm text-gray-500">{row.mentioned?'Marke erwähnt (Beispiel)':'Nicht erwähnt (Beispiel)'}</span></div></div>)}</div></CardContent></Card>
        <Card><CardContent className="p-6"><h2 className="text-xl font-semibold mb-4">Was könnte helfen?</h2><ul className="space-y-4 text-sm text-gray-700"><li>Lokale Leistungsseiten verständlich gestalten.</li><li>Unternehmensdaten konsistent halten.</li><li>Typische Kundenfragen direkt beantworten.</li></ul><Link href="/geo-optimierung"><Button className="mt-6 w-full bg-secondary text-white">GEO-Optimierung <ArrowRight className="ml-2 h-4 w-4"/></Button></Link></CardContent></Card>
      </div>
      <Card><CardContent className="p-7 flex flex-col sm:flex-row gap-5 sm:items-center justify-between"><div><h2 className="text-2xl font-semibold mb-2">Monitoring-Dashboard kennenlernen</h2><p className="text-gray-600">Verfolgen Sie mögliche Erwähnungen, Quellen und Wettbewerber in einer Dashboard-Vorschau.</p></div><Link href="/geo/dashboard"><Button className="bg-primary text-white shrink-0">Dashboard-Demo <ExternalLink className="ml-2 h-4 w-4"/></Button></Link></CardContent></Card>
      <p className="text-sm text-gray-500 mt-6 flex items-start gap-2"><CircleHelp size={18} className="shrink-0"/> Dieser Bericht enthält ausschließlich illustrative Werte. Ihre Website wurde nicht automatisch gescannt und es wurden keine KI-Anfragen ausgeführt.</p>
    </div>
  </div>;
}
