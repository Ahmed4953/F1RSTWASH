
import React, { useState } from 'react';
import { Bot, Send, Loader2, Sparkles } from 'lucide-react';
import { getServiceRecommendation } from '../services/gemini';
import { useLanguage } from '../context/LanguageContext';

const BookingAssistant: React.FC = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ carType: '', condition: '', lastWash: '' });
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t, language } = useLanguage();

  const handleNext = async (val: string) => {
    const newData = { ...data };
    if (step === 0) newData.carType = val;
    if (step === 1) newData.condition = val;
    if (step === 2) {
      newData.lastWash = val;
      setData(newData);
      setIsLoading(true);
      setStep(3);
      const res = await getServiceRecommendation(newData.carType, newData.condition, val, language);
      setRecommendation(res || '');
      setIsLoading(false);
      return;
    }
    setData(newData);
    setStep(step + 1);
  };

  const reset = () => {
    setStep(0);
    setData({ carType: '', condition: '', lastWash: '' });
    setRecommendation('');
  };

  const options = t('booking.options');

  return (
    <section className="py-24 bg-zinc-900/50 border-t border-zinc-800">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-black border border-zinc-800 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] -mr-32 -mt-32 rounded-full" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white flex items-center justify-center rounded-sm">
                <Bot className="text-black" />
              </div>
              <div>
                <h4 className="font-heading font-black italic uppercase text-2xl">{t('booking.title')}</h4>
                <p className="text-xs uppercase tracking-widest text-zinc-500">{t('booking.subtitle')}</p>
              </div>
            </div>

            <div className="min-h-[200px] flex flex-col justify-center">
              {step === 0 && (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                  <p className="text-lg mb-6">{t('booking.q1')}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {options.cars.map((item: string) => (
                      <button key={item} onClick={() => handleNext(item)} className="border border-zinc-800 py-4 hover:bg-white hover:text-black transition-all font-bold uppercase text-[10px] tracking-widest">
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                  <p className="text-lg mb-6">{t('booking.q2')}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {options.condition.map((item: string) => (
                      <button key={item} onClick={() => handleNext(item)} className="border border-zinc-800 py-4 hover:bg-white hover:text-black transition-all font-bold uppercase text-[10px] tracking-widest">
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                  <p className="text-lg mb-6">{t('booking.q3')}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {options.last.map((item: string) => (
                      <button key={item} onClick={() => handleNext(item)} className="border border-zinc-800 py-4 hover:bg-white hover:text-black transition-all font-bold uppercase text-[10px] tracking-widest">
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Loader2 className="animate-spin text-zinc-600 mb-4" size={40} />
                      <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">{t('booking.analyzing')}</p>
                    </div>
                  ) : (
                    <div className="bg-zinc-900/50 p-8 border-l-4 border-white">
                      <div className="flex items-center gap-2 mb-4 text-zinc-500 uppercase text-[10px] font-black tracking-widest">
                        <Sparkles size={14} /> {t('booking.recommendation')}
                      </div>
                      <p className="text-xl italic leading-relaxed text-zinc-200">
                        {recommendation}
                      </p>
                      <div className="mt-8 flex gap-4">
                        <button className="bg-white text-black px-8 py-3 font-black uppercase text-xs tracking-widest hover:bg-zinc-200">{t('booking.bookBtn')}</button>
                        <button onClick={reset} className="text-zinc-500 hover:text-white uppercase text-xs tracking-widest font-black">{t('booking.resetBtn')}</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingAssistant;
