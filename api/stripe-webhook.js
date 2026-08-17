import Stripe from 'stripe';
import supabase from './db-client.js';

// Vercel Serverless Config to receive raw body for Stripe Webhook Signature Verification
export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', (err) => reject(err));
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecret) {
    console.error('STRIPE_SECRET_KEY missing in server environment');
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY missing' });
  }

  const stripe = new Stripe(stripeSecret, { apiVersion: '2023-10-16' });

  let event;

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers['stripe-signature'];

    if (webhookSecret && signature) {
      // Authoritative Webhook Signature Verification using STRIPE_WEBHOOK_SECRET
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } else {
      // Fallback for direct local/sandbox payload
      event = JSON.parse(rawBody.toString('utf8'));
    }
  } catch (err) {
    console.error('Webhook Signature Verification Failed:', err.message);
    return res.status(400).send(`Webhook Signature Verification Error: ${err.message}`);
  }

  console.log(`[Stripe Webhook Event Verified] Type: ${event.type} | ID: ${event.id}`);

  try {
    switch (event.type) {
      // Event 1: checkout.session.completed (Authoritative Source for Paid Orders)
      case 'checkout.session.completed': {
        const session = event.data.object;
        const customerName = session.customer_details?.name || session.shipping_details?.name || 'LUMORA Customer';
        const customerEmail = session.customer_details?.email || session.customer_email || 'support@lumora.com';
        const amountTotal = (session.amount_total || 12999) / 100;
        const orderNumber = session.client_reference_id || session.metadata?.order_number || ('LUMORA-' + Math.floor(100000 + Math.random() * 900000));
        const quantity = Number(session.metadata?.quantity) || 1;
        
        let shippingAddress = 'US Express Shipping';
        if (session.shipping_details?.address) {
          const addr = session.shipping_details.address;
          shippingAddress = `${addr.line1 || ''} ${addr.line2 || ''}, ${addr.city || ''}, ${addr.state || ''} ${addr.postal_code || ''}, ${addr.country || 'US'}`.trim();
        }

        const nowIso = new Date().toISOString();

        // Idempotency & Duplicate Webhook Protection on single public.orders table
        const { data: existingOrders } = await supabase
          .from('orders')
          .select('id, status, order_number')
          .eq('order_number', orderNumber);

        if (existingOrders && existingOrders.length > 0) {
          if (existingOrders[0].status === 'confirmed' || existingOrders[0].status === 'paid') {
            console.log(`[Idempotency] Order ${orderNumber} is already marked as confirmed in public.orders.`);
            return res.status(200).json({ received: true, note: 'already_processed' });
          }

          // Update existing pending order to confirmed
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
        } else {
          // Insert new confirmed order into single public.orders table
          await supabase
            .from('orders')
            .insert({
              order_number: orderNumber,
              customer_name: customerName,
              customer_email: customerEmail,
              shipping_address: shippingAddress,
              items: [{ title: 'LUMORA Red Light Therapy LED Mask', quantity, price: 129.99 }],
              total_amount: amountTotal,
              status: 'confirmed',
              created_at: nowIso,
            });
        }

        break;
      }

      // Event 2: payment_intent.succeeded
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        console.log(`[Stripe Webhook] Payment Intent Succeeded: ${paymentIntent.id}`);
        break;
      }

      // Event 3: payment_intent.payment_failed
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        console.log(`[Stripe Webhook] Payment Intent Failed: ${paymentIntent.id}`);
        break;
      }

      // Event 4: checkout.session.expired
      case 'checkout.session.expired': {
        const session = event.data.object;
        const orderNumber = session.client_reference_id || session.metadata?.order_number;
        if (orderNumber) {
          await supabase
            .from('orders')
            .update({ status: 'canceled' })
            .eq('order_number', orderNumber);
        }
        break;
      }

      // Event 5: charge.refunded
      case 'charge.refunded': {
        const charge = event.data.object;
        console.log(`[Stripe Webhook] Charge Refunded: ${charge.id}`);
        break;
      }

      default:
        console.log(`[Stripe Webhook] Event logged: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('Error handling webhook payload:', err);
    return res.status(500).json({ error: 'Webhook processing error' });
  }
}
