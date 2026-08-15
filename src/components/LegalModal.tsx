import React from 'react';
import { X, ShieldCheck, Truck, RotateCcw, FileText, Award } from 'lucide-react';

export type PolicyType = 'privacy' | 'shipping' | 'returns' | 'terms' | 'warranty' | null;

interface LegalModalProps {
  policyType: PolicyType;
  onClose: () => void;
  brandName?: string;
  domain?: string;
  companyName?: string;
  supportEmail?: string;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  policyType,
  onClose,
  brandName = 'LUMORA',
  domain = 'lumora.com',
  companyName = 'ABPM COMMERCE LTD',
  supportEmail = 'support@lumora.com',
}) => {
  if (!policyType) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#08080c] border border-zinc-800 text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 shrink-0">
          <div className="flex items-center gap-2">
            {policyType === 'privacy' && <ShieldCheck className="w-5 h-5 text-red-500" />}
            {policyType === 'shipping' && <Truck className="w-5 h-5 text-amber-400" />}
            {policyType === 'returns' && <RotateCcw className="w-5 h-5 text-emerald-400" />}
            {policyType === 'terms' && <FileText className="w-5 h-5 text-red-400" />}
            {policyType === 'warranty' && <Award className="w-5 h-5 text-amber-400" />}

            <h2 className="text-lg font-extrabold uppercase tracking-wider">
              {policyType === 'privacy' && 'PRIVACY POLICY'}
              {policyType === 'shipping' && 'SHIPPING POLICY'}
              {policyType === 'returns' && 'RETURN & REFUND POLICY'}
              {policyType === 'terms' && 'TERMS OF SERVICE'}
              {policyType === 'warranty' && 'MANUFACTURER WARRANTY'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 text-xs text-zinc-300 font-light leading-relaxed">
          
          {/* Privacy Policy */}
          {policyType === 'privacy' && (
            <div className="space-y-4">
              <p>
                <strong>Effective Date:</strong> {new Date().getFullYear()}<br />
                <strong>Operator:</strong> {companyName} ("we", "us", or "our")<br />
                <strong>Brand:</strong> {brandName}<br />
                <strong>Website:</strong> https://{domain}
              </p>

              <h3 className="font-bold text-white uppercase text-sm">1. Information We Collect</h3>
              <p>
                When you visit https://{domain} or make a purchase, we collect personal information such as your name, billing address, shipping address, payment details (processed securely via encrypted payment gateways), email address, and phone number.
              </p>

              <h3 className="font-bold text-white uppercase text-sm">2. How We Use Your Information</h3>
              <p>
                {companyName} uses your personal data strictly to fulfill orders, process payments, arrange express US shipping, send order tracking confirmations, and provide customer support via {supportEmail}.
              </p>

              <h3 className="font-bold text-white uppercase text-sm">3. Data Protection & Security</h3>
              <p>
                We employ 256-bit SSL encryption and strict security measures to ensure your personal data is protected against unauthorized access, alteration, or disclosure. We never sell or rent customer data to third parties.
              </p>

              <h3 className="font-bold text-white uppercase text-sm">4. Contact Us</h3>
              <p>
                For questions regarding this Privacy Policy or your data rights under US privacy laws, please contact our privacy compliance team at <strong>{supportEmail}</strong>.
              </p>
            </div>
          )}

          {/* Shipping Policy */}
          {policyType === 'shipping' && (
            <div className="space-y-4">
              <p>
                <strong>Operator:</strong> {companyName}<br />
                <strong>Service Area:</strong> United States (All 50 US States)<br />
                <strong>Default Shipping Rate:</strong> FREE Express US Shipping on all orders
              </p>

              <h3 className="font-bold text-white uppercase text-sm">1. Processing & Handling</h3>
              <p>
                All orders placed on https://{domain} are processed within 1 to 2 business days. Orders placed on weekends or US federal holidays will be processed on the next business day.
              </p>

              <h3 className="font-bold text-white uppercase text-sm">2. Estimated Delivery Time</h3>
              <p>
                We partner with premium US carriers (USPS, FedEx, UPS) to deliver your {brandName} Red Light Therapy LED Mask within <strong>2 to 4 business days</strong> following dispatch.
              </p>

              <h3 className="font-bold text-white uppercase text-sm">3. Order Tracking</h3>
              <p>
                As soon as your package ships, you will receive an email containing a direct tracking link. You can track your package in real-time from our warehouse to your doorstep.
              </p>
            </div>
          )}

          {/* Return & Refund Policy */}
          {policyType === 'returns' && (
            <div className="space-y-4">
              <h3 className="font-bold text-white uppercase text-sm">30-Day Risk-Free Trial Guarantee</h3>
              <p>
                We are confident in the clinical performance of the {brandName} Red Light Therapy LED Mask. If you are not completely satisfied with your results within 30 days of delivery, you may return the device for a full refund of your purchase price.
              </p>

              <h3 className="font-bold text-white uppercase text-sm">How to Initiate a Return</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>Contact customer support at <strong>{supportEmail}</strong> with your order number.</li>
                <li>Receive return authorization and prepaid US return shipping instructions from our support team.</li>
                <li>Pack the device in its original packaging along with all controller accessories.</li>
                <li>Once received and inspected at our warehouse, your refund will be credited back to your original payment method within 3-5 business days.</li>
              </ol>
            </div>
          )}

          {/* Terms of Service */}
          {policyType === 'terms' && (
            <div className="space-y-4">
              <p>
                These Terms of Service govern your use of https://{domain} and purchases made from <strong>{companyName}</strong> under the <strong>{brandName}</strong> trademark.
              </p>

              <h3 className="font-bold text-white uppercase text-sm">Product Disclaimer</h3>
              <p>
                The {brandName} Red Light Therapy LED Mask is designed for cosmetic photobiomodulation and skin aesthetic enhancement. Statements on this website have not been evaluated by the FDA and are not intended to diagnose, treat, cure, or prevent any medical condition.
              </p>
            </div>
          )}

          {/* Warranty */}
          {policyType === 'warranty' && (
            <div className="space-y-4">
              <h3 className="font-bold text-white uppercase text-sm">1-Year Manufacturer Full Warranty</h3>
              <p>
                <strong>{companyName}</strong> warrants the {brandName} Red Light Therapy LED Mask against defects in materials and workmanship under normal consumer use for a period of <strong>1 YEAR (12 Months)</strong> from the date of original delivery.
              </p>
              <p>
                If a technical hardware defect arises during the warranty period, {companyName} will either repair or replace your device with a brand new unit free of charge. Contact <strong>{supportEmail}</strong> for warranty service.
              </p>
            </div>
          )}

        </div>

        {/* Footer Close */}
        <div className="pt-4 border-t border-zinc-800 text-right shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold uppercase rounded-xl text-xs"
          >
            CLOSE WINDOW
          </button>
        </div>

      </div>
    </div>
  );
};
