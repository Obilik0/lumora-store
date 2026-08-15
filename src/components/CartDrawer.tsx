import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ShieldCheck, ArrowRight, Truck, Lock } from 'lucide-react';
import { CartItem } from '../lib/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: number, delta: number) => void;
  onRemoveItem: (productId: number) => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const finalTotal = subtotal - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'GLOW10' || promoCode.trim().toUpperCase() === 'VIP20') {
      setAppliedDiscount(10);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try GLOW10');
    }
  };

  const handleStripeCheckout = async () => {
    setIsRedirecting(true);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((i) => ({ id: i.product.id, quantity: i.quantity })),
          successUrl: `${window.location.origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/order-cancel`,
        }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        // Redirect directly to Stripe Hosted Checkout
        window.location.href = data.url;
      } else {
        alert(data.error || 'Failed to initiate Stripe Checkout. Please try again.');
        setIsRedirecting(false);
      }
    } catch (err) {
      console.error('Stripe Checkout redirect error:', err);
      alert('Network error initiating Stripe Checkout.');
      setIsRedirecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#08080c] text-white border-l border-zinc-800 shadow-2xl flex flex-col justify-between">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-bold uppercase tracking-wider">YOUR LUMORA CART</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-gradient-to-r from-red-950 to-zinc-900 p-3 px-6 text-xs border-b border-zinc-800 flex items-center gap-2 text-red-200">
            <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>You qualify for <strong>FREE EXPRESS US SHIPPING!</strong></span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-12 h-12 text-zinc-700 mx-auto" />
                <p className="text-zinc-400 text-sm">Your cart is currently empty.</p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-full text-xs font-bold uppercase text-red-400"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl flex gap-4 items-center"
                >
                  <img
                    src={item.product.images[0] || '/images/mask-hero.png'}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-xl border border-zinc-800 shrink-0"
                  />

                  <div className="flex-1 space-y-1">
                    <h3 className="text-xs font-bold text-white uppercase">{item.product.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-zinc-500 line-through">$179.99</span>
                      <span className="text-xs font-mono text-red-400 font-bold">$129.99 USD</span>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex items-center border border-zinc-800 rounded-lg bg-zinc-900">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2 py-0.5 text-zinc-400 hover:text-white text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2 py-0.5 text-zinc-400 hover:text-white text-xs font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-zinc-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-zinc-950 space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo Code (e.g. GLOW10)"
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs uppercase focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold uppercase rounded-xl"
                >
                  Apply
                </button>
              </form>
              {promoError && <p className="text-[10px] text-red-400">{promoError}</p>}
              {appliedDiscount > 0 && <p className="text-[10px] text-emerald-400">10% Discount Applied!</p>}

              <div className="space-y-1.5 text-xs text-zinc-400 border-t border-zinc-900 pt-3">
                <div className="flex justify-between">
                  <span>Regular Retail Value</span>
                  <span className="font-mono text-zinc-500 line-through">${(179.99 * cart.reduce((s, i) => s + i.quantity, 0)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>LUMORA Special Price ($129.99/ea)</span>
                  <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>VIP Promo Discount (10%)</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express US Shipping</span>
                  <span className="font-mono text-emerald-400">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total Amount USD</span>
                  <span className="font-mono text-red-400">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Direct Stripe Checkout Redirect Button */}
              <button
                onClick={handleStripeCheckout}
                disabled={isRedirecting}
                className="w-full py-4 bg-gradient-to-r from-red-600 via-red-500 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold uppercase tracking-wider rounded-2xl shadow-xl shadow-red-950 flex items-center justify-center gap-2 group transition-all hover:scale-[1.02]"
              >
                <Lock className="w-4 h-4 text-amber-300" />
                <span>{isRedirecting ? 'REDIRECTING TO STRIPE CHECKOUT...' : 'PROCEED TO STRIPE CHECKOUT'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Official Stripe Encrypted Checkout — ABPM COMMERCE LTD</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
