
import React from 'react';
import { MapPin, Clock, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Location: React.FC = () => {
  const { t } = useLanguage();
  
  // Optimized embed URL using the 'q' parameter for reliability
  const mapEmbedUrl = "https://maps.google.com/maps?q=Mall%20of%20Berlin%20Leipziger%20Platz%2012&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="location" className="py-24 bg-black px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Real Interactive Map Container */}
        <div className="relative h-[450px] lg:h-full min-h-[450px] bg-zinc-900 overflow-hidden border border-zinc-800 shadow-2xl group">
          <iframe 
            src={mapEmbedUrl}
            className="w-full h-full border-0 grayscale invert-[0.9] contrast-[1.2] opacity-70 group-hover:opacity-100 transition-opacity duration-700"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          ></iframe>
          
          {/* Cinematic Overlays */}
          <div className="absolute inset-0 pointer-events-none border-[12px] border-black/40" />
          
          {/* Corner Accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/20 pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/20 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/20 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/20 pointer-events-none" />
          
          {/* Technical HUD Label */}
          <div className="absolute top-8 left-8 pointer-events-none">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5">
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
              <span className="text-[9px] font-black tracking-[0.3em] uppercase text-white/80">Satellite Tracking</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-zinc-700 font-heading text-sm uppercase tracking-[0.4em] mb-4">{t('location.label')}</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase italic mb-12">{t('location.title')}</h3>
          
          <div className="space-y-10">
            <div className="flex gap-6 group cursor-default">
              <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black transition-all duration-300">
                <MapPin size={20} />
              </div>
              <div>
                <h5 className="font-bold uppercase text-[10px] tracking-widest mb-1 text-zinc-500">{t('location.addressLabel')}</h5>
                <p className="text-lg leading-snug">Leipziger Platz 12 <br /> <span className="text-zinc-400">10117 Berlin (Mall of Berlin)</span></p>
              </div>
            </div>

            <div className="flex gap-6 group cursor-default">
              <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black transition-all duration-300">
                <Clock size={20} />
              </div>
              <div>
                <h5 className="font-bold uppercase text-[10px] tracking-widest mb-1 text-zinc-500">{t('location.hoursLabel')}</h5>
                <p className="text-lg leading-snug">{t('location.hours')} <br /> <span className="text-zinc-500 italic">{t('location.closed')}</span></p>
              </div>
            </div>

            <div className="flex gap-6 group cursor-default">
              <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black transition-all duration-300">
                <PhoneCall size={20} />
              </div>
              <div>
                <h5 className="font-bold uppercase text-[10px] tracking-widest mb-1 text-zinc-500">{t('location.contactLabel')}</h5>
                <p className="text-lg leading-snug">
                  <a href="tel:+491787477771" className="hover:text-zinc-400 transition-colors">+49 178 7477771</a> 
                  <br /> 
                  <span className="text-zinc-400">hello@f1rst-wash.de</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
