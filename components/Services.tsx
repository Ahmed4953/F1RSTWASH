import React from 'react';
import { Sparkles, ShieldCheck, Wrench, Hammer, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    { key: 'premiumCleaning', icon: Sparkles, size: 'large' as const },
    { key: 'detailing', icon: ShieldCheck, size: 'medium' as const },
    { key: 'smartRepair', icon: Wrench, size: 'medium' as const },
    { key: 'dentRemoval', icon: Hammer, size: 'medium' as const },
    { key: 'ppf', icon: Layers, size: 'medium' as const },
  ];

  return (
    <section
      id="services"
      className="relative py-24 md:py-32 bg-black px-6 overflow-hidden border-t border-zinc-900"
    >
      {/* Ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-gradient-to-b from-white/[0.02] to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <header className="mb-16 md:mb-20">
          <p className="text-zinc-600 font-heading text-[10px] uppercase tracking-[0.4em] mb-2">
            {t('services.label')}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase italic tracking-tighter text-white">
            {t('services.title')}
          </h2>
        </header>

        {/* Bento grid: 1 tall + 4 in 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 md:gap-5 auto-rows-fr">
          {services.map(({ key, icon: Icon, size }, i) => (
            <div
              key={key}
              className={`
                group relative overflow-hidden rounded-2xl
                transition-all duration-500 ease-out
                hover:scale-[1.02] hover:shadow-[0_0_60px_-12px_rgba(255,255,255,0.08)]
                ${size === 'large' ? 'md:row-span-2 md:min-h-[340px]' : 'min-h-[160px]'}
              `}
            >
              {/* Card background: subtle gradient + gradient border on hover */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-900/90 to-zinc-950/90"
                style={{
                  backgroundImage: size === 'large'
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)'
                    : 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, transparent 60%)',
                }}
              />
              <div className="absolute inset-0 rounded-2xl border border-zinc-800/60 group-hover:border-zinc-600/40 transition-colors duration-500" />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(255,255,255,0.06),transparent)]" />

              {/* Large faded icon in background */}
              <div className="absolute -right-4 -top-4 md:right-4 md:top-4 text-white/[0.06] group-hover:text-white/[0.09] transition-colors duration-500">
                <Icon size={size === 'large' ? 140 : 80} strokeWidth={0.8} />
              </div>

              {/* Content */}
              <div className="relative flex flex-col justify-end p-6 md:p-8 h-full min-h-[160px]">
                <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-2 group-hover:text-zinc-400 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-heading font-black uppercase italic text-xl md:text-2xl lg:text-3xl text-white tracking-tight group-hover:text-white transition-colors">
                  {t(`services.${key}.title`)}
                </h3>
                {/* Accent line that grows on hover */}
                <div className="mt-3 h-px w-12 bg-gradient-to-r from-zinc-500 to-transparent group-hover:w-20 transition-all duration-500 ease-out" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
