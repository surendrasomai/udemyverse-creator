import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://adcae84e-3507-472f-a42c-8c3a9dfe2165.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseKey) {
  console.error('Missing VITE_SUPABASE_ANON_KEY environment variable');
}

export const supabase = createClient(supabaseUrl, supabaseKey);