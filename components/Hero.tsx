
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Background */}
      <div 
        className="absolute inset-0 z-0 scale-105 animate-slow-zoom"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=2400")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 45%', 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-32">
        <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-black uppercase italic tracking-tighter leading-none mb-12 select-none flex flex-col items-center gap-2">
          
          {/* Top Line: Exzellenz - Glides in from the Left */}
          <div className="overflow-visible px-12 py-2">
            <span 
              className={`block text-white transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-32 opacity-0'
              }`}
            >
              {t('hero.headline')}
            </span>
          </div>
          
          {/* Bottom Line: Im Detail - Glides in from the Right */}
          <div className="overflow-visible px-12 py-2">
            <span 
              className={`block text-zinc-300 text-3xl md:text-5xl lg:text-6xl transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-75 ${
                isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-32 opacity-0'
              }`}
            >
              {t('hero.subHeadline')}
            </span>
          </div>
        </h1>

        {/* Minimalist Visual Anchor */}
        <div className={`h-[2px] bg-white/10 mx-auto transition-all duration-1000 delay-700 ${isLoaded ? 'w-16 opacity-100' : 'w-0 opacity-0'}`} />

        {/* Wash now CTA */}
        <div className={`mt-12 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={() => navigate('/book')}
            className="bg-white text-black px-10 py-4 md:px-12 md:py-5 font-heading font-black uppercase italic text-sm md:text-base tracking-tight hover:bg-zinc-200 transition-colors"
          >
            {t('hero.washNow')}
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20 hover:opacity-100 transition-opacity">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white">{t('hero.scroll')}</span>
          <ChevronDown size={20} className="text-white animate-bounce" />
        </div>
      </div>

      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }

        .animate-slow-zoom { 
          animation: slow-zoom 20s infinite alternate ease-in-out; 
        }

        /* Ensure italicized letters and dots aren't clipped by the container bounds */
        .font-heading span {
          display: inline-block;
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
};

export default Hero;
