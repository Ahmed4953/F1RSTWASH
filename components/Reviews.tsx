
import React from 'react';
import { Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Reviews: React.FC = () => {
  const { t } = useLanguage();
  const reviewItems = t('reviews.items') as any[];

  // Double the items for seamless looping
  const duplicatedReviews = [...reviewItems, ...reviewItems];

  return (
    <section className="py-32 bg-zinc-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-zinc-700 font-heading text-sm uppercase tracking-[0.4em] mb-4">{t('reviews.label')}</h2>
        <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">Stimmen der Perfektion.</h3>
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      {/* Scrolling Container */}
      <div className="flex w-max animate-reviews-scroll hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
        {duplicatedReviews.map((review, idx) => (
          <div 
            key={idx} 
            className="w-[350px] md:w-[450px] mx-4 bg-black/40 border border-zinc-900 p-8 md:p-12 flex flex-col h-full backdrop-blur-sm group hover:border-zinc-700 transition-colors duration-500"
          >
            <Quote className="text-zinc-800 group-hover:text-zinc-600 transition-colors mb-8" size={32} />
            <p className="text-zinc-400 text-base md:text-lg italic leading-relaxed mb-10 flex-grow select-none">
              "{review.text}"
            </p>
            <div className="pt-8 border-t border-zinc-900">
              <div className="text-lg md:text-xl font-heading font-black italic uppercase mb-1 text-white">{review.name}</div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">{review.car}</div>
            </div>
            
            {/* Technical corner accent for the card */}
            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
              <div className="absolute top-4 right-4 w-1 h-1 bg-zinc-800 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes reviews-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-reviews-scroll {
          animation: reviews-scroll 60s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-reviews-scroll {
            animation-duration: 40s;
          }
        }
      `}</style>
    </section>
  );
};

export default Reviews;
