import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour Supabase
export interface SupabaseExercise {
  id: string;
  type: string;
  title: string;
  description?: string;
  difficulty: number;
  source: string;
  language: string;
  tags: string[];
  content: any;
  author_id: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  completions: number;
  rating: number;
}
