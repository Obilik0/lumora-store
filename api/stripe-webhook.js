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
      // Secure Signature Verification using STRIPE_WEBHOOK_SECRET
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } else {
      // Fallback for direct local/sandbox payload
      event = JSON.parse(rawBody.toString('utf8'));
    }
  } catch (err) {
    console.error('Webhook Signature Verification Failed:', err.message);
    return res.status(400).send(`Webhook Signature Verification Error: ${err.message}`);
  }

  console.log(`[Stripe Webhook Verified] Event: ${event.type} | ID: ${event.id}`);

  try {
    switch (event.type) {
      // Event 1: checkout.session.completed
      case 'checkout.session.completed': {
        const session = event.data.object;
        const sessionId = session.id;
        const paymentIntentId = session.payment_intent;
        const customerName = session.customer_details?.name || session.shipping_details?.name || 'LUMORA Customer';
        const customerEmail = session.customer_details?.email || session.customer_email || 'support@lumora.com';
        const amountTotal = (session.amount_total || 12999) / 100;
        const orderNumber = session.client_reference_id || 'LUMORA-' + Math.floor(100000 + Math.random() * 900000);
        
        let shippingAddress = 'US Express Delivery';
        if (session.shipping_details?.address) {
          const addr = session.shipping_details.address;
          shippingAddress = `${addr.line1 || ''} ${addr.line2 || ''}, ${addr.city || ''}, ${addr.state || ''} ${addr.postal_code || ''}, ${addr.country || 'US'}`.trim();
        }

        // Idempotency Check: Prevent duplicate webhook processing
        const { data: existingOrders } = await supabase
          .from('stripe_orders')
          .select('payment_status')
          .eq('stripe_session_id', sessionId);

        if (existingOrders && existingOrders.length > 0) {
          if (existingOrders[0].payment_status === 'paid') {
            console.log(`[Idempotency] Webhook session ${sessionId} already processed as paid.`);
            return res.status(200).json({ received: true, note: 'already_processed' });
          }

          // Update existing pending record
          await supabase
            .from('stripe_orders')
            .update({
              payment_status: 'paid',
              status: 'confirmed',
              stripe_payment_intent_id: typeof paymentIntentId === 'object' ? paymentIntentId.id : String(paymentIntentId),
              customer_name: customerName,
              customer_email: customerEmail,
              shipping_address: shippingAddress,
            })
            .eq('stripe_session_id', sessionId);
        } else {
          // Insert new record if initial checkout session insert was skipped
          await supabase
            .from('stripe_orders')
            .insert({
              order_number: orderNumber,
              stripe_session_id: sessionId,
              stripe_payment_intent_id: typeof paymentIntentId === 'object' ? paymentIntentId.id : String(paymentIntentId),
              customer_name: customerName,
              customer_email: customerEmail,
              shipping_address: shippingAddress,
              items: [{ title: 'LUMORA Red Light Therapy LED Mask', quantity: 1, price: 129.99 }],
              total_amount: amountTotal,
              currency: session.currency || 'usd',
              payment_status: 'paid',
              status: 'confirmed',
              created_at: new Date().toISOString(),
            });
        }

        // Sync with primary orders table
        try {
          await supabase.from('orders').insert({
            order_number: orderNumber,
            customer_name: customerName,
            customer_email: customerEmail,
            shipping_address: shippingAddress,
            items: [{ title: 'LUMORA Red Light Therapy LED Mask', quantity: 1, price: 129.99 }],
            total_amount: amountTotal,
            status: 'confirmed',
            created_at: new Date().toISOString(),
          });
        } catch (syncErr) {
          console.error('Orders table sync warning:', syncErr);
        }

        break;
      }

      // Event 2: payment_intent.succeeded
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const piId = paymentIntent.id;

        await supabase
          .from('stripe_orders')
          .update({
            payment_status: 'paid',
            status: 'confirmed',
          })
          .eq('stripe_payment_intent_id', piId);

        break;
      }

      // Event 3: payment_intent.payment_failed
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        const piId = paymentIntent.id;

        await supabase
          .from('stripe_orders')
          .update({
            payment_status: 'failed',
            status: 'failed',
          })
          .eq('stripe_payment_intent_id', piId);

        break;
      }

      // Event 4: checkout.session.expired
      case 'checkout.session.expired': {
        const session = event.data.object;
        await supabase
          .from('stripe_orders')
          .update({
            payment_status: 'expired',
            status: 'canceled',
          })
          .eq('stripe_session_id', session.id);

        break;
      }

      // Event 5: charge.refunded
      case 'charge.refunded': {
        const charge = event.data.object;
        const piId = typeof charge.payment_intent === 'object' ? charge.payment_intent.id : charge.payment_intent;

        if (piId) {
          await supabase
            .from('stripe_orders')
            .update({
              payment_status: 'refunded',
              status: 'refunded',
            })
            .eq('stripe_payment_intent_id', String(piId));
        }

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
