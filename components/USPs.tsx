
import React from 'react';
import { Star, Clock, MapPin, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const USPs: React.FC = () => {
  const { t } = useLanguage();
  const uspData = t('usps') as any[];

  const icons = [
    <Award className="w-12 h-12 mb-4" />,
    <Clock className="w-12 h-12 mb-4" />,
    <MapPin className="w-12 h-12 mb-4" />,
    <Star className="w-12 h-12 mb-4" />
  ];

  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {uspData.map((usp, idx) => (
            <div key={idx} className="text-center group">
              <div className="flex justify-center text-zinc-800 group-hover:text-white transition-colors duration-500">
                {icons[idx]}
              </div>
              <h4 className="text-xl font-heading font-black italic uppercase mb-2">{usp.title}</h4>
              <p className="text-zinc-500 text-sm">{usp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPs;
