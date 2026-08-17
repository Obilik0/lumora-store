import Stripe from 'stripe';
import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { session_id } = req.query;
    if (!session_id) {
      return res.status(400).json({ error: 'session_id parameter is required' });
    }

    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecret) {
      return res.status(500).json({ error: 'STRIPE_SECRET_KEY missing' });
    }

    const stripe = new Stripe(stripeSecret, { apiVersion: '2023-10-16' });

    // Retrieve live Checkout session directly from Stripe Server
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'payment_intent'],
    });

    if (!session) {
      return res.status(404).json({ error: 'Session not found in Stripe' });
    }

    const isPaid = session.payment_status === 'paid';
    const customerEmail = session.customer_details?.email || 'Customer';
    const customerName = session.customer_details?.name || 'Customer';
    const amountTotal = (session.amount_total || 12999) / 100;
    const orderNumber = session.client_reference_id || 'LUMORA-' + session_id.slice(-6).toUpperCase();

    let shippingAddress = 'United States Delivery';
    if (session.shipping_details?.address) {
      const a = session.shipping_details.address;
      shippingAddress = `${a.line1 || ''}, ${a.city || ''}, ${a.state || ''} ${a.postal_code || ''}, ${a.country || ''}`;
    }

    // Confirm order status in public.orders table
    if (isPaid) {
      try {
        await supabase
          .from('orders')
          .update({
            customer_name: customerName,
            customer_email: customerEmail,
            shipping_address: shippingAddress,
            status: 'confirmed',
            total_amount: amountTotal,
          })
          .eq('order_number', orderNumber);
      } catch (dbErr) {
        console.error('Database update error on verify:', dbErr);
      }
    }

    return res.status(200).json({
      paid: isPaid,
      orderNumber,
      customerName,
      customerEmail,
      shippingAddress,
      amountTotal,
      currency: session.currency || 'usd',
      status: session.status,
    });
  } catch (err) {
    console.error('Session Verification Error:', err);
    return res.status(500).json({ error: err.message || 'Verification failed' });
  }
}
