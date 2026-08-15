import React, { useState } from 'react';
import { X, Lock, CheckCircle, CreditCard, ShieldCheck } from 'lucide-react';
import { CartItem } from '../lib/types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderComplete: (orderNumber: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<'info' | 'success'>('info');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNum, setOrderNum] = useState('');

  if (!isOpen) return null;

  const totalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address) return;

    setIsProcessing(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: name,
          customer_email: email,
          shipping_address: `${address}, ${city} ${zip}, United States`,
          items: cart,
          total_amount: totalAmount,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setOrderNum(data.order_number);
        setStep('success');
        onOrderComplete(data.order_number);
      }
    } catch (err) {
      console.error('Order error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#08080c] border border-zinc-800 text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'info' ? (
          <>
            <div className="space-y-1 border-b border-zinc-800 pb-4">
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <Lock className="w-3.5 h-3.5" /> SECURE US CHECKOUT
              </div>
              <h2 className="text-xl font-extrabold uppercase">COMPLETE YOUR ORDER</h2>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4 text-xs">
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-amber-400 uppercase">1. Customer Details</h3>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-bold text-amber-400 uppercase">2. US Shipping Address</h3>
                <input
                  type="text"
                  required
                  placeholder="Street Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="City, State"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="text"
                    required
                    placeholder="ZIP Code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-bold text-amber-400 uppercase">3. Payment (Simulated Sandbox)</h3>
                <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-red-400" />
                    <span className="font-mono text-zinc-300">{cardNumber}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-950 border border-emerald-800 text-emerald-300 px-2 py-0.5 rounded">
                    TEST MODE
                  </span>
                </div>
              </div>

              <div className="bg-zinc-900/60 p-4 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between font-bold text-white text-sm">
                  <span>Total Amount</span>
                  <span className="font-mono text-red-400">${totalAmount.toFixed(2)} USD</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-red-600 via-red-500 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-red-950"
              >
                {isProcessing ? 'PROCESSING SECURE PAYMENT...' : `PAY $${totalAmount.toFixed(2)} NOW`}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold uppercase text-white">ORDER CONFIRMED!</h2>
            <p className="text-xs text-zinc-300 max-w-md mx-auto">
              Thank you, <strong>{name}</strong>! Your order <strong>#{orderNum}</strong> has been received and is being prepared for Express US Shipping.
            </p>
            <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 text-xs font-mono text-amber-400">
              Confirmation sent to: {email}
            </div>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold uppercase rounded-full text-xs"
            >
              RETURN TO STORE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
