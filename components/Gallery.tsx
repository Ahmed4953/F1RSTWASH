
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const images = [
  "/images/audi.webp",
  "/images/BMW.webp",
  "/images/ferari.webp",
  "/images/lambo.webp",
  "/images/PORSHE.webp",
  "/images/rolls.webp",
];

const Gallery: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="gallery" className="py-32 bg-black px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="max-w-xl">
            <h2 className="text-zinc-700 font-heading text-sm uppercase tracking-[0.4em] mb-4">{t('gallery.label')}</h2>
            <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">{t('gallery.title')}</h3>
          </div>
        </div>

        {/* Updated grid for Vertical Images (3:4 Aspect Ratio) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className="aspect-[3/4] overflow-hidden group relative bg-zinc-900 border border-zinc-900 shadow-2xl"
            >
              {/* Image with subtle zoom and grayscale to color transition */}
              <img 
                src={img} 
                alt={`Premium detailing results ${idx}`} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1500ms] ease-out"
              />
              
              {/* Premium Overlay Hud - Details button removed */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 pointer-events-none">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 mb-2 block">Project 0{idx + 1}</span>
                  <div className="h-px w-12 bg-white" />
                </div>
              </div>

              {/* Technical corner accents */}
              <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/20 group-hover:border-white/40 transition-colors" />
              <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/20 group-hover:border-white/40 transition-colors" />
            </div>
          ))}
        </div>

        {/* Technical readout Footer for the gallery */}
        <div className="mt-16 flex items-center justify-between border-t border-zinc-900 pt-8 opacity-20">
          <span className="text-[8px] font-black tracking-[0.5em] uppercase">Render: High Definition</span>
          <div className="flex gap-4">
            <span className="text-[8px] font-black tracking-[0.5em] uppercase">PPC: 4.2.0</span>
            <span className="text-[8px] font-black tracking-[0.5em] uppercase">ISO: 100</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
