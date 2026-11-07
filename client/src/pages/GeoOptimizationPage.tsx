import { useGeoLanguage } from '@/hooks/useGeoLanguage';
import { Link } from 'wouter';
import { ArrowRight, CheckCircle2, Globe2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';


export default function GeoOptimizationPage() {
  const { g } = useGeoLanguage();
  const steps = [{title:g("GEO-Audit"),text:g("Wir prüfen die Auffindbarkeit Ihrer Inhalte und identifizieren konkrete Verbesserungspotenziale.")},{title:g("Lokale Content-Optimierung"),text:g("Wir helfen, Leistungsseiten, Standortinformationen und häufige Fragen besser zu strukturieren.")},{title:g("Begleitung & Monitoring"),text:g("Wir dokumentieren Änderungen und beobachten die Ergebnisse der vereinbarten Checks.")}];
  return <div className="min-h-screen bg-gray-50">
    <section className="bg-gradient-to-br from-primary to-blue-700 py-16 text-white"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><p className="text-blue-100 mb-3">{g("MapSuche · GEO-Optimierung")}</p><h1 className="text-4xl lg:text-5xl font-bold mb-5">{g("Besser sichtbar in der KI-Suche")}</h1><p className="text-lg text-blue-50 max-w-3xl mb-8">{g("Neben unserem GEO Analytics Dashboard unterstützen wir lokale Unternehmen bei der konkreten Optimierung ihrer digitalen Inhalte.")}</p><Link href="/contact"><Button className="bg-accent text-white">{g("Unverbindlich anfragen")} <ArrowRight className="ml-2 h-4 w-4"/></Button></Link></div></section>
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><div className="grid md:grid-cols-3 gap-6">{steps.map((step,i)=><Card key={step.title}><CardContent className="p-7"><span className="text-3xl text-primary font-bold">0{i+1}</span><h2 className="font-semibold text-xl my-4">{step.title}</h2><p className="text-gray-600">{step.text}</p></CardContent></Card>)}</div>
      <div className="bg-white rounded-xl border p-8 mt-12"><h2 className="text-2xl font-semibold mb-5">{g("Was Sie erwarten können")}</h2><ul className="space-y-3">{[g("Nachvollziehbare Empfehlungen statt Ranking-Versprechen"),g("Fokus auf lokale Suchintention und konkrete Leistungen"),g("Transparente Maßnahmen und dokumentierte Änderungen")].map(v=><li className="flex gap-3 items-center" key={v}><CheckCircle2 className="text-secondary shrink-0"/>{v}</li>)}</ul><p className="mt-5 text-sm text-gray-500">{g("Eine Erwähnung oder Empfehlung durch KI-Dienste kann nicht garantiert werden.")}</p></div>
      <div className="mt-10 flex flex-wrap gap-4"><Link href="/geo-check"><Button className="bg-primary text-white"><Globe2 className="mr-2 h-4 w-4"/> {g("GEO Check entdecken")}</Button></Link><Link href="/services/google-maps"><Button variant="outline"><MapPin className="mr-2 h-4 w-4"/> {g("Google Maps Optimierung")}</Button></Link></div>
    </section>
  </div>;
}
