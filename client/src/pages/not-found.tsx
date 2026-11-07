import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';

export default function NotFound() {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">{language === 'de' ? '404 Seite nicht gefunden' : '404 Page Not Found'}</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            {language === 'de' ? 'Die angeforderte Seite wurde nicht gefunden.' : 'The requested page could not be found.'}
          </p>
          <Link href="/" className="mt-4 inline-block text-primary underline">{language === 'de' ? 'Zur Startseite' : 'Back to home'}</Link>
        </CardContent>
      </Card>
    </div>
  );
}
