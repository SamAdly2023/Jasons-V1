
import { createClient } from '@supabase/supabase-js';

// These should be in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase URL or Anon Key. Database features will not work.');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Helper types based on our schema
export type DbProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  base_image_url: string;
  category: 'tshirt' | 'hoodie';
  created_at: string;
};

export type DbOrder = {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  created_at: string;
};
