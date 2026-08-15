import React, { useState } from 'react';
import { MoveHorizontal, Sparkles, CheckCircle2 } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const handleSliderMove = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section id="benefits" className="py-24 bg-[#08080c] text-white relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>CLINICAL TRANSFORMATION RESULTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            SEE THE DIFFERENCE IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">4 WEEKS</span>
          </h2>
          <p className="text-zinc-400 text-sm font-light">
            Slide below to compare fine lines, firmness, and skin tone before and after daily LUMORA 10-minute red light sessions.
          </p>
        </div>

        {/* Draggable Comparison Slider Container */}
        <div className="max-w-3xl mx-auto">
          <div className="relative aspect-4/3 sm:aspect-16/10 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl select-none group">
            
            {/* After Image (Full width background - Smooth, radiant skin) */}
            <img
              src="/images/after-real.png"
              alt="LUMORA 4-Week After Results"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* After Badge (Top Right) */}
            <div className="absolute top-4 right-4 bg-emerald-950/90 border border-emerald-500/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-extrabold text-emerald-300 uppercase tracking-wider shadow-xl flex items-center gap-1.5 z-10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>AFTER (4 WEEKS OF LUMORA)</span>
            </div>

            {/* Before Image (Clipped overlay on the left - Showing fine lines before treatment) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src="/images/before-real.png"
                alt="Before LUMORA Treatment"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%' }}
              />
              
              {/* Before Badge (Top Left) */}
              <div className="absolute top-4 left-4 bg-zinc-950/90 border border-zinc-700 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-extrabold text-zinc-300 uppercase tracking-wider shadow-xl whitespace-nowrap z-10">
                BEFORE TREATMENT
              </div>
            </div>

            {/* Vertical Slider Divider Line */}
            <div
              className="absolute inset-y-0 w-1 bg-gradient-to-b from-red-500 via-amber-400 to-red-500 cursor-ew-resize shadow-[0_0_15px_rgba(239,68,68,0.8)] z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black border-2 border-amber-400 flex items-center justify-center shadow-2xl text-amber-400 hover:scale-110 transition-transform">
                <MoveHorizontal className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            {/* Range Input overlay for smooth dragging on mobile and desktop */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderMove}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </div>

          {/* Slider Footnote */}
          <div className="mt-4 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>← DRAG LEFT: SHOW AFTER RESULTS</span>
            <span>DRAG RIGHT: SHOW BEFORE →</span>
          </div>
        </div>

      </div>
    </section>
  );
};
