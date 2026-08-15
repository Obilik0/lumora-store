import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'POST') {
      const { email } = req.body;
      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Please enter a valid email address' });
      }

      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email, created_at: new Date().toISOString() })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') { // unique violation
          return res.status(200).json({ message: 'You are already subscribed!' });
        }
        throw error;
      }
      return res.status(201).json({ message: 'Subscribed successfully', data });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error (newsletter):', err);
    return res.status(500).json({ error: err.message });
  }
}
