import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const EmailNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#08080c] to-[#050507] text-white border-t border-zinc-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
          BE THE FIRST TO EXPERIENCE WHAT’S NEXT
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto font-light">
          Subscribe for VIP launch access, dermatological skin guides, and exclusive beauty-tech updates.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-6 py-3 rounded-full">
            <CheckCircle2 className="w-4 h-4" /> YOU ARE ON THE VIP ACCESS LIST!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-full px-5 py-3.5 text-xs text-white focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-red-950 flex items-center justify-center gap-2"
            >
              <span>{loading ? 'JOINING...' : 'JOIN VIP CLUB'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
