import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jcynjbxjuuzotdwdnicn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjeW5qYnhqdXV6b3Rkd2RuaWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMTEyMDksImV4cCI6MjA1MDc4NzIwOX0.Zb2CQ5X6iHjiZk4haLiTCAMhXR6-ELpyUyKcpsAUHZs';

if (!supabaseKey) {
  console.error('Missing Supabase anon key');
}

export const supabase = createClient(supabaseUrl, supabaseKey);