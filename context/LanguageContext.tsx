
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'de' | 'en';

interface Translations {
  [key: string]: {
    [key: string]: any;
  };
}

const translations: Translations = {
  de: {
    nav: {
      services: 'Services',
      about: 'Über uns',
      gallery: 'Galerie',
      location: 'Standort',
      book: 'Termin buchen',
    },
    hero: {
      openStatus: 'Mall of Berlin • Geöffnet bis 21:00',
      headline: 'Exzellenz',
      subHeadline: 'Im Detail',
      description: '',
      ctaPrimary: 'Jetzt Buchen',
      ctaSecondary: 'Unsere Services',
    },
    ticker: [
      "15.000+ ZUFRIEDENE KUNDEN",
      "MALL OF BERLIN • PARKHAUS P2",
      "PREMIUM HANDWÄSCHE",
      "PROFESSIONAL DETAILING",
      "VALET SERVICE INKLUSIVE",
      "BEST IN BERLIN 2024",
      "KERAMIKVERSIEGELUNG",
      "EXKLUSIVE LACKPFLEGE",
      "HIGH-END FINISH",
    ],
    about: {
      label: 'Über F1RST-WASH',
      title: 'Mehr als nur eine Autowäsche.',
      p1: 'F1RST-WASH steht für Präzision, Leidenschaft und kompromisslose Qualität. Mitten im Herzen von Berlin, in der Mall of Berlin, bieten wir Ihnen ein exklusives Erlebnis für Ihr Fahrzeug.',
      p2: 'Wir verwenden ausschließlich erstklassige Produkte und modernste Techniken, um den Wert und die Ästhetik Ihres Autos zu erhalten. Unser Valet-Service ermöglicht es Ihnen, Ihre Zeit in der Mall optimal zu nutzen, während wir uns um die Details kümmern.',
      stat1: 'Gepflegte Fahrzeuge',
      stat2: 'Kundenbewertung',
      quote: '"Perfektion ist unser Standard."',
    },
    services: {
      label: 'Unsere Leistungen',
      title: 'Meisterhafte Pflege.',
      exterior: {
        title: 'Außenwäsche',
        desc: 'Schonende Handwäsche mit Premium-Shampoo, Felgenreinigung und Lackversiegelung.',
        price: 'ab 49€',
      },
      interior: {
        title: 'Innenreinigung',
        desc: 'Tiefenreinigung von Polstern, Lederpflege und Desinfektion aller Oberflächen.',
        price: 'ab 69€',
      },
      detailing: {
        title: 'Premium Detailing',
        desc: 'Mehrstufige Lackpolitur, Keramikversiegelung und Motorraumreinigung für Neuwagenzustand.',
        price: 'auf Anfrage',
      },
      valet: {
        title: 'Mall Valet',
        desc: 'Geben Sie Ihren Schlüssel ab und shoppen Sie entspannt. Wir parken und reinigen für Sie.',
        price: 'Service Inkl.',
      },
      detailsBtn: 'Details',
    },
    anatomy: {
      label: 'Präzisions-Scan',
      title: 'Anatomie der Perfektion',
      status: 'Status: Optimal',
      init: 'Initialisiere Scan-Modul...',
      parts: [
        { title: 'KERAMIK-SCHILD', desc: '9H+ Härtegrad Versiegelung für ultimativen Tiefenglanz und Schutz.' },
        { title: 'FELGEN-PRÄZISION', desc: 'Porentiefe Reinigung und Versiegelung gegen aggressiven Bremsstaub.' },
        { title: 'GLAS-KLARHEIT', desc: 'Hydrophobe Nanobeschichtung für perfekte Sicht bei jedem Wetter.' },
        { title: 'LACK-THERAPIE', desc: 'Mehrstufige Hochglanzpolitur zur Entfernung feinster Hologramme.' },
        { title: 'INTERIEUR-SPA', desc: 'Ozon-Behandlung und Tiefenpflege für exklusives Leder-Finish.' }
      ]
    },
    usps: [
      { title: "Handarbeit", desc: "Keine Kratzer durch Waschanlagen. Nur feinste Handarbeit." },
      { title: "Effizienz", desc: "Maximale Qualität in kürzester Zeit. Express-Optionen verfügbar." },
      { title: "Bestlage", desc: "Direkt in der Mall of Berlin (P2). Zentral und komfortabel." },
      { title: "Premium", desc: "Wir arbeiten für die anspruchsvollsten Kunden Berlins." }
    ],
    gallery: {
      label: 'Galerie',
      title: 'Ergebnisse, die sprechen.',
      btn: 'Alle Fotos ansehen',
      viewDetail: 'Details ansehen',
    },
    reviews: {
      label: 'Bewertungen',
      items: [
        { name: "Maximilian S.", car: "Porsche 911 GT3", text: "Absolut professionell. Mein Lack sieht aus wie am ersten Tag. Der Valet-Service in der Mall of Berlin ist unschlagbar bequem." },
        { name: "Elena K.", car: "Audi RS6 Avant", text: "Die Innenreinigung ist die beste, die ich in Berlin je hatte. Jeder Winkel ist sauber, und der Duft ist dezent und hochwertig." },
        { name: "David L.", car: "Mercedes G-Klasse", text: "Pünktlich, freundlich und extrem gründlich. F1RST-WASH ist mein neuer Standard für die Autopflege." }
      ]
    },
    location: {
      label: 'Standort',
      title: 'Mitten In Berlin.',
      addressLabel: 'Adresse',
      hoursLabel: 'Öffnungszeiten',
      contactLabel: 'Kontakt',
      hours: 'Mo – Sa: 10:00 – 21:00',
      closed: 'Sonntag: Geschlossen',
      routeBtn: 'Route Planen',
      overviewBtn: 'Mall Übersicht',
      mapLabel: 'Hier finden Sie uns',
    },
    booking: {
      title: 'Service Berater AI',
      subtitle: 'Finden Sie das perfekte Paket in 30 Sekunden',
      q1: 'Welchen Fahrzeugtyp fahren Sie?',
      q2: 'Wie würden Sie den aktuellen Zustand beschreiben?',
      q3: 'Wann war die letzte professionelle Reinigung?',
      analyzing: 'Analysiere Fahrzeugdaten...',
      recommendation: 'Unsere Empfehlung',
      bookBtn: 'Jetzt Buchen',
      resetBtn: 'Neu starten',
      options: {
        cars: ['Limousine', 'SUV', 'Sportwagen', 'Oldtimer'],
        condition: ['Leicht verschmutzt', 'Stark verschmutzt', 'Lack matt/verwittert', 'Nur Innenreinigung'],
        last: ['Vor weniger als 1 Monat', '1-3 Monate her', 'Länger als 6 Monate', 'Noch nie']
      }
    },
    footer: {
      desc: 'Premium Fahrzeugpflege im Herzen von Berlin. Wir definieren Standards neu und erhalten den Wert Ihres Automobils.',
      nav: 'Navigation',
      legal: 'Rechtliches',
      rights: 'ALLE RECHTE VORBEHALTEN.',
      top: 'Nach Oben',
    }
  },
  en: {
    nav: {
      services: 'Services',
      about: 'About Us',
      gallery: 'Gallery',
      location: 'Location',
      book: 'Book Now',
    },
    hero: {
      openStatus: 'Mall of Berlin • Open until 9:00 PM',
      headline: 'Excellence',
      subHeadline: 'In Detail.',
      description: '',
      ctaPrimary: 'Book Now',
      ctaSecondary: 'Our Services',
    },
    ticker: [
      "15,000+ HAPPY CUSTOMERS",
      "MALL OF BERLIN • PARKING P2",
      "PREMIUM HAND WASH",
      "PROFESSIONAL DETAILING",
      "VALET SERVICE INCLUDED",
      "BEST IN BERLIN 2024",
      "CERAMIC COATING",
      "EXCLUSIVE PAINT CARE",
      "HIGH-END FINISH",
    ],
    about: {
      label: 'About F1RST-WASH',
      title: 'More than just a car wash.',
      p1: 'F1RST-WASH stands for precision, passion, and uncompromising quality. Located in the heart of Berlin, at the Mall of Berlin, we offer an exclusive experience for your vehicle.',
      p2: 'We use only first-class products and modern techniques to preserve the value and aesthetics of your car. Our valet service allows you to make the most of your time in the mall while we take care of the details.',
      stat1: 'Serviced Vehicles',
      stat2: 'Customer Rating',
      quote: '"Perfection is our standard."',
    },
    services: {
      label: 'Our Services',
      title: 'Masterful Care.',
      exterior: {
        title: 'Exterior Wash',
        desc: 'Gentle hand wash with premium shampoo, wheel cleaning, and paint sealing.',
        price: 'from 49€',
      },
      interior: {
        title: 'Interior Cleaning',
        desc: 'Deep cleaning of upholstery, leather care, and disinfection of all surfaces.',
        price: 'from 69€',
      },
      detailing: {
        title: 'Premium Detailing',
        desc: 'Multi-stage paint polishing, ceramic coating, and engine bay cleaning for showroom condition.',
        price: 'on request',
      },
      valet: {
        title: 'Mall Valet',
        desc: 'Drop off your keys and shop relaxed. We park and clean for you.',
        price: 'Service Incl.',
      },
      detailsBtn: 'Details',
    },
    anatomy: {
      label: 'Precision Scan',
      title: 'Anatomy of Perfection',
      status: 'Status: Optimal',
      init: 'Initializing scan module...',
      parts: [
        { title: 'CERAMIC SHIELD', desc: '9H+ hardness coating for ultimate deep gloss and protection.' },
        { title: 'RIM PRECISION', desc: 'Pore-deep cleaning and sealing against aggressive brake dust.' },
        { title: 'GLASS CLARITY', desc: 'Hydrophobic nano-coating for perfect visibility in any weather.' },
        { title: 'PAINT THERAPY', desc: 'Multi-stage high-gloss polishing to remove fine holograms.' },
        { title: 'INTERIOR SPA', desc: 'Ozone treatment and deep care for an exclusive leather finish.' }
      ]
    },
    usps: [
      { title: "Handcrafted", desc: "No scratches from automatic washes. Pure artisan handwork." },
      { title: "Efficiency", desc: "Maximum quality in shortest time. Express options available." },
      { title: "Prime Location", desc: "Directly in Mall of Berlin (P2). Central and comfortable." },
      { title: "Premium", desc: "We work for the most demanding customers in Berlin." }
    ],
    gallery: {
      label: 'Gallery',
      title: 'Results that speak.',
      btn: 'View all photos',
      viewDetail: 'View Detail',
    },
    reviews: {
      label: 'Reviews',
      items: [
        { name: "Maximilian S.", car: "Porsche 911 GT3", text: "Absolutely professional. My paint looks like day one. The valet service at the Mall of Berlin is unbeatable." },
        { name: "Elena K.", car: "Audi RS6 Avant", text: "The interior cleaning is the best I've ever had in Berlin. Every corner is clean, and the scent is subtle and high-end." },
        { name: "David L.", car: "Mercedes G-Class", text: "Punctual, friendly, and extremely thorough. F1RST-WASH is my new standard for car care." }
      ]
    },
    location: {
      label: 'Location',
      title: 'In the Heart of Berlin.',
      addressLabel: 'Address',
      hoursLabel: 'Opening Hours',
      contactLabel: 'Contact',
      hours: 'Mon – Sat: 10:00 AM – 9:00 PM',
      closed: 'Sunday: Closed',
      routeBtn: 'Get Directions',
      overviewBtn: 'Mall Overview',
      mapLabel: 'Find us here',
    },
    booking: {
      title: 'AI Service Advisor',
      subtitle: 'Find the perfect package in 30 seconds',
      q1: 'What type of vehicle do you drive?',
      q2: 'How would you describe the current condition?',
      q3: 'When was the last professional cleaning?',
      analyzing: 'Analyzing vehicle data...',
      recommendation: 'Our Recommendation',
      bookBtn: 'Book Now',
      resetBtn: 'Start Over',
      options: {
        cars: ['Sedan', 'SUV', 'Sports Car', 'Classic'],
        condition: ['Lightly soiled', 'Heavily soiled', 'Paint dull/weathered', 'Interior only'],
        last: ['Less than 1 month ago', '1-3 months ago', 'Longer than 6 months', 'Never']
      }
    },
    footer: {
      desc: 'Premium vehicle care in the heart of Berlin. We redefine standards and preserve the value of your automobile.',
      nav: 'Navigation',
      legal: 'Legal',
      rights: 'ALL RIGHTS RESERVED.',
      top: 'Back to Top',
    }
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');

  const t = (path: string) => {
    const keys = path.split('.');
    let result = translations[language];
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        return path;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
