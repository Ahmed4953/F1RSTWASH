
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import About from './components/About';
import Services from './components/Services';
import TechnicalAnatomy from './components/TechnicalAnatomy';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Location from './components/Location';
import { LanguageProvider } from './context/LanguageContext';

const AppContent: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-zinc-700 selection:text-white">
      <Navbar isScrolled={isScrolled} />
      
      <main>
        <Hero />
        <Ticker />
        <About />
        <Services />
        <TechnicalAnatomy />
        <Gallery />
        <Reviews />
        <Location />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
