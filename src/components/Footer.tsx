import React from 'react';
import { Shield, Truck, RefreshCw, Lock } from 'lucide-react';
import { PolicyType } from './LegalModal';

interface FooterProps {
  brandName: string;
  onOpenPolicy: (type: PolicyType) => void;
}

export const Footer: React.FC<FooterProps> = ({ brandName = 'LUMORA', onOpenPolicy }) => {
  return (
    <footer className="bg-[#030305] text-zinc-400 text-xs border-t border-zinc-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-zinc-900 text-center">
          <div className="space-y-1 cursor-pointer group" onClick={() => onOpenPolicy('shipping')}>
            <Truck className="w-6 h-6 text-red-500 mx-auto group-hover:scale-110 transition-transform" />
            <div className="font-bold text-white uppercase text-[11px] group-hover:text-red-400">Free Express US Shipping</div>
            <div className="text-[10px] text-zinc-500">Fast 2-4 business day delivery</div>
          </div>
          <div className="space-y-1 cursor-pointer group" onClick={() => onOpenPolicy('returns')}>
            <RefreshCw className="w-6 h-6 text-amber-500 mx-auto group-hover:scale-110 transition-transform" />
            <div className="font-bold text-white uppercase text-[11px] group-hover:text-amber-400">30-Day Money Back</div>
            <div className="text-[10px] text-zinc-500">Risk-free trial period</div>
          </div>
          <div className="space-y-1 cursor-pointer group" onClick={() => onOpenPolicy('warranty')}>
            <Shield className="w-6 h-6 text-red-500 mx-auto group-hover:scale-110 transition-transform" />
            <div className="font-bold text-white uppercase text-[11px] group-hover:text-red-400">1-Year Full Warranty</div>
            <div className="text-[10px] text-zinc-500">ABPM COMMERCE LTD guarantee</div>
          </div>
          <div className="space-y-1 cursor-pointer group" onClick={() => onOpenPolicy('terms')}>
            <Lock className="w-6 h-6 text-emerald-400 mx-auto group-hover:scale-110 transition-transform" />
            <div className="font-bold text-white uppercase text-[11px] group-hover:text-emerald-300">256-Bit SSL Checkout</div>
            <div className="text-[10px] text-zinc-500">Secure encrypted payments</div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img
                src="/images/lumora-logo.png"
                alt="LUMORA"
                className="h-8 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]"
              />
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed font-light">
              Premium American beauty-tech by <strong>ABPM COMMERCE LTD</strong> dedicated to clinical photobiomodulation and skin transformation.
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-white uppercase text-[11px] text-amber-400">Shop & Tech</div>
            <ul className="space-y-1.5 text-zinc-400">
              <li><a href="#technology" className="hover:text-white">Phototherapy Science</a></li>
              <li><a href="#specs" className="hover:text-white">SKB-2318Pro Specs</a></li>
              <li><a href="#how-it-works" className="hover:text-white">Usage Instructions</a></li>
              <li><a href="#reviews" className="hover:text-white">Verified Reviews</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-white uppercase text-[11px] text-amber-400">Support & Legal</div>
            <ul className="space-y-1.5 text-zinc-400">
              <li><button onClick={() => onOpenPolicy('shipping')} className="hover:text-white text-left">Shipping Policy (2-4 Days)</button></li>
              <li><button onClick={() => onOpenPolicy('returns')} className="hover:text-white text-left">30-Day Return Policy</button></li>
              <li><button onClick={() => onOpenPolicy('warranty')} className="hover:text-white text-left">1-Year Warranty Details</button></li>
              <li><button onClick={() => onOpenPolicy('privacy')} className="hover:text-white text-left">Privacy Policy</button></li>
              <li><button onClick={() => onOpenPolicy('terms')} className="hover:text-white text-left">Terms of Service</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-white uppercase text-[11px] text-amber-400">Contact</div>
            <div className="text-[11px] text-zinc-500">
              Support Email: <span className="text-zinc-200">support@lumora.com</span>
            </div>
            <div className="text-[11px] text-zinc-500">
              Company: <span className="text-zinc-200">ABPM COMMERCE LTD</span>
            </div>
            <div className="text-[11px] text-zinc-500">
              Domain: <span className="text-zinc-200">lumora.com</span>
            </div>
            <div className="text-[10px] text-zinc-500 pt-2">
              Designed for the United States DTC Market ($129.99 USD).
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-zinc-900 text-center text-[10px] text-zinc-600">
          © {new Date().getFullYear()} LUMORA (ABPM COMMERCE LTD). All rights reserved. Statements have not been evaluated by FDA.
        </div>

      </div>
    </footer>
  );
};
