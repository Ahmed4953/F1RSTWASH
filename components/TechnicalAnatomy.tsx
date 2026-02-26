import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Waves, Disc, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const VICE_CYAN = '#00F2FF';
const VICE_PINK = '#FF2D55';

const TechnicalAnatomy: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPart, setSelectedPart] = useState(0);

  const partsRaw = t('blueprint.parts') as Array<{ title: string; label: string; desc: string; data: string }>;
  const parts = Array.isArray(partsRaw) ? partsRaw : [];

  const partConfig = [
    { icon: Shield, x: '50%', y: '12%', color: 'text-[#00F2FF]', glow: 'shadow-[0_0_20px_#00F2FF]' },
    { icon: Waves, x: '50%', y: '35%', color: 'text-blue-400', glow: 'shadow-[0_0_20px_#60A5FA]' },
    { icon: Disc, x: '12%', y: '70%', color: 'text-[#FF2D55]', glow: 'shadow-[0_0_20px_#FF2D55]' },
    { icon: Zap, x: '50%', y: '58%', color: 'text-yellow-400', glow: 'shadow-[0_0_20px_#FACC15]' },
  ].map((cfg, i) => ({ ...cfg, ...(parts[i] || { title: '', label: '', desc: '', data: '' }) }));

  const titleStr = (t('blueprint.title') as string) || 'Anatomie Perfektion';
  const titleWords = titleStr.split(' ');

  return (
    <section id="anatomy" className="py-24 bg-zinc-950 relative overflow-hidden border-t border-white/5 will-change-transform">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none will-change-transform"
        style={{
          backgroundImage: `radial-gradient(${VICE_PINK} 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-8xl font-heading italic uppercase tracking-tighter text-white mb-4">
              {titleWords[0]}{' '}
              <span className="text-[#FF2D55]">{titleWords[1] || ''}</span>
            </h2>
            <p className="text-[#00F2FF] text-xs md:text-sm uppercase tracking-[0.4em] font-mono">
              {t('blueprint.subtitle')}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Graphic Side - Car SVG + overlay */}
          <div className="relative aspect-[1/2] max-w-[220px] md:max-w-[300px] mx-auto w-full group">
            <div className="absolute -top-10 -left-10 w-32 h-32 border-t border-l border-[#00F2FF]/20 pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 border-b border-r border-[#FF2D55]/20 pointer-events-none" />

            <motion.div
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F2FF] to-transparent z-10 opacity-50"
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', left: 0, right: 0 }}
            />

            <svg
              viewBox="0 0 200 400"
              className="w-full h-full opacity-80 fill-none stroke-[#00F2FF] stroke-[0.75] pointer-events-none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="carGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00F2FF" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#FF2D55" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              <path
                d="M100,10 C125,10 145,20 155,45 L165,80 L175,120 L185,180 L185,260 L175,320 L165,360 C155,385 130,395 100,395 C70,395 45,385 35,360 L25,320 L15,260 L15,180 L25,120 L35,80 L45,45 C55,20 75,10 100,10 Z"
                fill="url(#carGradient)"
                className={`transition-all duration-700 ${selectedPart === 0 ? 'stroke-[#FF2D55] stroke-[1.5]' : 'group-hover:stroke-[#FF2D55]'}`}
              />

              <path d="M15,200 L30,210 L30,250 L15,260" className="opacity-40" />
              <path d="M185,200 L170,210 L170,250 L185,260" className="opacity-40" />

              <path d="M70,50 Q100,40 130,50" className="opacity-30" />
              <path
                d="M80,65 L120,65 M85,75 L115,75"
                className={`transition-all duration-500 ${selectedPart === 0 ? 'stroke-[#FF2D55] opacity-100' : 'opacity-40'}`}
              />

              <circle cx="100" cy="50" r="3" className={`transition-all duration-500 ${selectedPart === 0 ? 'fill-[#00F2FF] stroke-[#00F2FF] stroke-[1.5]' : 'fill-[#00F2FF]/60 stroke-[#00F2FF]/40'}`}>
                <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
              </circle>

              <path d="M45,45 L60,35 L65,55 Z" className="fill-[#00F2FF]/20 opacity-60" />
              <path d="M155,45 L140,35 L135,55 Z" className="fill-[#00F2FF]/20 opacity-60" />

              <path
                d="M50,110 C80,90 120,90 150,110 L140,180 C100,170 100,170 60,180 Z"
                className={`transition-all duration-500 ${selectedPart === 1 ? 'stroke-blue-400 stroke-[1.5]' : 'stroke-[#00F2FF]'}`}
              />
              <circle cx="100" cy="145" r="3" className={`transition-all duration-500 ${selectedPart === 1 ? 'fill-blue-400 stroke-blue-400 stroke-[1.5]' : 'fill-blue-400/60 stroke-blue-400/40'}`}>
                <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
              </circle>

              <g className={`transition-all duration-500 ${selectedPart === 3 ? 'opacity-100' : 'opacity-20'}`}>
                <rect x="65" y="200" width="25" height="40" rx="4" className="stroke-yellow-400/50" />
                <rect x="110" y="200" width="25" height="40" rx="4" className="stroke-yellow-400/50" />
                <circle cx="77" cy="155" r="8" className="stroke-yellow-400/50" />
                <rect x="95" y="190" width="10" height="60" className="stroke-yellow-400/30" />
              </g>

              <circle cx="100" cy="225" r="3" className={`transition-all duration-500 ${selectedPart === 3 ? 'fill-yellow-400 stroke-yellow-400 stroke-[1.5]' : 'fill-yellow-400/60 stroke-yellow-400/40'}`}>
                <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
              </circle>

              <path d="M60,180 L140,180 L130,270 L70,270 Z" className={`transition-all duration-500 ${selectedPart === 3 ? 'stroke-yellow-400 stroke-[1.5] opacity-100' : 'opacity-30 stroke-[#FF2D55]'}`} />
              <path d="M70,270 C100,285 100,285 130,270 L125,320 C100,335 100,335 75,320 Z" className={`transition-all duration-500 ${selectedPart === 3 ? 'stroke-yellow-400 opacity-100' : 'opacity-60'}`} />

              <path d="M25,355 L175,355" className="stroke-[#FF2D55] opacity-50 stroke-[2]" />
              <path d="M80,395 L80,375 M100,395 L100,375 M120,395 L120,375" className="stroke-[#FF2D55] opacity-40" />
              <path d="M35,130 L15,135 M165,130 L185,135" className="opacity-40" />
              <line x1="100" y1="10" x2="100" y2="395" className="stroke-[#FF2D55]/10 stroke-[0.2]" />

              <g className={`transition-all duration-500 ${selectedPart === 2 ? 'stroke-[#FF2D55] stroke-[1.5]' : 'stroke-[#00F2FF]/30'}`}>
                <rect x="18" y="75" width="14" height="45" rx="3" className={selectedPart === 2 ? 'fill-[#FF2D55]/20' : 'fill-none'} />
                <rect x="168" y="75" width="14" height="45" rx="3" className={selectedPart === 2 ? 'fill-[#FF2D55]/20' : 'fill-none'} />
                <rect x="18" y="280" width="14" height="50" rx="3" className={selectedPart === 2 ? 'fill-[#FF2D55]/20' : 'fill-none'} />
                <rect x="168" y="280" width="14" height="50" rx="3" className={selectedPart === 2 ? 'fill-[#FF2D55]/20' : 'fill-none'} />
                {[25, 175].map((cx, i) => (
                  <circle key={i} cx={cx} cy="97" r="2.5" className={`transition-all duration-500 ${selectedPart === 2 ? 'fill-[#FF2D55] stroke-[#FF2D55] stroke-[1.5]' : 'fill-[#FF2D55]/60 stroke-[#FF2D55]/40'}`}>
                    <animate attributeName="r" values="2.5;4;2.5" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                ))}
                {[25, 175].map((cx, i) => (
                  <circle key={`r${i}`} cx={cx} cy="305" r="2.5" className={`transition-all duration-500 ${selectedPart === 2 ? 'fill-[#FF2D55] stroke-[#FF2D55] stroke-[1.5]' : 'fill-[#FF2D55]/60 stroke-[#FF2D55]/40'}`}>
                    <animate attributeName="r" values="2.5;4;2.5" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                ))}
              </g>

              <g className="text-[6px] font-mono fill-[#00F2FF]/40 uppercase tracking-tighter">
                <text x="10" y="30">{t('blueprint.annotations.model')}: F1RST-WASH</text>
                <text x="10" y="40">{t('blueprint.annotations.status')}: {t('blueprint.annotations.analysis')}</text>
                <text x="150" y="30">Ver: 2.0.4</text>
                <text x="150" y="40">{t('blueprint.annotations.loc')}: BERLIN</text>
              </g>
            </svg>

            {/* Clickable overlay zones */}
            <div className="absolute inset-0 z-[15]" aria-hidden="true">
              <button type="button" onClick={() => { setSelectedPart(0); document.getElementById('blueprint-info')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }} className="absolute left-[10%] top-0 w-[80%] h-[25%] cursor-pointer opacity-0" title={parts[0]?.title} />
              <button type="button" onClick={() => { setSelectedPart(1); document.getElementById('blueprint-info')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }} className="absolute left-[22%] top-[25%] w-[56%] h-[22%] cursor-pointer opacity-0" title={parts[1]?.title} />
              <button type="button" onClick={() => { setSelectedPart(2); document.getElementById('blueprint-info')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }} className="absolute left-0 top-[15%] w-[22%] h-[70%] cursor-pointer opacity-0" title={parts[2]?.title} />
              <button type="button" onClick={() => { setSelectedPart(2); document.getElementById('blueprint-info')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }} className="absolute right-0 top-[15%] w-[22%] h-[70%] cursor-pointer opacity-0" title={parts[2]?.title} />
              <button type="button" onClick={() => { setSelectedPart(3); document.getElementById('blueprint-info')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }} className="absolute left-[28%] top-[47%] w-[44%] h-[38%] cursor-pointer opacity-0" title={parts[3]?.title} />
            </div>

            {partConfig.map((part, i) => {
              const Icon = part.icon;
              return (
                <div key={i} style={{ left: part.x, top: part.y }} className="absolute -translate-x-1/2 -translate-y-1/2 z-[25]">
                  <motion.button
                    type="button"
                    onClick={() => { setSelectedPart(i); document.getElementById('blueprint-info')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}
                    className={`relative w-11 h-11 md:w-12 md:h-12 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition-all duration-500 ${selectedPart === i ? `bg-zinc-900 border-2 border-white ${part.glow} scale-110` : 'bg-zinc-900/90 backdrop-blur-sm border border-white/20 hover:border-white/50'} ${i === 0 ? 'border-[#00F2FF]/50 hover:border-[#00F2FF]' : ''} ${i === 1 ? 'border-blue-400/50 hover:border-blue-400' : ''} ${i === 2 ? 'border-[#FF2D55]/50 hover:border-[#FF2D55]' : ''} ${i === 3 ? 'border-yellow-400/50 hover:border-yellow-400' : ''}`}
                    whileHover={{ scale: 1.15 }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                    title={part.title}
                  >
                    <div className={selectedPart === i ? 'text-white' : part.color}>
                      <Icon size={16} />
                    </div>
                    {selectedPart === i && (
                      <motion.div
                        layoutId="node-glow"
                        className="absolute inset-0 rounded-full border-2 border-white/50"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                    )}
                  </motion.button>
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: selectedPart === i ? 1 : 0, x: selectedPart === i ? 20 : 10 }}
                    className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none ${parseFloat(part.x) > 50 ? 'left-full' : 'right-full mr-10'}`}
                  >
                    <span className="text-[10px] font-mono text-[#00F2FF] bg-black/80 px-2 py-1 border border-[#00F2FF]/30">
                      {part.data}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Info panel */}
          <div id="blueprint-info" className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPart}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-black/60 backdrop-blur-md border border-white/10 p-8 md:p-12 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF2D55]/5 blur-3xl -z-10" />
                <div className="absolute -top-1 -left-1 w-16 h-16 border-t border-l border-[#FF2D55]/50" />
                <div className="absolute -bottom-1 -right-1 w-16 h-16 border-b border-r border-[#00F2FF]/50" />

                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 bg-zinc-900 border border-white/10 flex items-center justify-center text-[#FF2D55]">
                    {(() => { const Icon = partConfig[selectedPart]?.icon; return Icon ? <Icon size={24} /> : null; })()}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#00F2FF] uppercase tracking-[0.3em] mb-2">
                      {partConfig[selectedPart]?.label}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-heading text-white uppercase tracking-tight">
                      {partConfig[selectedPart]?.title}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10">
                  {partConfig[selectedPart]?.desc}
                </p>

                <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                    <span>{t('blueprint.efficiency')}</span>
                    <span className="text-[#FF2D55]">{t('blueprint.optimal')}</span>
                  </div>
                  <div className="h-1 w-full bg-zinc-900">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.5, ease: [0, 0.5, 0.5, 1] }}
                      className="h-full bg-gradient-to-r from-[#FF2D55] to-[#00F2FF]"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-3 mt-12">
              {partConfig.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setSelectedPart(i); document.getElementById('blueprint-info')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}
                  className={`h-1.5 transition-all duration-700 rounded-full ${selectedPart === i ? 'bg-[#FF2D55] w-16' : 'bg-zinc-800 w-8 hover:bg-zinc-700'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalAnatomy;
