import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const DURATION_MS = 3000;
const STAT1_FINAL = 15;
const STAT2_FINAL = 4.9;

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

const About: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [stat1, setStat1] = useState(0);
  const [stat2, setStat2] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
      },
      { threshold: 0.2, rootMargin: "0px 0px -80px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;
    const start = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION_MS, 1);
      const eased = easeOutQuart(progress);
      setStat1(eased * STAT1_FINAL);
      setStat2(Number((eased * STAT2_FINAL).toFixed(1)));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isVisible]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-zinc-950 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1">
          <h2
            className={`about-reveal about-reveal-delay-1 text-zinc-700 font-heading text-sm uppercase tracking-[0.4em] mb-4 ${isVisible ? "is-visible" : ""}`}
          >
            {t("about.label")}
          </h2>
          <h3
            className={`about-reveal about-reveal-delay-2 text-4xl md:text-5xl font-black uppercase italic leading-tight mb-8 ${isVisible ? "is-visible" : ""}`}
          >
            {t("about.title")}
          </h3>
          <p
            className={`about-reveal about-reveal-delay-3 text-zinc-400 text-lg leading-relaxed mb-6 ${isVisible ? "is-visible" : ""}`}
          >
            {t("about.p1")}
          </p>
          <p
            className={`about-reveal about-reveal-delay-4 text-zinc-400 text-lg leading-relaxed mb-10 ${isVisible ? "is-visible" : ""}`}
          >
            {t("about.p2")}
          </p>

          <div className="grid grid-cols-2 gap-8 border-t border-zinc-800 pt-10">
            <div
              className={`about-reveal about-reveal-delay-5 ${isVisible ? "is-visible" : ""}`}
            >
              <div className="about-stat-1-up text-4xl font-heading font-black italic about-stat-number">
                {Math.round(stat1)}k+
              </div>
              <div className="text-xs uppercase tracking-widest text-zinc-500 mt-2">
                {t("about.stat1")}
              </div>
            </div>
            <div
              className={`about-reveal about-reveal-delay-6 ${isVisible ? "is-visible" : ""}`}
            >
              <div className="text-4xl font-heading font-black italic about-stat-number">
                {stat2.toFixed(1)}/5
              </div>
              <div className="text-xs uppercase tracking-widest text-zinc-500 mt-2">
                {t("about.stat2")}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`about-image-wrap relative group order-1 lg:order-2 ${isVisible ? "is-visible" : ""}`}
        >
          <div className="absolute -inset-4 bg-zinc-800 opacity-20 group-hover:opacity-30 transition-opacity duration-500 rounded-sm" />

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-2xl bg-zinc-900 border border-zinc-800">
            <img
              src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200"
              alt="Premium car detailing excellence"
              className="about-image-img w-full h-full object-cover grayscale"
            />
          </div>

          <div className="about-quote-box absolute bottom-6 -left-6 md:bottom-12 md:-left-12 bg-white p-6 md:p-10 max-w-[200px] md:max-w-[280px] shadow-[20px_20px_60px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:-translate-y-2">
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
