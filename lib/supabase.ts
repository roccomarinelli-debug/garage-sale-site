import { createClient } from '@supabase/supabase-js';
import type { Listing } from '@/types/listing';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Database = {
  public: {
    Tables: {
      listings: {
        Row: Listing;
        Insert: Omit<Listing, 'id' | 'created_at'>;
        Update: Partial<Omit<Listing, 'id' | 'created_at'>>;
      };
    };
  };
};
