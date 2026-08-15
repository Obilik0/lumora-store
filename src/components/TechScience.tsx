import React, { useState } from 'react';
import { Zap, Sun, Sparkles, Cpu, Sliders, Eye, ShieldCheck } from 'lucide-react';

export const TechScience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const techFeatures = [
    {
      title: '68 Quad-Chip LEDs (272 Emitters)',
      subtitle: 'Uniform Light Coverage Without Blind Spots',
      desc: '68 high-purity LED beads are evenly distributed across the face. Each bead integrates 4 light-emitting chips working together to eliminate blind spots and ensure 100% optical coverage.',
      spec: '68 Beads / 272 Light Sources',
      icon: Sun,
      color: 'from-red-600 to-red-400',
    },
    {
      title: 'Tested Irradiance: 11.1 ~ 52.6 mW/cm²',
      subtitle: 'High-Purity S-Class Beauty Salon Bead Group',
      desc: 'Tested on optical power meters across 3 intensity levels (Level 1 Low, Level 2 Medium, Level 3 High). Mode 1 (Red+NIR) delivers up to 52.1 mW/cm² and Mode 2 (Blue+NIR) delivers up to 52.6 mW/cm².',
      spec: '11.1 ~ 52.6 mW/cm² Tested',
      icon: Zap,
      color: 'from-amber-500 to-amber-300',
    },
    {
      title: '4 Clinical Light Modes',
      subtitle: 'Targeted Multi-Spectrum Phototherapy',
      desc: '630nm Deep Red (Radiance & Hydration), 460nm Blue (Clear Skin), 850nm NIR (Firmness & Elasticity), and 605nm Amber (Overall Improvement).',
      spec: '4 Modes / 3 Intensity Levels',
      icon: Cpu,
      color: 'from-blue-600 to-amber-400',
    },
    {
      title: 'Skin-Friendly Soft Silicone & Eye Protection',
      subtitle: 'Wireless Controller & Adjustable Fit',
      desc: 'Crafted from soft food-grade silicone that contours to 99% of head shapes. Features integrated eye protection design to block harsh light, ear hooks, and an attached wireless rechargeable controller.',
      spec: 'Food-Grade Silicone + Wireless',
      icon: Eye,
      color: 'from-emerald-500 to-amber-500',
    },
  ];

  return (
    <section id="technology" className="py-24 bg-[#08080c] text-white relative overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-300 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>CLINICALLY INSPIRED TECHNOLOGY (SKB-2318Pro)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            THE SCIENCE OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">PHOTOBIOMODULATION</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light">
            Engineered with S-class high-purity LED beads, 272 light-emitting quad-chips, and tested power irradiance up to 52.6 mW/cm² for maximum skin transformation.
          </p>
        </div>

        {/* Official Infographic Mockup Gallery */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-zinc-950 border border-zinc-800/90 rounded-3xl p-4 flex flex-col justify-between hover:border-red-500/60 transition-colors">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-zinc-800 mb-3 bg-zinc-900">
              <img
                src="/images/mockup-infographic.png"
                alt="4 Light Modes & Quad-Chip LED Infographic"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase">4 LIGHT MODES & 272 CHIPS</div>
              <p className="text-[11px] text-zinc-400 font-light mt-1">
                68 LED beads with 4 quad-chips each ensure zero blind spots across all facial contours.
              </p>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800/90 rounded-3xl p-4 flex flex-col justify-between hover:border-red-500/60 transition-colors">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-zinc-800 mb-3 bg-zinc-900">
              <img
                src="/images/mockup-led-beads.png"
                alt="Beauty Salon S-Class High Purity LED Beads"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase">S-CLASS LAMP BEAD GROUP</div>
              <p className="text-[11px] text-zinc-400 font-light mt-1">
                High-purity light energy penetrates deep dermal layers for collagen synthesis and tissue repair.
              </p>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800/90 rounded-3xl p-4 flex flex-col justify-between hover:border-red-500/60 transition-colors">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-zinc-800 mb-3 bg-zinc-900">
              <img
                src="/images/mockup-irradiance.jpg"
                alt="Optical Power Meter Irradiance Test (11.1 - 52.6 mW/cm²)"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase">TESTED 11.1 ~ 52.6 mW/cm² IRRADIANCE</div>
              <p className="text-[11px] text-zinc-400 font-light mt-1">
                Verified power density meter output across 3 intensity gear settings for both Red/NIR and Blue/NIR modes.
              </p>
            </div>
          </div>

        </div>

        {/* Feature Tabs Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Science Visual Diagram */}
          <div className="lg:col-span-6 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-800/80 mb-4">
              <img
                src="/images/science-diagram.png"
                alt="Wavelength Penetration Science Diagram"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-zinc-300 bg-black/70 backdrop-blur-md p-3 rounded-xl border border-zinc-800">
                <span className="font-bold text-red-400 block mb-1">CLINICAL MULTI-SPECTRUM PDT MATRIX</span>
                Deep Red (630nm) & NIR (850nm) penetrate deep collagen, while Blue (460nm) & Amber (605nm) clarify tone.
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800 text-center">
                <div className="text-red-400 font-bold">630nm</div>
                <div className="text-zinc-500 text-[10px]">Deep Red</div>
              </div>
              <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800 text-center">
                <div className="text-amber-400 font-bold">850nm</div>
                <div className="text-zinc-500 text-[10px]">NIR Infrared</div>
              </div>
              <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800 text-center">
                <div className="text-blue-400 font-bold">460nm</div>
                <div className="text-zinc-500 text-[10px]">Blue Photon</div>
              </div>
              <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800 text-center">
                <div className="text-amber-300 font-bold">605nm</div>
                <div className="text-zinc-500 text-[10px]">Amber Glow</div>
              </div>
            </div>
          </div>

          {/* Feature Tabs Selector */}
          <div className="lg:col-span-6 space-y-4">
            {techFeatures.map((tech, idx) => {
              const Icon = tech.icon;
              const isSelected = activeTab === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900/90 border-red-500/60 shadow-xl shadow-red-950/50'
                      : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${tech.color} text-white shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-white uppercase">{tech.title}</h3>
                        <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                          {tech.spec}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-amber-400/90">{tech.subtitle}</p>
                      {isSelected && (
                        <p className="text-xs text-zinc-300 font-light pt-2 leading-relaxed animate-in fade-in duration-200">
                          {tech.desc}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
