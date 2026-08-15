import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Zap, Activity, CheckCircle2, ArrowRight } from 'lucide-react';

interface HeroProps {
  onAddToCart: () => void;
  brandName: string;
  productName: string;
}

export const Hero: React.FC<HeroProps> = ({ onAddToCart, brandName, productName }) => {
  const [activeWavelength, setActiveWavelength] = useState<'red' | 'blue' | 'nir' | 'amber'>('red');

  return (
    <section className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#050507] text-white flex items-center">
      {/* Cinematic Ambient Background Glow */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full blur-[120px] transition-all duration-1000 pointer-events-none ${
          activeWavelength === 'red'
            ? 'bg-red-600/30'
            : activeWavelength === 'blue'
            ? 'bg-blue-600/30'
            : activeWavelength === 'nir'
            ? 'bg-red-800/30'
            : 'bg-amber-500/30'
        }`}
      />

      {/* Grid line background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f101515_1px,transparent_1px),linear-gradient(to_bottom,#1f101515_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/60 border border-red-800/40 text-red-300 text-xs font-semibold uppercase tracking-widest shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>CLINICAL-GRADE AT-HOME DERMATOLOGY</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-[1.1]">
              RENEW. RECHARGE. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-500 animate-gradient">
                GLOW WITH LUMORA.
              </span>
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg font-light leading-relaxed max-w-xl">
              Target fine lines, clear breakouts, and boost dermal collagen in 10 minutes. Powered by 68 quad-chip LED beads (272 light emitters) across 4 clinical light modes with tested 11.1–52.6 mW/cm² irradiance.
            </p>

            {/* 4 Official Light Mode Selector */}
            <div className="bg-zinc-950/80 backdrop-blur-md p-4 rounded-2xl border border-zinc-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Activity className="w-4 h-4" /> 4 CLINICAL LIGHT MODES
                </span>
                <span>SELECT WAVELENGTH</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => setActiveWavelength('red')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold uppercase transition-all flex flex-col items-center justify-center gap-0.5 border ${
                    activeWavelength === 'red'
                      ? 'bg-red-900/60 text-white border-red-500 shadow-md shadow-red-900/40'
                      : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-red-400 font-extrabold">630nm RED</span>
                  <span className="text-[9px] text-zinc-400 font-normal">Radiance</span>
                </button>

                <button
                  onClick={() => setActiveWavelength('blue')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold uppercase transition-all flex flex-col items-center justify-center gap-0.5 border ${
                    activeWavelength === 'blue'
                      ? 'bg-blue-900/60 text-white border-blue-500 shadow-md shadow-blue-900/40'
                      : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-blue-400 font-extrabold">460nm BLUE</span>
                  <span className="text-[9px] text-zinc-400 font-normal">Clear Skin</span>
                </button>

                <button
                  onClick={() => setActiveWavelength('nir')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold uppercase transition-all flex flex-col items-center justify-center gap-0.5 border ${
                    activeWavelength === 'nir'
                      ? 'bg-red-950 text-white border-amber-500 shadow-md shadow-red-950'
                      : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-amber-400 font-extrabold">850nm NIR</span>
                  <span className="text-[9px] text-zinc-400 font-normal">Firmness</span>
                </button>

                <button
                  onClick={() => setActiveWavelength('amber')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold uppercase transition-all flex flex-col items-center justify-center gap-0.5 border ${
                    activeWavelength === 'amber'
                      ? 'bg-amber-900/60 text-white border-amber-400 shadow-md shadow-amber-900/40'
                      : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-amber-300 font-extrabold">605nm AMBER</span>
                  <span className="text-[9px] text-zinc-400 font-normal">Tone Improvement</span>
                </button>
              </div>
            </div>

            {/* Price & Primary CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onAddToCart}
                className="flex-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-sm sm:text-base font-bold uppercase tracking-wider py-4 px-8 rounded-full shadow-xl shadow-red-950/80 hover:shadow-red-600/50 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
              >
                <span>GET YOUR MASK — $129.99</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* US Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-zinc-900 text-zinc-400 text-xs">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>30-Day Risk Free</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Free Express US Shipping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
                <span>1-Year Warranty</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Interactive Product Mask Visual */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Halo ring lighting around product image */}
            <div
              className={`absolute inset-0 rounded-full blur-3xl opacity-60 transition-all duration-700 ${
                activeWavelength === 'red'
                  ? 'bg-red-600'
                  : activeWavelength === 'blue'
                  ? 'bg-blue-600'
                  : activeWavelength === 'nir'
                  ? 'bg-amber-600'
                  : 'bg-amber-500'
              }`}
            />

            {/* Main Hero Mask Frame - Dark obsidian background matching page design */}
            <div className="relative z-10 w-full max-w-md lg:max-w-lg aspect-square rounded-3xl bg-[#08080c]/90 p-4 sm:p-6 border border-zinc-800/80 shadow-2xl flex flex-col items-center justify-center group overflow-hidden">
              
              {/* Product Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-900/40 text-[11px] font-mono text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                <span>MODE: {activeWavelength.toUpperCase()} LIGHT ACTIVE</span>
              </div>

              {/* Product Mask Hero Image (Transparent PNG) */}
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src="/images/mask-hero.png"
                  alt={productName || 'LUMORA Red Light Therapy LED Mask'}
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(239,68,68,0.35)] transition-transform duration-700 group-hover:scale-105"
                />

                {/* Simulated Glow Effect based on active wavelength */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                    activeWavelength === 'red'
                      ? 'opacity-80 bg-radial from-red-600/30 via-transparent to-transparent'
                      : activeWavelength === 'blue'
                      ? 'opacity-80 bg-radial from-blue-600/30 via-transparent to-transparent'
                      : activeWavelength === 'nir'
                      ? 'opacity-70 bg-radial from-red-900/40 via-transparent to-transparent'
                      : 'opacity-80 bg-radial from-amber-500/30 via-transparent to-transparent'
                  }`}
                />
              </div>

              {/* Controller Details Footnote */}
              <div className="absolute bottom-4 right-4 z-20 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 px-3 py-1.5 rounded-xl text-[10px] text-zinc-400 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                <span>68 Quad-Chip LEDs (272 Emitters) + Wireless Controller</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
