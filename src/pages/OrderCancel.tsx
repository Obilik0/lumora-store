import React from 'react';
import { ShoppingBag, ArrowLeft, RefreshCw, HelpCircle } from 'lucide-react';

export const OrderCancel: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-[#08080c] border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-2xl">
        
        <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-700 text-amber-400 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold uppercase tracking-tight text-white">
            CHECKOUT CANCELED
          </h1>
          <p className="text-zinc-400 text-xs font-light leading-relaxed">
            Your Stripe checkout session was canceled. No charges were made to your card. Your LUMORA LED Mask is still reserved in your bag.
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl text-xs space-y-2 text-left">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <RefreshCw className="w-4 h-4" /> 30-Day Risk-Free Trial
          </div>
          <p className="text-[11px] text-zinc-400">
            Remember, every LUMORA order comes with 30 days to try the mask risk-free and a 1-Year Warranty by ABPM COMMERCE LTD.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <a
            href="/"
            className="w-full py-3.5 bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold uppercase text-xs tracking-wider rounded-full shadow-lg shadow-red-950 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO CART & TRY AGAIN</span>
          </a>
        </div>

      </div>
    </div>
  );
};
