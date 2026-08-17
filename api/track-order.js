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
    const queryRef = req.query.reference || req.query.ref || req.query.order_number;
    if (!queryRef) {
      return res.status(400).json({ error: 'Order reference parameter is required' });
    }

    const cleanRef = String(queryRef).trim().toUpperCase();

    // Query Supabase public.orders safely
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .or(`order_number.ilike.${cleanRef},order_reference.ilike.${cleanRef}`);

    if (error) {
      console.error('Track order Supabase error:', error);
      return res.status(500).json({ error: 'Failed to query database' });
    }

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        found: false,
        message: "We couldn't find an order with that reference number. Please check the number and try again.",
      });
    }

    const order = orders[0];

    // Sanitize & Return ONLY safe non-sensitive public tracking fields
    // NEVER expose full address, phone number, credit card, or secret tokens
    const publicTrackingInfo = {
      found: true,
      orderReference: order.order_reference || order.order_number || cleanRef,
      status: order.status || 'confirmed',
      paymentStatus: order.payment_status || 'paid',
      fulfillmentStatus: order.fulfillment_status || 'unfulfilled',
      carrier: order.carrier || null,
      trackingNumber: order.tracking_number || null,
      trackingUrl: order.tracking_url || null,
      createdAt: order.created_at,
      updatedAt: order.updated_at || order.created_at,
      cityState: order.shipping_address ? order.shipping_address.split(',').slice(-2).join(',').trim() : 'United States',
    };

    return res.status(200).json(publicTrackingInfo);
  } catch (err) {
    console.error('Track Order API Error:', err);
    return res.status(500).json({ error: 'An unexpected error occurred while searching for the order' });
  }
}
