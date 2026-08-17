import Stripe from 'stripe';
import supabase from './db-client.js';

export const config = { api: { bodyParser: false } };

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeSecret) return res.status(500).json({ error: 'STRIPE_SECRET_KEY missing' });
  if (!webhookSecret) return res.status(500).json({ error: 'STRIPE_WEBHOOK_SECRET missing' });

  const stripe = new Stripe(stripeSecret, { apiVersion: '2023-10-16' });
  let event;

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers['stripe-signature'];
    if (!signature) return res.status(400).json({ error: 'Missing Stripe signature' });
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Signature Verification Error: ${err.message}`);
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const orderReference = session.client_reference_id || session.metadata?.order_reference || session.metadata?.order_number || `LUMORA-${Math.floor(100000 + Math.random() * 900000)}`;
      const customerName = session.customer_details?.name || session.shipping_details?.name || 'LUMORA Customer';
      const customerEmail = session.customer_details?.email || session.customer_email || null;
      const amount = (session.amount_total || 0) / 100;
      const quantity = Number(session.metadata?.quantity) || 1;

      let shippingAddress = null;
      if (session.shipping_details?.address) {
        const a = session.shipping_details.address;
        shippingAddress = `${a.line1 || ''}${a.line2 ? `, ${a.line2}` : ''}, ${a.city || ''}, ${a.state || ''} ${a.postal_code || ''}, ${a.country || ''}`.trim();
      }

      const { data: existing, error: lookupError } = await supabase
        .from('orders')
        .select('id, order_reference, payment_status')
        .eq('order_reference', orderReference)
        .maybeSingle();
      if (lookupError) throw lookupError;

      const payload = {
        order_reference: orderReference,
        customer_name: customerName,
        customer_email: customerEmail,
        amount,
        currency: (session.currency || 'usd').toLowerCase(),
        payment_status: 'paid',
        fulfillment_status: 'unfulfilled',
        shipping_address: shippingAddress,
        updated_at: new Date().toISOString(),
      };

      if (existing) {
        if (existing.payment_status !== 'paid') {
          const { error } = await supabase.from('orders').update(payload).eq('id', existing.id);
          if (error) throw error;
        }
      } else {
        const { error } = await supabase.from('orders').insert({
          ...payload,
          created_at: new Date().toISOString(),
        });
        if (error) throw error;
      }
    }

    if (event.type === 'checkout.session.expired') {
      const session = event.data.object;
      const orderReference = session.client_reference_id || session.metadata?.order_reference || session.metadata?.order_number;
      if (orderReference) {
        const { error } = await supabase.from('orders').update({
          payment_status: 'expired',
          updated_at: new Date().toISOString(),
        }).eq('order_reference', orderReference);
        if (error) throw error;
      }
    }

    if (event.type === 'charge.refunded') {
      const charge = event.data.object;
      if (charge.payment_intent) {
        console.log(`[Stripe Webhook] Refunded payment intent: ${charge.payment_intent}`);
      }
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook processing error:', err);
    return res.status(500).json({ error: 'Webhook processing error' });
  }
}
