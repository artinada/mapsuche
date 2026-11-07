import { Link } from 'wouter';
import { ArrowLeft, MapPin, Star, Utensils, Clock, Phone, Globe, Award, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { getPostBySlug } from '@/lib/blogConfig';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LazyImage from '@/components/LazyImage';

export default function TopRestaurantsWittenberg() {
  const { language } = useLanguage();

  // Get the blog post configuration
  const blogPost = getPostBySlug('top-5-restaurants-lutherstadt-wittenberg');

  const restaurants = [
    {
      rank: 1,
      name: 'Brauhaus Wittenberg',
      cuisine: language === 'de' ? 'Deutsche Küche & Brauerei' : 'German Cuisine & Brewery',
      rating: 4.2,
      address: 'Markt 6, 06886 Lutherstadt Wittenberg',
      phone: '+49 3491 433130',
      website: 'https://www.brauhaus-wittenberg.de',
      description: language === 'de' 
        ? 'Traditionelle deutsche Küche in historischem Ambiente direkt am Marktplatz. Hausgebrautes Bier und regionale Spezialitäten in gemütlicher Atmosphäre mit Biergarten.' 
        : 'Traditional German cuisine in historic ambiance directly at the market square. House-brewed beer and regional specialties in a cozy atmosphere with beer garden.',
      specialties: language === 'de' ? 'Hausgebrautes Bier, Schnitzel, Bratwurst, Schweinebraten, Biergarten' : 'House-brewed Beer, Schnitzel, Bratwurst, Roast Pork, Beer Garden',
      priceRange: '€€',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=250&fit=crop&auto=format&q=80'
    },
    {
      rank: 2,
      name: 'Wittenberger Kartoffelhaus "Zum Schwarzen Bär"',
      cuisine: language === 'de' ? 'Deutsche Küche & Kartoffelspezialitäten' : 'German Cuisine & Potato Specialties',
      rating: 4.5,
      address: 'Schlossstraße 2, 06886 Lutherstadt Wittenberg',
      phone: '+49 3491 411200',
      website: 'https://www.wittenberg-kartoffelhaus.de',
      description: language === 'de' 
        ? 'Gemütliches Restaurant mit rustikalem Ambiente, spezialisiert auf Kartoffelgerichte und gutbürgerliche deutsche Küche. Alle Gerichte werden frisch zubereitet.' 
        : 'Cozy restaurant with rustic ambiance, specializing in potato dishes and traditional German cuisine. All dishes are freshly prepared.',
      specialties: language === 'de' ? 'Bratkartoffeln, Kartoffelpuffer, Schnitzel, Rouladen, Hausgemachte Klöße' : 'Fried Potatoes, Potato Pancakes, Schnitzel, Rouladen, Homemade Dumplings',
      priceRange: '€€',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=250&fit=crop&auto=format&q=80'
    },
    {
      rank: 3,
      name: 'Hotel & Restaurant Alte Canzley',
      cuisine: language === 'de' ? 'Gehobene deutsche Küche' : 'Upscale German Cuisine',
      rating: 4.1,
      address: 'Schlossplatz 3, 06886 Lutherstadt Wittenberg',
      phone: '+49 3491 429110',
      website: 'https://www.alte-canzley.de',
      description: language === 'de' 
        ? '4-Sterne Hotel mit elegantem Restaurant in historischem Gebäude gegenüber der Schlosskirche. Regionale Frische-Küche mit internationalen Einflüssen.' 
        : '4-star hotel with elegant restaurant in historic building opposite the Castle Church. Regional fresh cuisine with international influences.',
      specialties: language === 'de' ? 'Regionale Küche, Saisonale Menüs, Wildgerichte, Fischspezialitäten' : 'Regional Cuisine, Seasonal Menus, Game Dishes, Fish Specialties',
      priceRange: '€€€',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop&auto=format&q=80'
    },
    {
      rank: 4,
      name: 'Trattoria Toscana',
      cuisine: language === 'de' ? 'Italienische Küche' : 'Italian Cuisine',
      rating: 4.2,
      address: 'Mittelstraße 2, 06886 Lutherstadt Wittenberg',
      phone: '+49 3491 433188',
      website: null,
      description: language === 'de' 
        ? 'Authentisches italienisches Restaurant mit vielfältiger Speisekarte und saisonalen Gerichten. Schöne Außenterrasse für warme Tage.' 
        : 'Authentic Italian restaurant with diverse menu and seasonal dishes. Beautiful outdoor terrace for warm days.',
      specialties: language === 'de' ? 'Pizza, Pasta, Risotto, Tiramisu, Italienische Weine' : 'Pizza, Pasta, Risotto, Tiramisu, Italian Wines',
      priceRange: '€€',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=250&fit=crop&auto=format&q=80'
    },
    {
      rank: 5,
      name: 'WittenBurger',
      cuisine: language === 'de' ? 'Amerikanische Küche & Burger' : 'American Cuisine & Burgers',
      rating: 4.6,
      address: 'Markt 14, 06886 Lutherstadt Wittenberg',
      phone: '+49 3491 8763113',
      website: 'https://www.wittenburger.de',
      description: language === 'de' 
        ? 'Modernes Burger-Restaurant mit über 86 verschiedenen Optionen. Frische Zutaten, hausgemachte Burger und amerikanisches Flair am historischen Marktplatz.' 
        : 'Modern burger restaurant with over 86 different options. Fresh ingredients, homemade burgers and American flair at the historic market square.',
      specialties: language === 'de' ? 'Gourmet Burger, Steaks, Cocktails, Süßkartoffelpommes, Vegetarische Optionen' : 'Gourmet Burgers, Steaks, Cocktails, Sweet Potato Fries, Vegetarian Options',
      priceRange: '€€',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop&auto=format&q=80'
    }
  ];

  const content = {
    de: {
      title: 'Top 5 Restaurants in Lutherstadt Wittenberg laut mapsuche.de',
      subtitle: 'Die besten kulinarischen Erlebnisse in der Lutherstadt',
      intro: 'Lutherstadt Wittenberg bietet eine vielfältige Gastronomieszene, die von traditioneller deutscher Küche bis hin zu internationalen Spezialitäten reicht. Unsere Experten haben die besten Restaurants der Stadt bewertet und für Sie mit echten Adressen und Kontaktdaten zusammengestellt.',
      
      methodology: 'Unsere Bewertungskriterien',
      methodologyText: 'Wir haben über 30 Restaurants in Wittenberg besucht und nach folgenden Kriterien bewertet: Qualität der Speisen, Service, Ambiente, Preis-Leistungs-Verhältnis, Kundenbewertungen und Authentizität.',
      
      conclusion: 'Wittenberg bietet für jeden Geschmack das richtige Restaurant. Von traditioneller deutscher Küche bis zu internationalen Spezialitäten - die Auswahl ist vielfältig und die Qualität durchweg hoch.',
      
      visitTip: 'Tipp: Reservieren Sie vor allem am Wochenende und an Feiertagen rechtzeitig einen Tisch, da viele der empfohlenen Restaurants sehr beliebt sind und oft ausgebucht sind.'
    },
    en: {
      title: 'Top 5 Restaurants in Lutherstadt Wittenberg according to mapsuche.de',
      subtitle: 'The best culinary experiences in Luther\'s city',
      intro: 'Lutherstadt Wittenberg offers a diverse gastronomy scene ranging from traditional German cuisine to international specialties. Our experts have rated and compiled the best restaurants in the city for you with real addresses and contact details.',
      
      methodology: 'Our Rating Criteria',
      methodologyText: 'We visited over 30 restaurants in Wittenberg and rated them according to the following criteria: food quality, service, ambiance, value for money, customer reviews, and authenticity.',
      
      conclusion: 'Wittenberg offers the right restaurant for every taste. From traditional German cuisine to international specialties - the selection is diverse and the quality consistently high.',
      
      visitTip: 'Tip: Make reservations in advance, especially on weekends and holidays, as many of the recommended restaurants are very popular and often fully booked.'
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'de' ? 'Zurück zum Blog' : 'Back to Blog'}
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
              {language === 'de' ? 'Lokale Empfehlungen' : 'Local Recommendations'}
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-500 text-sm">
              {language === 'de' ? '6 Minuten Lesezeit' : '6 min read'}
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Featured Image */}
        <div className="mb-12">
          <LazyImage
            src={blogPost?.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop&auto=format&q=80"}
            alt={currentContent.title}
            className="w-full h-64 md:h-80 object-cover rounded-lg"
          />
        </div>

        {/* Intro */}
        <div className="mb-12">
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {currentContent.intro}
          </p>
          
          <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <CardContent className="p-8">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {currentContent.methodology}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {currentContent.methodologyText}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Restaurant List */}
        <div className="space-y-8 mb-12">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.rank} className="overflow-hidden bg-white hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <LazyImage
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="bg-white text-gray-700 rounded-full w-10 h-10 flex items-center justify-center mr-3 font-bold shadow-lg border-2 border-gray-200">
                          {restaurant.rank}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {restaurant.name}
                        </h3>
                      </div>
                      <div className="flex items-center mb-3">
                        <Utensils className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-600">{restaurant.cuisine}</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-600 font-medium">{restaurant.priceRange}</span>
                      </div>
                      
                      {/* Address */}
                      <div className="flex items-start mb-3">
                        <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                        <span className="text-gray-600 text-sm">{restaurant.address}</span>
                      </div>
                      
                      {/* Contact Info */}
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-gray-600 text-sm">{restaurant.phone}</span>
                        </div>
                        {restaurant.website && (
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 text-gray-500 mr-2" />
                            <a 
                              href={restaurant.website} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-primary text-sm hover:underline flex items-center"
                            >
                              Website <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center bg-secondary/10 px-3 py-2 rounded-full border border-secondary/20">
                      <Star className="h-4 w-4 text-secondary mr-1" />
                      <span className="font-bold text-secondary">{restaurant.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {restaurant.description}
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {language === 'de' ? 'Spezialitäten:' : 'Specialties:'}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {restaurant.specialties}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Conclusion */}
        <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
          <CardContent className="p-8">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {currentContent.conclusion}
            </p>
            <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed">
                  <strong>{language === 'de' ? 'Tipp:' : 'Tip:'}</strong> {currentContent.visitTip}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'de' ? 'Ihr Restaurant in Wittenberg?' : 'Your Restaurant in Wittenberg?'}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {language === 'de' 
                ? 'Betreiben Sie ein Restaurant in Wittenberg? Wir helfen Ihnen dabei, online gefunden zu werden und mehr Gäste zu gewinnen!'
                : 'Do you run a restaurant in Wittenberg? We help you get found online and attract more guests!'
              }
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-accent hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <ExternalLink className="mr-2 h-5 w-5" />
                {language === 'de' ? 'Restaurant-Marketing anfragen' : 'Request Restaurant Marketing'}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
