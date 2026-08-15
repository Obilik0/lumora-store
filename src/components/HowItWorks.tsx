import React from 'react';
import { Clock, Sliders, Coffee, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Cleanse & Prep',
      desc: 'Start with clean, dry skin. Remove makeup and apply your favorite lightweight serum for maximum light conductivity.',
      icon: Coffee,
    },
    {
      num: '02',
      title: 'Secure the Mask',
      desc: 'Place the ergonomic silicone mask over your face and adjust the soft Velcro straps for a comfortable, snug fit.',
      icon: Sliders,
    },
    {
      num: '03',
      title: 'Select Treatment Mode',
      desc: 'Turn on the portable controller, choose your desired light spectrum (630nm, 830nm, or Dual Boost), and set the 10-minute automatic timer.',
      icon: Clock,
    },
    {
      num: '04',
      title: 'Relax & Glow',
      desc: 'Sit back for 10 minutes while the light energy restores your skin. The mask automatically shuts off when your session is complete.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#050507] text-white relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-300 text-xs font-semibold uppercase tracking-widest">
            <span>EFFORTLESS DAILY ROUTINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            10 MINUTES TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">RADIANT SKIN</span>
          </h2>
          <p className="text-zinc-400 text-sm font-light">
            Designed to integrate seamlessly into your daily morning or evening skincare ritual.
          </p>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-zinc-950 border border-zinc-800/80 hover:border-red-600/50 p-6 rounded-2xl relative group transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black font-mono text-zinc-700 group-hover:text-red-500 transition-colors">
                      {step.num}
                    </span>
                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-red-500/40 text-red-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold uppercase text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">{step.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-900 text-[10px] font-mono text-amber-400/80 uppercase">
                  Step {idx + 1} of 4
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
