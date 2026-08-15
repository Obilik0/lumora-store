import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TechScience } from './components/TechScience';
import { ProductSpecs } from './components/ProductSpecs';
import { HowItWorks } from './components/HowItWorks';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LaunchDashboard } from './components/LaunchDashboard';
import { LegalModal, PolicyType } from './components/LegalModal';
import { EmailNewsletter } from './components/EmailNewsletter';
import { Footer } from './components/Footer';
import { OrderSuccess } from './pages/OrderSuccess';
import { OrderCancel } from './pages/OrderCancel';
import { Product, Review, FAQItem, BrandConfig, CartItem } from './lib/types';

export function App() {
  const pathname = window.location.pathname;

  // Handle Stripe Redirect Pages
  if (pathname.startsWith('/order-success')) {
    return <OrderSuccess />;
  }
  if (pathname.startsWith('/order-cancel')) {
    return <OrderCancel />;
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [configs, setConfigs] = useState<BrandConfig[]>([]);
  const [configMap, setConfigMap] = useState<Record<string, string>>({});
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  // Initial Data Loading
  useEffect(() => {
    fetchProducts();
    fetchReviews();
    fetchFaqs();
    fetchConfig();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data && data.length > 0) setProduct(data[0]);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (data) setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/faq');
      const data = await res.json();
      if (data) setFaqs(data);
    } catch (err) {
      console.error('Error fetching FAQ:', err);
    }
  };

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/config');
      const data = await res.json();
      if (data) {
        setConfigs(data.list || []);
        setConfigMap(data.map || {});
      }
    } catch (err) {
      console.error('Error fetching config:', err);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleAddReview = async (reviewData: any) => {
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });
      if (res.ok) fetchReviews();
    } catch (err) {
      console.error('Error adding review:', err);
    }
  };

  const handleUpdateConfig = async (config_key: string, config_value: string) => {
    try {
      const is_placeholder = config_value.startsWith('[') && config_value.endsWith(']');
      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config_key, config_value, is_placeholder }),
      });
      if (res.ok) fetchConfig();
    } catch (err) {
      console.error('Error updating config:', err);
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const brandName = configMap['BRAND NAME'] || 'LUMORA';

  return (
    <div className="min-h-screen bg-[#050507] text-white selection:bg-red-500 selection:text-white font-sans">
      
      {/* Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        brandName={brandName}
        logoUrl={configMap['LOGO'] || '/images/lumora-logo.png'}
      />

      {/* Main Content Sections */}
      <main>
        {/* Cinematic Hero Section */}
        <Hero
          onAddToCart={handleAddToCart}
          brandName={brandName}
          productName={product?.title || 'LUMORA Red Light Therapy LED Mask'}
        />

        {/* Technology & Science Section */}
        <TechScience />

        {/* Hardware & Technical Specs Matrix */}
        <ProductSpecs />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Draggable Before / After Section */}
        <BeforeAfterSlider />

        {/* Customer Reviews Section */}
        <ReviewsSection reviews={reviews} onAddReview={handleAddReview} />

        {/* FAQ Section */}
        <FAQSection faqs={faqs} />

        {/* VIP Newsletter */}
        <EmailNewsletter />
      </main>

      {/* Footer */}
      <Footer
        brandName={brandName}
        onOpenPolicy={(policy) => setActivePolicy(policy)}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal Simulator */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderComplete={() => setCart([])}
      />

      {/* Brief Page 23 Launch Config Dashboard */}
      <LaunchDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        configs={configs}
        onUpdateConfig={handleUpdateConfig}
      />

      {/* Legal & Policy Modals */}
      <LegalModal
        policyType={activePolicy}
        onClose={() => setActivePolicy(null)}
        brandName="LUMORA"
        domain="lumora.com"
        companyName="ABPM COMMERCE LTD"
        supportEmail="support@lumora.com"
      />

      {/* Vercel Web Analytics */}
      <Analytics />

    </div>
  );
}

export default App;