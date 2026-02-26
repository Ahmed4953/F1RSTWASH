import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AUTO_SCROLL_SPEED = 1.2;
const RESUME_AUTO_AFTER_MS = 1500;

const Reviews: React.FC = () => {
  const { t } = useLanguage();
  const reviewItems = t('reviews.items') as any[];

  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollPausedRef = useRef(false);
  const rafIdRef = useRef<number>(0);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startScrollLeft: 0, active: false });

  const pauseAutoScroll = useCallback(() => {
    autoScrollPausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      autoScrollPausedRef.current = false;
      resumeTimeoutRef.current = null;
    }, RESUME_AUTO_AFTER_MS);
  }, []);

  const clampToLoop = useCallback((el: HTMLDivElement) => {
    const seg = el.scrollWidth / 3;
    if (seg <= 0) return;
    while (el.scrollLeft >= seg * 2) el.scrollLeft -= seg;
    while (el.scrollLeft < seg) el.scrollLeft += seg;
  }, []);

  const autoScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || autoScrollPausedRef.current) {
      rafIdRef.current = requestAnimationFrame(autoScroll);
      return;
    }
    const seg = el.scrollWidth / 3;
    if (seg <= 0) {
      rafIdRef.current = requestAnimationFrame(autoScroll);
      return;
    }
    el.scrollLeft += AUTO_SCROLL_SPEED;
    // Keep position in the middle segment so wrap is invisible (same content left/right)
    if (el.scrollLeft >= seg * 2) el.scrollLeft -= seg;
    if (el.scrollLeft < seg) el.scrollLeft += seg;
    rafIdRef.current = requestAnimationFrame(autoScroll);
  }, []);

  // Start scroll position in the middle segment so loop resets are invisible
  useEffect(() => {
    const el = scrollRef.current;
    if (el && el.scrollWidth > 0) {
      const seg = el.scrollWidth / 3;
      el.scrollLeft = seg;
    }
  }, [reviewItems?.length]);

  useEffect(() => {
    rafIdRef.current = requestAnimationFrame(autoScroll);
    return () => {
      cancelAnimationFrame(rafIdRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [autoScroll]);

  const wrapScrollForLoop = useCallback(() => {
    const el = scrollRef.current;
    if (el) clampToLoop(el);
  }, [clampToLoop]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    pauseAutoScroll();
    const el = scrollRef.current;
    if (el && e.deltaX !== 0) {
      el.scrollLeft += e.deltaX;
      wrapScrollForLoop();
      e.preventDefault();
    }
  }, [pauseAutoScroll, wrapScrollForLoop]);

  const handleDragStart = useCallback((clientX: number) => {
    if (!scrollRef.current) return;
    pauseAutoScroll();
    dragRef.current = { startX: clientX, startScrollLeft: scrollRef.current.scrollLeft, active: true };
    setIsDragging(true);
  }, [pauseAutoScroll]);

  const handleDragMove = useCallback((clientX: number) => {
    if (!scrollRef.current || !dragRef.current.active) return;
    const delta = dragRef.current.startX - clientX;
    dragRef.current.startX = clientX;
    scrollRef.current.scrollLeft += delta;
    clampToLoop(scrollRef.current);
  }, [clampToLoop]);

  const handleDragEnd = useCallback(() => {
    dragRef.current.active = false;
    setIsDragging(false);
    pauseAutoScroll();
  }, [pauseAutoScroll]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0) handleDragStart(e.clientX);
    };
    const onMouseMove = (e: MouseEvent) => handleDragMove(e.clientX);
    const onMouseUp = () => handleDragEnd();
    const onMouseLeave = () => {
      if (dragRef.current.active) handleDragEnd();
    };

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mouseleave', onMouseLeave);
    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [handleDragStart, handleDragMove, handleDragEnd]);

  const handleTouchStart = useCallback(() => {
    pauseAutoScroll();
  }, [pauseAutoScroll]);

  const handleTouchEnd = useCallback(() => {
    pauseAutoScroll();
  }, [pauseAutoScroll]);

  // Triple the items: [A,B,C, A,B,C, A,B,C] so last is always followed by first; we keep scroll in the middle segment for seamless loop
  const duplicatedReviews = [...reviewItems, ...reviewItems, ...reviewItems];

  return (
    <section className="py-32 bg-zinc-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-zinc-700 font-heading text-sm uppercase tracking-[0.4em] mb-4">{t('reviews.label')}</h2>
        <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">{t('reviews.title')}</h3>
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      {/* Outer: constrained width so overflow exists; inner: flex row wider than outer so it scrolls */}
      <div
        ref={scrollRef}
        className={`w-full overflow-x-auto overflow-y-hidden overscroll-x-contain select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} reviews-scroll-container`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex w-max">
        {duplicatedReviews.map((review, idx) => (
          <div
            key={idx}
            className="w-[350px] md:w-[450px] mx-4 flex-shrink-0 bg-black/40 border border-zinc-900 p-8 md:p-12 flex flex-col h-full backdrop-blur-sm group hover:border-zinc-700 transition-colors duration-500 relative"
          >
            <Quote className="text-zinc-800 group-hover:text-zinc-600 transition-colors mb-8" size={32} />
            <p className="text-zinc-400 text-base md:text-lg italic leading-relaxed mb-10 flex-grow select-none">
              "{review.text}"
            </p>
            <div className="pt-8 border-t border-zinc-900">
              <div className="text-lg md:text-xl font-heading font-black italic uppercase mb-1 text-white">{review.name}</div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">{review.car}</div>
            </div>

            {/* Technical corner accent for the card */}
            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
              <div className="absolute top-4 right-4 w-1 h-1 bg-zinc-800 rounded-full" />
            </div>
          </div>
        ))}
        </div>
      </div>

      <style>{`
        .reviews-scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Reviews;
