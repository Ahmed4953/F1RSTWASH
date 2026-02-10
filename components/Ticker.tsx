
import React from 'react';
import { Star, ShieldCheck, Droplet, Sparkles, Clock, MapPin, Zap, Crown, Gem, Flame } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Ticker: React.FC = () => {
  const { t } = useLanguage();
  const tickerItemsStrings = t('ticker') as string[];

  const icons = [
    <Star size={18} className="text-amber-500" />,
    <MapPin size={18} className="text-zinc-500" />,
    <Droplet size={18} className="text-blue-500" />,
    <Sparkles size={18} className="text-zinc-400" />,
    <Zap size={18} className="text-yellow-500" />,
    <Crown size={18} className="text-zinc-500" />,
    <ShieldCheck size={18} className="text-emerald-500" />,
    <Gem size={18} className="text-zinc-400" />,
    <Flame size={18} className="text-orange-500" />,
  ];

  return (
    <div className="bg-[#080808] border-y border-zinc-900 overflow-hidden py-10 select-none relative">
      {/* Cinematic lighting effect */}
      <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

      {/* The Ticker Container */}
      <div className="flex w-max animate-ticker-infinite will-change-transform">
        {[0, 1].map((setIndex) => (
          <div key={`set-${setIndex}`} className="flex items-center">
            {tickerItemsStrings.map((text, idx) => (
              <div key={`${setIndex}-${idx}`} className="flex items-center">
                <div className="flex items-center gap-5 px-16 group cursor-default">
                  <div className="p-2 bg-zinc-900/50 rounded-lg group-hover:scale-110 transition-transform duration-300 border border-zinc-800">
                    {icons[idx % icons.length]}
                  </div>
                  <span className="text-sm md:text-lg font-heading font-black italic uppercase tracking-[0.3em] text-zinc-100 whitespace-nowrap">
                    {text}
                  </span>
                </div>
                <div className="h-1 w-12 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
              </div>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ticker-infinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker-infinite {
          animation: ticker-infinite 40s linear infinite;
        }
        .animate-ticker-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Ticker;
