import { useState } from 'react';
import { Link } from 'wouter';
import { BarChart3, ExternalLink, FileText, Lightbulb, MessageSquare, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const periods = [{value:'7',label:'7 Tage',mentions:37,citations:16},{value:'30',label:'30 Tage',mentions:32,citations:14},{value:'90',label:'90 Tage',mentions:28,citations:11}];
const questions = [{text:'Welche Anbieter gibt es in Wittenberg?',mention:true},{text:'Wo finde ich diesen Service in Piesteritz?',mention:false},{text:'Welche lokalen Dienstleister werden empfohlen?',mention:true}];

export default function GeoDashboardPage() {
  const [period, setPeriod] = useState('30');
  const selected = periods.find(p=>p.value===period) || periods[1];
  return <div className="min-h-screen bg-gray-50 py-10"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-wrap justify-between gap-5 items-start mb-8"><div><p className="uppercase tracking-wide text-primary font-semibold text-xs mb-2">GEO Analytics · Demo</p><h1 className="text-3xl font-bold">KI-Sichtbarkeit im Überblick</h1><p className="text-gray-600 mt-2">Musterunternehmen · Lutherstadt Wittenberg</p></div><select aria-label="Zeitraum" value={period} onChange={e=>setPeriod(e.target.value)} className="border bg-white rounded-lg px-4 py-3">{periods.map(p=><option key={p.value} value={p.value}>{p.label}</option>)}</select></div>
    <div className="p-4 rounded-lg bg-accent/20 text-gray-800 text-sm mb-6"><strong>Demo-Dashboard:</strong> Alle Kennzahlen und Antworten sind illustrativ. Keine echte KI-Abfrage, kein Nutzerkonto und kein Live-Monitoring.</div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[{label:'Mention Rate',value:selected.mentions+' %',icon:MessageSquare},{label:'Citation Rate',value:selected.citations+' %',icon:FileText},{label:'Getestete Anfragen',value:'100',icon:Search},{label:'Wettbewerber',value:'3',icon:Users}].map(k=><Card key={k.label}><CardContent className="p-6"><k.icon className="text-primary mb-3" size={24}/><p className="text-gray-500 text-sm">{k.label}</p><p className="text-3xl font-bold mt-2">{k.value}</p></CardContent></Card>)}
    </div>
    <div className="grid lg:grid-cols-2 gap-6 mb-8">
      <Card><CardContent className="p-7"><h2 className="text-xl font-semibold mb-6 flex gap-2 items-center"><BarChart3 className="text-primary"/> Wettbewerber-Vergleich</h2>
        {[{name:'Ihr Unternehmen',val:selected.mentions},{name:'Wettbewerber A',val:57},{name:'Wettbewerber B',val:46},{name:'Wettbewerber C',val:23}].map((v,i)=><div key={v.name} className="mb-5"><div className="flex justify-between text-sm mb-2"><span>{v.name}</span><span>{v.val}%</span></div><div className="bg-gray-100 rounded-full h-3 overflow-hidden"><div className={'h-full rounded-full '+(i===0?'bg-secondary':'bg-primary')} style={{width:v.val+'%'}}/></div></div>)}
      </CardContent></Card>
      <Card><CardContent className="p-7"><h2 className="text-xl font-semibold mb-6">Beispielhafte KI-Antworten</h2><div className="space-y-4">{questions.map(q=><div key={q.text} className="pb-3 border-b last:border-0"><p className="font-medium text-sm">{q.text}</p><p className={'text-xs mt-2 '+(q.mention?'text-green-700':'text-gray-500')}>{q.mention?'Marke erwähnt':'Nicht erwähnt'} · Demo</p></div>)}</div></CardContent></Card>
    </div>
    <Card><CardContent className="p-7 flex flex-col md:flex-row gap-6 md:items-center justify-between"><div><h2 className="text-xl font-semibold flex gap-2 items-center mb-2"><Lightbulb className="text-secondary"/> Empfohlene nächste Schritte</h2><p className="text-gray-600">Lokale Inhalte erweitern, Leistungsinformationen prüfen und Unternehmensprofile konsistent halten.</p></div><Link href="/geo-optimierung"><Button className="bg-secondary text-white shrink-0">Optimierung anfragen <ExternalLink className="ml-2 h-4 w-4"/></Button></Link></CardContent></Card>
    <div className="mt-8 text-center"><Link href="/geo-check" className="text-primary hover:underline">← Zurück zum GEO Check</Link></div>
  </div></div>;
}
