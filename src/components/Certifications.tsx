import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';

export const Certifications: React.FC = () => {
  return (
    <section
      id="certifications"
      className="py-24 bg-[#08080c] text-white relative border-t border-zinc-900 overflow-hidden"
    >
      {/* Background Subtle Red & Amber Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-300 text-xs font-semibold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>QUALITY & COMPLIANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">
            CERTIFIED QUALITY. <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">BUILT WITH CONFIDENCE.</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Designed with quality, safety, and performance in mind. LUMORA products are supported by industry testing, compliance documentation, and quality certifications.
          </p>
        </div>

        {/* Certification Board Image Display Container */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-zinc-800/90 bg-zinc-950/90 shadow-[0_0_50px_rgba(239,68,68,0.15)] group transition-all duration-500 hover:border-red-900/60">
            <img
              src="/images/certifications-board.png"
              alt="LUMORA Quality & Compliance Certificates Board"
              className="w-full h-auto object-contain block transition-transform duration-700 group-hover:scale-[1.01]"
              loading="lazy"
            />
            
            {/* Ambient Red Edge Highlight */}
            <div className="absolute inset-0 border border-red-500/20 rounded-3xl pointer-events-none" />
          </div>

          <div className="mt-4 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Official LUMORA Compliance Documentation
            </span>
            <span>ABPM COMMERCE LTD Standard</span>
          </div>
        </div>

      </div>
    </section>
  );
};
