
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <nav 
      className={`fixed w-full z-[100] transition-all duration-500 px-4 md:px-6 py-4 ${
        isScrolled ? 'bg-black/95 border-b border-zinc-800 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-[110]">
        {/* New Brand Logo */}
        <div 
          className="flex items-center group cursor-pointer" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <img 
            src="/images/f1rstlogo.png" 
            alt="F1RSTWASH EXCLUSIVE" 
            className="h-16 md:h-20 w-auto transform group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // Fallback if image fails to load during development
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center gap-2"><div class="w-8 h-8 bg-white flex items-center justify-center rounded-sm"><span class="text-black font-black italic">F1</span></div><span class="font-heading font-black text-xl uppercase italic">RST-WASH</span></div>';
            }}
          />
        </div>

        {/* Language Switcher - Persistent on all screen sizes */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3 text-[10px] font-black tracking-[0.2em]">
            <button 
              onClick={() => setLanguage('de')}
              className={`transition-colors py-2 px-1 ${language === 'de' ? 'text-white underline underline-offset-4' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              DE
            </button>
            <span className="text-zinc-800 font-light">|</span>
            <button 
              onClick={() => setLanguage('en')}
              className={`transition-colors py-2 px-1 ${language === 'en' ? 'text-white underline underline-offset-4' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
