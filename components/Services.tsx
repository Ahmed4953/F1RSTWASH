
import React from 'react';
import { Sparkles, Droplets, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      title: t('services.exterior.title'),
      description: t('services.exterior.desc'),
      icon: <Droplets size={32} />,
      price: t('services.exterior.price'),
    },
    {
      title: t('services.interior.title'),
      description: t('services.interior.desc'),
      icon: <Sparkles size={32} />,
      price: t('services.interior.price'),
    },
    {
      title: t('services.detailing.title'),
      description: t('services.detailing.desc'),
      icon: <ShieldCheck size={32} />,
      price: t('services.detailing.price'),
    },
    {
      title: t('services.valet.title'),
      description: t('services.valet.desc'),
      icon: <ShoppingBag size={32} />,
      price: t('services.valet.price'),
    },
  ];

  return (
    <section id="services" className="py-24 bg-black px-6 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-zinc-700 font-heading text-sm uppercase tracking-[0.4em] mb-4">{t('services.label')}</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase italic">{t('services.title')}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-black p-10 flex flex-col hover:bg-zinc-950 transition-colors group relative overflow-hidden"
            >
              <div className="mb-8 text-zinc-600 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h4 className="text-2xl font-black uppercase italic mb-4">{service.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>
              <div className="flex items-center justify-between border-t border-zinc-800 pt-6">
                <span className="text-xs uppercase tracking-widest font-bold text-zinc-400">{service.price}</span>
                <button className="text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-white flex items-center gap-2">
                  {t('services.detailsBtn')} <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
