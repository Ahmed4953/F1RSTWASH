import React from "react";
import { useLanguage } from "../context/LanguageContext";

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-zinc-950 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-zinc-700 font-heading text-sm uppercase tracking-[0.4em] mb-4">
            {t("about.label")}
          </h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase italic leading-tight mb-8">
            {t("about.title")}
          </h3>
          <p className="text-zinc-400 text-lg leading-relaxed mb-6">
            {t("about.p1")}
          </p>
          <p className="text-zinc-400 text-lg leading-relaxed mb-10">
            {t("about.p2")}
          </p>

          <div className="grid grid-cols-2 gap-8 border-t border-zinc-800 pt-10">
            <div>
              <div className="text-4xl font-heading font-black italic">
                15k+
              </div>
              <div className="text-xs uppercase tracking-widest text-zinc-500 mt-2">
                {t("about.stat1")}
              </div>
            </div>
            <div>
              <div className="text-4xl font-heading font-black italic">
                4.9/5
              </div>
              <div className="text-xs uppercase tracking-widest text-zinc-500 mt-2">
                {t("about.stat2")}
              </div>
            </div>
          </div>
        </div>

        <div className="relative group order-1 lg:order-2">
          {/* Background decorative element */}
          <div className="absolute -inset-4 bg-zinc-800 opacity-20 group-hover:opacity-30 transition-opacity rounded-sm" />

          {/* Main Image - Updated to a premium car photo without people */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-2xl bg-zinc-900 border border-zinc-800">
            <img
              src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200"
              alt="Premium car detailing excellence"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105"
            />
          </div>

          {/* Floating Quote Box */}
          <div className="absolute bottom-6 -left-6 md:bottom-12 md:-left-12 bg-white p-6 md:p-10 max-w-[200px] md:max-w-[280px] shadow-[20px_20px_60px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:-translate-y-2">
            <p className="text-black font-black italic uppercase tracking-tighter leading-[0.9] text-2xl md:text-4xl text-left">
              {t("about.quote")}
            </p>
            <div className="w-8 h-1 bg-black mt-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
