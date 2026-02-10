
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Crosshair, Shield, Zap, Wind, Search } from 'lucide-react';

const TechnicalAnatomy: React.FC = () => {
  const { t } = useLanguage();
  const [activePart, setActivePart] = useState<number | null>(0);

  /**
   * Precise Coordinates mapped to the 1000x400 SVG viewbox
   * ID 0: Hood/Front
   * ID 1: Front Wheel Center (Precision Rim)
   * ID 2: Windshield (Glass Clarity)
   * ID 3: Rear Side Panel (Paint Therapy)
   * ID 4: Driver Door Area (Interior Spa)
   */
  const anatomyParts = [
    {
      id: 0,
      pos: { top: '48%', left: '20%' },
      icon: <Shield size={14} />
    },
    {
      id: 1,
      pos: { top: '70%', left: '32%' },
      icon: <Crosshair size={14} />
    },
    {
      id: 2,
      pos: { top: '35%', left: '46%' },
      icon: <Zap size={14} />
    },
    {
      id: 3,
      pos: { top: '52%', left: '80%' },
      icon: <Search size={14} />
    },
    {
      id: 4,
      pos: { top: '43%', left: '40%' },
      icon: <Wind size={14} />
    }
  ];

  const getPartContent = (id: number) => {
    const parts = t('anatomy.parts');
    return parts && parts[id] ? parts[id] : { title: '', desc: '' };
  };

  return (
    <section className="py-32 bg-black border-t border-zinc-900 overflow-hidden relative">
      {/* Background Scanning Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-zinc-600 font-heading text-sm uppercase tracking-[0.4em] mb-4">{t('anatomy.label')}</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">{t('anatomy.title')}</h3>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-12">
          
          {/* Interactive Car Schematic Area */}
          <div className="relative w-full max-w-4xl aspect-[21/9] group">
            
            {/* The "Scanning" Line */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
               <div className="w-[2px] h-full bg-gradient-to-r from-white/40 via-white/10 to-transparent absolute top-0 left-0 animate-scan-line shadow-[0_0_25px_rgba(255,255,255,0.5)]" />
            </div>

            {/* Float Container: Holds both Car and Dots to keep them synced */}
            <div className="absolute inset-0 animate-float">
               {/* Enhanced Car Silhouette (SVG) */}
               <svg viewBox="0 0 1000 400" className="w-full h-full fill-none">
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Subtle Body Fill */}
                  <path 
                    d="M150,280 Q140,280 135,260 L130,220 Q130,180 180,160 L350,120 L550,110 L780,140 Q850,160 860,200 L870,260 Q875,280 850,280 L750,280 Q740,230 680,230 Q620,230 610,280 L390,280 Q380,230 320,230 Q260,230 250,280 L150,280 Z" 
                    className="fill-zinc-900/40"
                  />

                  {/* Main Silhouette */}
                  <path 
                    d="M150,280 Q140,280 135,260 L130,220 Q130,180 180,160 L350,120 L550,110 L780,140 Q850,160 860,200 L870,260 Q875,280 850,280 L750,280 Q740,230 680,230 Q620,230 610,280 L390,280 Q380,230 320,230 Q260,230 250,280 L150,280 Z" 
                    className="stroke-zinc-400 stroke-[1.5]"
                    filter="url(#glow)"
                  />
                  
                  {/* Wheels */}
                  <circle cx="320" cy="280" r="45" className="stroke-zinc-500 stroke-[2]" />
                  <circle cx="680" cy="280" r="45" className="stroke-zinc-500 stroke-[2]" />
                  <circle cx="320" cy="280" r="15" className="stroke-zinc-700 stroke-[1]" />
                  <circle cx="680" cy="280" r="15" className="stroke-zinc-700 stroke-[1]" />

                  {/* Windows & Roof */}
                  <path d="M350,125 L550,125 L585,185 L315,185 Z" className="stroke-zinc-600 stroke-[1]" />
                  <line x1="460" y1="125" x2="460" y2="185" className="stroke-zinc-700 stroke-[1]" />
                  
                  {/* Interior Lines */}
                  <line x1="250" y1="280" x2="390" y2="280" className="stroke-zinc-800 stroke-[1]" />
                  <line x1="610" y1="280" x2="750" y2="280" className="stroke-zinc-800 stroke-[1]" />
                  <path d="M180,160 L220,200 L350,120" className="stroke-zinc-800 stroke-[0.5]" />
               </svg>

               {/* Interactive Hotspots - Now scaled down and precise */}
               {anatomyParts.map((part) => (
                <button
                  key={part.id}
                  onClick={() => setActivePart(part.id)}
                  className="absolute z-30 group/btn -translate-x-1/2 -translate-y-1/2"
                  style={{ top: part.pos.top, left: part.pos.left }}
                >
                  <div className={`relative flex items-center justify-center w-6 h-6 transition-all duration-500 ${activePart === part.id ? 'scale-125' : 'scale-100 hover:scale-125'}`}>
                    {/* Pulsing Outer Ring */}
                    <div className={`absolute inset-0 border rounded-full animate-ping opacity-30 ${activePart === part.id ? 'border-white' : 'border-zinc-400'}`} />
                    <div className={`absolute inset-0.5 border rounded-full transition-all duration-300 ${activePart === part.id ? 'border-white bg-white/10' : 'border-zinc-500 bg-black/50'}`} />
                    {/* Inner Core - Smaller and sharper */}
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activePart === part.id ? 'bg-white shadow-[0_0_10px_white]' : 'bg-zinc-600'}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Readout Shard */}
          <div className="w-full lg:w-96 h-auto lg:h-[450px] flex items-center">
            <div className="w-full bg-zinc-900/60 border border-zinc-800 p-8 relative overflow-hidden backdrop-blur-md min-h-[250px] shadow-2xl">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20" />
              
              {activePart !== null ? (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="flex items-center gap-4 text-white mb-6">
                    <div className="w-12 h-12 border border-zinc-700 bg-zinc-800/50 flex items-center justify-center rounded-sm">
                      {anatomyParts[activePart].icon}
                    </div>
                    <div>
                      <h4 className="font-heading font-black italic uppercase text-xl tracking-widest leading-none">
                        {getPartContent(activePart).title}
                      </h4>
                      <div className="h-0.5 w-12 bg-white mt-2" />
                    </div>
                  </div>
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-10 font-light italic">
                    {getPartContent(activePart).desc}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-grow bg-zinc-800" />
                    <span className="text-[10px] text-zinc-500 font-black tracking-[0.5em] uppercase">{t('anatomy.status')}</span>
                    <span className="text-[10px] text-zinc-700 font-black tracking-widest uppercase ml-auto">0{activePart + 1}</span>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 animate-pulse text-center space-y-4">
                  <div className="w-16 h-16 border-2 border-dashed border-zinc-800 rounded-full flex items-center justify-center">
                    <Search size={24} className="opacity-20" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{t('anatomy.init')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(0.2deg); }
        }
        @keyframes scan-line {
          0% { left: 0%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-scan-line {
          animation: scan-line 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default TechnicalAnatomy;
