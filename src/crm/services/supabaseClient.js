import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://whqsbtsceaznuxicilby.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndocXNidHNjZWF6bnV4aWNpbGJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0OTA4MzMsImV4cCI6MjEwNTA2NjgzM30.bKqJqWR74xgJu1REeCPjzf1cmv8x7tRKMJxugGIeUYs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Health check helper to verify connection to Supabase
 */
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('operators').select('id, name, username, role').limit(2);
    if (error) throw error;
    return { ok: true, data };
  } catch (err) {
    console.error('Supabase connection error:', err);
    return { ok: false, error: err.message };
  }
}
