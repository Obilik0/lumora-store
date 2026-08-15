import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { customer_name, customer_email, shipping_address, items, total_amount } = req.body;
      if (!customer_name || !customer_email || !items) {
        return res.status(400).json({ error: 'Missing required order fields' });
      }

      const orderNumber = 'RLT-' + Math.floor(100000 + Math.random() * 900000);

      const { data, error } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          customer_name,
          customer_email,
          shipping_address,
          items,
          total_amount: Number(total_amount),
          status: 'confirmed',
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error (orders):', err);
    return res.status(500).json({ error: err.message });
  }
}
