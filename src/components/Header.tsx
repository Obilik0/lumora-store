import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Menu, X, ChevronRight, Package, Award } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  brandName: string;
  logoUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  brandName = 'LUMORA',
  logoUrl = '/images/lumora-logo.png',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#050507]/85 backdrop-blur-xl border-b border-red-900/30 transition-all duration-300">
      {/* Top US Shipping Announcement Bar */}
      <div className="bg-gradient-to-r from-red-950 via-red-900/60 to-red-950 text-red-200 text-xs py-1.5 px-4 text-center border-b border-red-500/20 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        <span className="font-medium tracking-wide uppercase text-[10px] sm:text-xs">
          FREE EXPRESS US SHIPPING & 30-DAY MONEY-BACK RISK-FREE TRIAL
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={brandName}
              className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105 filter drop-shadow-[0_0_12px_rgba(239,68,68,0.4)]"
            />
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-red-600 via-red-500 to-amber-500 p-0.5 shadow-lg shadow-red-900/30 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-red-400 group-hover:rotate-12 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-wider text-white uppercase font-serif">
                  {brandName}
                </span>
                <span className="text-[9px] tracking-widest text-red-400 uppercase -mt-1 font-mono">
                  LIGHT THERAPY TECH
                </span>
              </div>
            </div>
          )}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-medium uppercase tracking-widest text-zinc-300">
          <button
            onClick={() => scrollToSection('technology')}
            className="hover:text-red-400 transition-colors cursor-pointer"
          >
            Technology
          </button>
          <button
            onClick={() => scrollToSection('benefits')}
            className="hover:text-red-400 transition-colors cursor-pointer"
          >
            Results
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-red-400 transition-colors cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('reviews')}
            className="hover:text-red-400 transition-colors cursor-pointer"
          >
            Reviews
          </button>
          <button
            onClick={() => scrollToSection('certifications')}
            className="hover:text-red-400 transition-colors cursor-pointer"
          >
            Certifications
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="hover:text-red-400 transition-colors cursor-pointer"
          >
            FAQ
          </button>
          <a
            href="/track-order"
            className="text-amber-400 hover:text-amber-300 transition-colors font-bold flex items-center gap-1"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Track Order</span>
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center p-2.5 text-zinc-200 hover:text-white bg-zinc-900/90 hover:bg-red-950/40 border border-red-900/40 rounded-full transition-all group"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform text-red-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-amber-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Desktop CTA */}
          <button
            onClick={() => {
              const el = document.getElementById('how-it-works') || document.body;
              el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-red-600 via-red-500 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-lg shadow-red-900/40 hover:shadow-red-600/50 transition-all hover:-translate-y-0.5"
          >
            <span>BUY NOW — $129.99</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0f] border-b border-red-900/30 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-4 text-sm font-medium uppercase tracking-widest text-zinc-200">
            <button
              onClick={() => scrollToSection('technology')}
              className="text-left py-2 border-b border-zinc-800 text-zinc-300 hover:text-red-400"
            >
              Technology & Science
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="text-left py-2 border-b border-zinc-800 text-zinc-300 hover:text-red-400"
            >
              Skin Results
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left py-2 border-b border-zinc-800 text-zinc-300 hover:text-red-400"
            >
              How To Use
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="text-left py-2 border-b border-zinc-800 text-zinc-300 hover:text-red-400"
            >
              Verified Reviews
            </button>
            <button
              onClick={() => scrollToSection('certifications')}
              className="text-left py-2 border-b border-zinc-800 text-zinc-300 hover:text-red-400"
            >
              Quality & Certifications
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left py-2 border-b border-zinc-800 text-zinc-300 hover:text-red-400"
            >
              Frequently Asked Questions
            </button>
            <a
              href="/track-order"
              className="text-left py-2 border-b border-zinc-800 text-amber-400 font-bold hover:text-amber-300 flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>Track Your Order</span>
            </a>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              const el = document.getElementById('how-it-works') || document.body;
              el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-amber-600 text-white text-sm font-bold uppercase tracking-wider py-3 rounded-full shadow-lg shadow-red-900/40"
          >
            <span>GET YOUR MASK — $129.99</span>
          </button>
        </div>
      )}
    </header>
  );
};
