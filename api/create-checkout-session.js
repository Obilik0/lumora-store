import Stripe from 'stripe';
import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecret) {
      return res.status(500).json({ error: 'STRIPE_SECRET_KEY is not configured on server' });
    }

    const stripe = new Stripe(stripeSecret, { apiVersion: '2023-10-16' });

    const { items, successUrl, cancelUrl } = req.body;
    
    // Server-Side Price Validation (Never trust price from frontend)
    const fixedUnitAmount = 12999; // $129.99 USD in cents
    const priceId = process.env.STRIPE_PRICE_ID_ECLIPSE || process.env.STRIPE_PRICE_ID;

    // Determine quantity from items
    let quantity = 1;
    if (Array.isArray(items) && items.length > 0) {
      quantity = items.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
    }
    quantity = Math.max(1, quantity);

    // Resolve Origin dynamically so redirect back works on both preview and production domains
    let origin = 'https://lumora.com';
    if (req.headers.origin) {
      origin = req.headers.origin;
    } else if (req.headers.referer) {
      try {
        const u = new URL(req.headers.referer);
        origin = u.origin;
      } catch (e) {}
    } else if (req.headers['x-forwarded-host']) {
      const proto = req.headers['x-forwarded-proto'] || 'https';
      origin = `${proto}://${req.headers['x-forwarded-host']}`;
    }

    const finalSuccessUrl = successUrl || `${origin}/order-success?session_id={CHECKOUT_SESSION_ID}`;
    const finalCancelUrl = cancelUrl || `${origin}/order-cancel`;

    const orderNumber = 'LUMORA-' + Math.floor(100000 + Math.random() * 900000);

    // Build line items for Stripe Checkout
    let lineItems = [];
    if (priceId && priceId.startsWith('price_')) {
      lineItems = [{
        price: priceId,
        quantity: quantity,
      }];
    } else {
      lineItems = [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'LUMORA Red Light Therapy LED Mask',
            description: 'Clinical 630nm/660nm Deep Red & 850nm Near-Infrared LED Phototherapy Device (Model SKB-2318Pro)',
            images: [`${origin}/images/mask-hero.png`],
          },
          unit_amount: fixedUnitAmount, // $129.99 USD
        },
        quantity: quantity,
      }];
    }

    // Create Stripe Checkout Session with explicit English locale
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      locale: 'en', // Explicitly force English language on the Stripe Hosted Checkout page
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'ES', 'IT', 'NL', 'IE'],
      },
      phone_number_collection: {
        enabled: true,
      },
      success_url: finalSuccessUrl,
      cancel_url: finalCancelUrl,
      client_reference_id: orderNumber,
      metadata: {
        order_number: orderNumber,
        product_name: 'LUMORA Red Light Therapy LED Mask',
        quantity: String(quantity),
        company_name: 'ABPM COMMERCE LTD',
      },
    });

    // Save initial pending order record in existing public.orders table
    try {
      await supabase.from('orders').insert({
        order_number: orderNumber,
        customer_name: 'LUMORA Checkout Customer',
        customer_email: 'pending_checkout@lumora.com',
        shipping_address: 'US Express Delivery',
        items: [{ title: 'LUMORA Red Light Therapy LED Mask', quantity, price: 129.99 }],
        total_amount: (fixedUnitAmount * quantity) / 100,
        status: 'pending',
        created_at: new Date().toISOString(),
      });
    } catch (dbErr) {
      console.error('Supabase initial orders table insert warning:', dbErr);
    }

    return res.status(200).json({
      url: session.url,
      sessionId: session.id,
      orderNumber,
    });
  } catch (err) {
    console.error('Stripe Checkout Error:', err);
    return res.status(500).json({ error: err.message || 'Failed to create checkout session' });
  }
}