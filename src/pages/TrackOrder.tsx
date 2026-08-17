import React, { useState, useEffect } from 'react';
import { Search, Package, CheckCircle2, Truck, Clock, ExternalLink, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';

interface TrackingData {
  found: boolean;
  orderReference: string;
  status: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  carrier: string | null;
  trackingNumber: string | null;
  trackingUrl: string | null;
  createdAt: string;
  cityState: string;
  message?: string;
}

export const TrackOrder: React.FC = () => {
  const [refInput, setRefInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Auto-search if ?reference= parameter is in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlRef = params.get('reference') || params.get('ref');
    if (urlRef) {
      setRefInput(urlRef);
      performSearch(urlRef);
    }
  }, []);

  const performSearch = async (refToSearch: string) => {
    if (!refToSearch.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    setTrackingData(null);

    try {
      const res = await fetch(`/api/track-order?reference=${encodeURIComponent(refToSearch.trim())}`);
      const data = await res.json();

      if (res.ok && data.found) {
        setTrackingData(data);
      } else {
        setErrorMsg(data.message || "We couldn't find an order with that reference number. Please check the number and try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('A network error occurred. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(refInput);
  };

  // Determine active step index for timeline
  const getTimelineStep = (fulfillmentStatus: string, status: string) => {
    const fStatus = (fulfillmentStatus || '').toLowerCase();
    const oStatus = (status || '').toLowerCase();

    if (fStatus === 'delivered') return 4;
    if (fStatus === 'in_transit' || fStatus === 'in transit') return 3;
    if (fStatus === 'shipped') return 2;
    if (fStatus === 'processing') return 1;
    if (oStatus === 'confirmed' || oStatus === 'paid' || fStatus === 'unfulfilled') return 0;
    return 0;
  };

  const currentStep = trackingData ? getTimelineStep(trackingData.fulfillmentStatus, trackingData.status) : 0;

  const steps = [
    { title: 'Order Confirmed', desc: 'Payment verified & order received' },
    { title: 'Processing', desc: 'Preparing at US fulfillment warehouse' },
    { title: 'Shipped', desc: 'Dispatched with carrier' },
    { title: 'In Transit', desc: 'On the way to destination' },
    { title: 'Delivered', desc: 'Successfully delivered' },
  ];

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="bg-[#08080c] border-b border-zinc-800/80 py-4 px-6 sticky top-0 z-30 backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <img src="/images/lumora-logo.png" alt="LUMORA" className="h-8 w-auto object-contain" />
          </a>
          <a
            href="/"
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store</span>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 sm:py-16 space-y-10">
        
        {/* Page Title Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/40 text-red-300 text-xs font-semibold uppercase tracking-widest">
            <Package className="w-3.5 h-3.5 text-amber-400" />
            <span>EXPRESS US ORDER TRACKING</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            TRACK YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">ORDER</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto font-light">
            Enter your order reference number to view your latest order status and shipment progress.
          </p>
        </div>

        {/* Order Reference Input Form */}
        <div className="bg-[#08080c] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={refInput}
                onChange={(e) => setRefInput(e.target.value)}
                placeholder="e.g. LUMORA-849201"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder-zinc-500 font-mono uppercase focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-red-600 via-red-500 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-red-950 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shrink-0"
            >
              <span>{loading ? 'SEARCHING...' : 'TRACK ORDER'}</span>
              <Package className="w-4 h-4" />
            </button>
          </form>

          {/* Example Reference Helper */}
          <div className="text-[11px] text-zinc-500 font-mono text-center">
            Example reference format: <span className="text-amber-400">LUMORA-849201</span>
          </div>
        </div>

        {/* Error / Not Found Message */}
        {errorMsg && (
          <div className="bg-red-950/40 border border-red-800/60 p-5 rounded-2xl flex items-center gap-3 text-xs text-red-200 animate-in fade-in duration-200">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Tracking Data Results */}
        {trackingData && (
          <div className="bg-[#08080c] border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl animate-in fade-in duration-300">
            
            {/* Summary Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
              <div>
                <div className="text-[11px] text-zinc-400 uppercase font-mono">ORDER REFERENCE</div>
                <div className="text-xl font-bold text-amber-400 font-mono">{trackingData.orderReference}</div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1.5 rounded-full">
                  <ShieldCheck className="w-4 h-4" /> VERIFIED PAID
                </span>
                <span className="text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full uppercase">
                  {trackingData.cityState}
                </span>
              </div>
            </div>

            {/* Timeline Process Bar */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">SHIPMENT PROGRESS</h3>

              {/* Desktop Progress Stepper */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
                {steps.map((s, idx) => {
                  const isDone = idx <= currentStep;
                  const isCurrent = idx === currentStep;

                  return (
                    <div key={idx} className="flex flex-col items-center text-center space-y-2 relative z-10">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs border transition-all ${
                          isDone
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-500 shadow-lg shadow-emerald-950'
                            : 'bg-zinc-950 text-zinc-600 border-zinc-800'
                        } ${isCurrent ? 'ring-2 ring-amber-400 scale-110' : ''}`}
                      >
                        {isDone ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : idx + 1}
                      </div>

                      <div className="space-y-0.5">
                        <div className={`text-xs font-bold uppercase ${isDone ? 'text-white' : 'text-zinc-500'}`}>
                          {s.title}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-light leading-tight">
                          {s.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Carrier & Tracking Number Box */}
            <div className="bg-zinc-950 border border-zinc-800/80 p-5 rounded-2xl space-y-4">
              {trackingData.carrier && trackingData.trackingNumber ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2 font-bold text-white uppercase">
                      <Truck className="w-4 h-4 text-amber-400" />
                      <span>CARRIER: {trackingData.carrier}</span>
                    </div>
                    <div className="font-mono text-zinc-300 text-xs">
                      Tracking #: <strong className="text-amber-400">{trackingData.trackingNumber}</strong>
                    </div>
                  </div>

                  {trackingData.trackingUrl ? (
                    <a
                      href={trackingData.trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-1.5 shrink-0"
                    >
                      <span>TRACK SHIPMENT</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-zinc-400">Carrier Scan Active</span>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3 text-xs text-zinc-400 font-light">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>
                    Your order has been confirmed. Official carrier tracking information will appear here automatically as soon as your order ships from our warehouse.
                  </span>
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-6 text-center text-[11px] text-zinc-500">
        © {new Date().getFullYear()} LUMORA (ABPM COMMERCE LTD). All rights reserved. Support: support@lumora.com
      </footer>

    </div>
  );
};
