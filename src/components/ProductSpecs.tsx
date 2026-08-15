import React from 'react';
import { Cpu, Zap, Battery, ShieldCheck, Sparkles, Sliders, Layers } from 'lucide-react';

export const ProductSpecs: React.FC = () => {
  const specList = [
    {
      category: 'OPTICAL & LIGHT SPECTRUM',
      icon: Sparkles,
      items: [
        { name: 'LED Count', value: '68 High-Efficiency Precision LED Beads' },
        { name: 'Wavelength Matrix', value: '630nm / 660nm Deep Red, 850nm Near-Infrared, 460nm Blue, 590nm Yellow' },
        { name: 'Light Spectrum Modes', value: '7 Photobiomodulation (PDT) Light Modes' },
        { name: 'Technology', value: 'Photobiomodulation & PDT Therapeutic Thermal Energy' },
      ],
    },
    {
      category: 'HARDWARE & POWER',
      icon: Battery,
      items: [
        { name: 'Battery Capacity', value: '1000mAh Rechargeable Lithium-Ion' },
        { name: 'Power Input / Output', value: 'Input 5V/1A | Operating 3.7V | Max Power 7.4W' },
        { name: 'Intensity Control', value: '2 Functional Modes + 3 Adjustable Intensity Gears' },
        { name: 'Plug Compatibility', value: 'US Standard Plug (Universal AU, UK, EU Adapter Support)' },
      ],
    },
    {
      category: 'DESIGN & ERGONOMICS',
      icon: Layers,
      items: [
        { name: 'Device Material', value: 'Ultra-Soft Hypoallergenic Medical Silicone' },
        { name: 'Coverage Zones', value: 'Full Coverage: Face, Eyes, Lips, Nose & Neck/Throat' },
        { name: 'Form Factor', value: 'Ergonomic Portable Handheld / Wearable Mask' },
        { name: 'Package & Weight', value: 'Single Box: 48 x 31 x 21 cm | Gross Weight 1.5 kg' },
      ],
    },
    {
      category: 'WARRANTY & COMPLIANCE',
      icon: ShieldCheck,
      items: [
        { name: 'Manufacturer', value: 'ABPM COMMERCE LTD (Brand: LUMORA)' },
        { name: 'Model Number', value: 'SKB-2318Pro' },
        { name: 'Warranty Period', value: '1-Year Full Manufacturer Warranty' },
        { name: 'Customer Support', value: '24/7 Priority Online Support (support@lumora.com)' },
      ],
    },
  ];

  return (
    <section id="specs" className="py-20 bg-[#060609] text-white border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-300 text-xs font-semibold uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>FULL TECHNICAL MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            LUMORA <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">SKB-2318Pro SPECIFICATIONS</span>
          </h2>
          <p className="text-zinc-400 text-sm font-light">
            Engineered to rigorous clinical standards for safe, effective at-home photobiomodulation.
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specList.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div
                key={idx}
                className="bg-zinc-950 border border-zinc-800/80 p-6 rounded-3xl space-y-6 hover:border-red-900/60 transition-colors"
              >
                <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
                  <div className="p-2.5 rounded-xl bg-zinc-900 text-amber-400 border border-zinc-800">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-extrabold uppercase text-white tracking-wider">
                    {group.category}
                  </h3>
                </div>

                <div className="space-y-3">
                  {group.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between text-xs py-1.5 border-b border-zinc-900/60 last:border-0 gap-1"
                    >
                      <span className="text-zinc-400 font-medium">{item.name}</span>
                      <span className="text-white font-mono font-semibold text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
