export interface Product {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  original_price?: number;
  description: string;
  features: string[];
  specs: Record<string, string>;
  images: string[];
  is_active: boolean;
}

export interface Review {
  id: number;
  author_name: string;
  rating: number;
  title: string;
  comment: string;
  verified_buyer: boolean;
  created_at: string;
  user_photo?: string;
  skin_concerns?: string;
}

export interface UGCPost {
  id: number;
  username: string;
  platform: 'instagram' | 'tiktok';
  media_url: string;
  caption: string;
  likes_count: number;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export interface BrandConfig {
  id: number;
  config_key: string;
  config_value: string;
  is_placeholder: boolean;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Order {
  id?: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  shipping_address: string;
  items: CartItem[];
  total_amount: number;
  status: string;
  created_at?: string;
}
