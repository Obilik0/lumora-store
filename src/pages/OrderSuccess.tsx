import React, { useEffect, useState } from 'react';
import { CheckCircle2, ShieldCheck, Truck, ArrowRight, AlertTriangle } from 'lucide-react';

export const OrderSuccess: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');

    if (sessionId) {
      fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`)
        .then((res) => res.json())
        .then((data) => {
          setOrderDetails(data);
          setLoading(false);

          // Track a Purchase ONLY after Stripe confirms the payment is actually paid.
          // Use the real verified Stripe amount/currency instead of a hardcoded 0.00 value.
          if (data && data.paid) {
            const purchaseValue = Number(data.amountTotal);
            const purchaseCurrency = String(data.currency || 'usd').toUpperCase();

            if (
              purchaseValue > 0 &&
              typeof window !== 'undefined' &&
              typeof (window as any).fbq === 'function'
            ) {
              (window as any).fbq('track', 'Purchase', {
                value: purchaseValue,
                currency: purchaseCurrency,
              });
            }

            try {
              localStorage.removeItem('lumora_cart');
            } catch (err) {
              console.error('Cart clear error:', err);
            }
          }
        })
        .catch((err) => {
          console.error('Session verify error:', err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const isVerifiedPaid = orderDetails && orderDetails.paid === true;

  return (
    <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-xl w-full bg-[#08080c] border border-zinc-800 rounded-3xl p-6 sm:p-10 space-y-6 text-center shadow-2xl relative overflow-hidden">
        
        {/* Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-red-600/20 blur-3xl pointer-events-none" />

        {isVerifiedPaid ? (
          <div className="w-20 h-20 rounded-full bg-emerald-950/80 border-2 border-emerald-500/60 text-emerald-400 flex items-center justify-center mx-auto shadow-xl animate-in zoom-in duration-300">
            <CheckCircle2 className="w-12 h-12" />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-amber-950/80 border-2 border-amber-500/60 text-amber-400 flex items-center justify-center mx-auto shadow-xl">
            <AlertTriangle className="w-10 h-10" />
          </div>
        )}

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-mono uppercase tracking-widest bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
            <ShieldCheck className="w-3.5 h-3.5" /> {isVerifiedPaid ? 'PAYMENT VERIFIED BY STRIPE' : 'PAYMENT PENDING VERIFICATION'}
          </div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">
            {isVerifiedPaid ? 'THANK YOU FOR YOUR ORDER!' : 'PROCESSING PAYMENT...'}
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-light">
            {isVerifiedPaid
              ? 'Your payment was processed securely by Stripe. Your LUMORA Red Light Therapy LED Mask is being prepared for Express US Shipping.'
              : 'We are verifying your transaction with Stripe. If you completed payment, your receipt will appear below.'}
          </p>
        </div>

        {loading ? (
          <div className="py-8 text-xs font-mono text-zinc-500 animate-pulse">
            VERIFYING STRIPE PAYMENT STATUS...
          </div>
        ) : isVerifiedPaid ? (
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 text-xs space-y-3 text-left">
            <div className="flex justify-between border-b border-zinc-900 pb-2">
              <span className="text-zinc-400">Order Reference</span>
              <span className="font-mono text-amber-400 font-bold">{orderDetails.orderNumber}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-900 pb-2">
              <span className="text-zinc-400">Customer Name</span>
              <span className="font-semibold text-white">{orderDetails.customerName}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-900 pb-2">
              <span className="text-zinc-400">Confirmation Email</span>
              <span className="font-mono text-zinc-300">{orderDetails.customerEmail}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-900 pb-2">
              <span className="text-zinc-400">Total Charged</span>
              <span className="font-mono text-red-400 font-bold">${Number(orderDetails.amountTotal || 129.99).toFixed(2)} USD</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-zinc-400">US Shipping</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" /> FREE EXPRESS (2-4 DAYS)
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl text-xs text-amber-400">
            Payment verification is in progress. Please refresh or contact support@lumora.com if your card was charged.
          </div>
        )}

        <div className="pt-2">
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 via-red-500 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold uppercase text-xs tracking-wider py-3.5 px-8 rounded-full shadow-lg shadow-red-950 transition-all hover:scale-105"
          >
            <span>RETURN TO LUMORA STORE</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="text-[10px] text-zinc-500 font-mono pt-2">
          Operator: ABPM COMMERCE LTD | Support: support@lumora.com
        </div>

      </div>
    </div>
  );
};
