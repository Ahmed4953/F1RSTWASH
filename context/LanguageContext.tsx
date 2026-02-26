
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
      openStatus: 'Mall of Berlin • Geöffnet bis 20:00',
      headline: 'Exzellenz',
      subHeadline: 'Im Detail',
      description: '',
      ctaPrimary: 'Jetzt Buchen',
      ctaSecondary: 'Unsere Services',
      washNow: 'Jetzt waschen',
      scroll: 'Scroll',
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
        title: 'Premium Aufbereitung',
        desc: 'Mehrstufige Lackpolitur, Keramikversiegelung und Motorraumreinigung für Neuwagenzustand.',
        price: 'auf Anfrage',
      },
      valet: {
        title: 'Mall Valet',
        desc: 'Geben Sie Ihren Schlüssel ab und shoppen Sie entspannt. Wir parken und reinigen für Sie.',
        price: 'Service Inkl.',
      },
      premiumCleaning: { title: 'Premium Reinigung' },
      smartRepair: { title: 'Kleinstreparatur' },
      dentRemoval: { title: 'Beul- & Kratzerentfernung' },
      ppf: { title: 'PPF Folierung' },
      detailsBtn: 'Details',
    },
    anatomy: {
      label: 'Präzisions-Scan',
      title: 'Anatomie der Perfektion',
      status: 'Status: Optimal',
      efficiencyStatus: 'Effizienz-Status',
      optimal: 'Optimal',
      init: 'Initialisiere Scan-Modul...',
      category: 'Exterieur',
      parts: [
        { title: 'KERAMIK-SCHILD', desc: '9H+ Härtegrad Versiegelung für ultimativen Tiefenglanz und Schutz.' },
        { title: 'FELGEN-PRÄZISION', desc: 'Porentiefe Reinigung und Versiegelung gegen aggressiven Bremsstaub.' },
        { title: 'GLAS-KLARHEIT', desc: 'Hydrophobe Nanobeschichtung für perfekte Sicht bei jedem Wetter.' },
        { title: 'LACK-THERAPIE', desc: 'Mehrstufige Hochglanzpolitur zur Entfernung feinster Hologramme.' },
        { title: 'INTERIEUR-SPA', desc: 'Ozon-Behandlung und Tiefenpflege für exklusives Leder-Finish.' }
      ]
    },
    blueprint: {
      title: 'Anatomie Perfektion',
      subtitle: 'Präzisions-Scan',
      parts: [
        { title: 'KERAMIK-SCHILD', label: 'Exterieur', desc: '9H+ Härtegrad Versiegelung für ultimativen Tiefenglanz und Schutz.', data: '9H HARTE' },
        { title: 'GLAS-KLARHEIT', label: 'Verglasung', desc: 'Hydrophobe Nanobeschichtung für perfekte Sicht bei jedem Wetter.', data: 'HD KLAR' },
        { title: 'FELGEN-PRÄZISION', label: 'Felgen', desc: 'Porentiefe Reinigung und Versiegelung gegen aggressiven Bremsstaub.', data: 'RIM PRO' },
        { title: 'INTERIEUR-SPA', label: 'Innenraum', desc: 'Ozon-Behandlung und Tiefenpflege für exklusives Leder-Finish.', data: 'INTERIOR' },
      ],
      annotations: { model: 'Modell', status: 'Status', analysis: 'Analyse', loc: 'Standort' },
      efficiency: 'Effizienz-Status',
      optimal: 'Optimal',
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
      title: 'Stimmen der Perfektion.',
      items: [
        { name: "Maximilian S.", car: "Porsche 911 GT3", text: "Absolut professionell. Mein Lack sieht aus wie am ersten Tag. Der Valet-Service in der Mall of Berlin ist unschlagbar bequem." },
        { name: "Elena K.", car: "Audi RS6 Avant", text: "Die Innenreinigung ist die beste, die ich in Berlin je hatte. Jeder Winkel ist sauber, und der Duft ist dezent und hochwertig." },
        { name: "David L.", car: "Mercedes G-Klasse", text: "Pünktlich, freundlich und extrem gründlich. F1RST-WASH ist mein neuer Standard für die Autopflege." }
      ]
    },
    location: {
      label: 'Standort',
      title: 'Mitten In Berlin.',
      addressLine1: 'Leipziger Platz 12',
      addressLine2: '10117 Berlin (Mall of Berlin)',
      email: 'hello@f1rst-wash.de',
      satelliteLabel: 'Satellitenverfolgung',
      addressLabel: 'Adresse',
      hoursLabel: 'Öffnungszeiten',
      contactLabel: 'Kontakt',
      hours: 'Mo – Sa: 10:00 – 20:00',
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
    bookingForm: {
      title: 'Termin buchen',
      subtitle: 'Termin Buchen',
      backToHome: 'Zur Startseite',
      serviceLabel: 'Service',
      serviceName: 'Autowäsche (Standard)',
      dateLabel: 'Datum',
      timeLabel: 'Uhrzeit',
      selectedDateLabel: 'Ausgewähltes Datum',
      nameLabel: 'Name',
      phoneLabel: 'Telefon',
      phonePlaceholder: '+49 …',
      emailLabel: 'E-Mail (optional)',
      emailPlaceholder: 'name@email.com',
      loading: 'Lade verfügbare Zeiten…',
      noSlots: 'Keine freien Zeiten an diesem Tag.',
      bookBtn: 'Termin bestätigen',
      successTitle: 'Gebucht!',
      successBody: 'Wir haben Ihren Termin reserviert.',
      errorGeneric: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
      errorServer: 'Serverfehler. Bitte später erneut versuchen.',
      errorConnection: 'Verbindung zum Buchungsserver fehlgeschlagen. Bitte später erneut versuchen.',
    },
    footer: {
      desc: 'Premium Fahrzeugpflege im Herzen von Berlin. Wir definieren Standards neu und erhalten den Wert Ihres Automobils.',
      nav: 'Navigation',
      legal: 'Rechtliches',
      impressum: 'Impressum',
      privacy: 'Datenschutz',
      terms: 'AGB',
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
      openStatus: 'Mall of Berlin • Open until 8:00 PM',
      headline: 'Excellence',
      subHeadline: 'In Detail.',
      description: '',
      ctaPrimary: 'Book Now',
      ctaSecondary: 'Our Services',
      washNow: 'Wash now',
      scroll: 'Scroll',
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
      premiumCleaning: { title: 'Premium Cleaning' },
      smartRepair: { title: 'Smart Repair' },
      dentRemoval: { title: 'Dent & Ding Removal' },
      ppf: { title: 'PPF Wrapping' },
      detailsBtn: 'Details',
    },
    anatomy: {
      label: 'Precision Scan',
      title: 'Anatomy of Perfection',
      status: 'Status: Optimal',
      efficiencyStatus: 'Efficiency Status',
      optimal: 'Optimal',
      init: 'Initializing scan module...',
      category: 'Exterior',
      parts: [
        { title: 'CERAMIC SHIELD', desc: '9H+ hardness coating for ultimate deep gloss and protection.' },
        { title: 'RIM PRECISION', desc: 'Pore-deep cleaning and sealing against aggressive brake dust.' },
        { title: 'GLASS CLARITY', desc: 'Hydrophobic nano-coating for perfect visibility in any weather.' },
        { title: 'PAINT THERAPY', desc: 'Multi-stage high-gloss polishing to remove fine holograms.' },
        { title: 'INTERIOR SPA', desc: 'Ozone treatment and deep care for an exclusive leather finish.' }
      ]
    },
    blueprint: {
      title: 'Anatomy Perfection',
      subtitle: 'Precision Scan',
      parts: [
        { title: 'CERAMIC SHIELD', label: 'Exterior', desc: '9H+ hardness coating for ultimate deep gloss and protection.', data: '9H HARD' },
        { title: 'GLASS CLARITY', label: 'Glazing', desc: 'Hydrophobic nano-coating for perfect visibility in any weather.', data: 'HD CLEAR' },
        { title: 'RIM PRECISION', label: 'Rims', desc: 'Pore-deep cleaning and sealing against aggressive brake dust.', data: 'RIM PRO' },
        { title: 'INTERIOR SPA', label: 'Interior', desc: 'Ozone treatment and deep care for an exclusive leather finish.', data: 'INTERIOR' },
      ],
      annotations: { model: 'Model', status: 'Status', analysis: 'Analysis', loc: 'Location' },
      efficiency: 'Efficiency Status',
      optimal: 'Optimal',
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
      title: 'Voices of Perfection.',
      items: [
        { name: "Maximilian S.", car: "Porsche 911 GT3", text: "Absolutely professional. My paint looks like day one. The valet service at the Mall of Berlin is unbeatable." },
        { name: "Elena K.", car: "Audi RS6 Avant", text: "The interior cleaning is the best I've ever had in Berlin. Every corner is clean, and the scent is subtle and high-end." },
        { name: "David L.", car: "Mercedes G-Class", text: "Punctual, friendly, and extremely thorough. F1RST-WASH is my new standard for car care." }
      ]
    },
    location: {
      label: 'Location',
      title: 'In the Heart of Berlin.',
      addressLine1: 'Leipziger Platz 12',
      addressLine2: '10117 Berlin (Mall of Berlin)',
      email: 'hello@f1rst-wash.de',
      satelliteLabel: 'Satellite Tracking',
      addressLabel: 'Address',
      hoursLabel: 'Opening Hours',
      contactLabel: 'Contact',
      hours: 'Mon – Sat: 10:00 AM – 8:00 PM',
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
    bookingForm: {
      title: 'Book a time slot',
      subtitle: 'Book Appointment',
      backToHome: 'Back to home',
      serviceLabel: 'Service',
      serviceName: 'Car wash (standard)',
      dateLabel: 'Date',
      timeLabel: 'Time',
      selectedDateLabel: 'Selected date',
      nameLabel: 'Name',
      phoneLabel: 'Phone',
      phonePlaceholder: '+49 …',
      emailLabel: 'Email (optional)',
      emailPlaceholder: 'name@email.com',
      loading: 'Loading available times…',
      noSlots: 'No free slots on this day.',
      bookBtn: 'Confirm booking',
      successTitle: 'Booked!',
      successBody: 'Your appointment has been reserved.',
      errorGeneric: 'Something went wrong. Please try again.',
      errorServer: 'Server error. Please try again later.',
      errorConnection: 'Cannot reach the booking server. Please try again later.',
    },
    footer: {
      desc: 'Premium vehicle care in the heart of Berlin. We redefine standards and preserve the value of your automobile.',
      nav: 'Navigation',
      legal: 'Legal',
      impressum: 'Imprint',
      privacy: 'Privacy',
      terms: 'Terms',
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
