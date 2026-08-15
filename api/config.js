import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('brand_config')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      
      const configMap = {};
      data.forEach(item => {
        configMap[item.config_key] = item.config_value;
      });
      return res.status(200).json({ list: data, map: configMap });
    }

    if (req.method === 'PUT') {
      const { config_key, config_value, is_placeholder } = req.body;
      if (!config_key) return res.status(400).json({ error: 'config_key required' });

      const { data, error } = await supabase
        .from('brand_config')
        .update({
          config_value,
          is_placeholder: is_placeholder !== undefined ? is_placeholder : false
        })
        .eq('config_key', config_key)
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error (config):', err);
    return res.status(500).json({ error: err.message });
  }
}
