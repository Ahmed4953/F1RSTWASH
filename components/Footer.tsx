
import React from 'react';
import { Instagram, Facebook, Linkedin, ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-black border-t border-zinc-900 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <img 
                src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/f1rstwash-logo.png" 
                alt="F1RSTWASH EXCLUSIVE" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-zinc-500 max-w-sm mb-8">
              {t('footer.desc')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h6 className="font-heading font-black italic uppercase text-xs tracking-widest mb-8">{t('footer.nav')}</h6>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><a href="#services" className="hover:text-white transition-colors">{t('nav.services')}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">{t('nav.about')}</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">{t('nav.gallery')}</a></li>
              <li><a href="#location" className="hover:text-white transition-colors">{t('nav.location')}</a></li>
            </ul>
          </div>

          <div>
            <h6 className="font-heading font-black italic uppercase text-xs tracking-widest mb-8">{t('footer.legal')}</h6>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AGB</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-bold">
            &copy; {new Date().getFullYear()} F1RST-WASH BERLIN. {t('footer.rights')}
          </p>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-zinc-600 hover:text-white text-[10px] uppercase tracking-widest font-bold transition-colors"
          >
            {t('footer.top')} <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
