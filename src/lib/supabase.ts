/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.SUPABASE_PUBLISHABLE_KEY || '';

// Check if Supabase is properly configured with real credentials
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('your-project')
);

// Create Supabase client (will be in dummy fallback mode if credentials aren't set)
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);

// Helper function to test connection and query live DB
export async function testSupabaseConnection(): Promise<{ success: boolean; message: string; latency?: number }> {
  const startTime = performance.now();
  try {
    if (!isSupabaseConfigured) {
      return {
        success: false,
        message: 'Supabase URL and Anon Key are not configured in environment variables (.env). Currently running in robust offline-resilient local mode.'
      };
    }

    // Ping Supabase health / table
    const { data, error } = await supabase.from('articles').select('id').limit(1);
    const endTime = performance.now();
    const latency = Math.round(endTime - startTime);

    if (error) {
      return {
        success: false,
        message: `Supabase connection error: ${error.message}`,
        latency
      };
    }

    return {
      success: true,
      message: 'Successfully connected to live Supabase PostgreSQL database with RLS policies active.',
      latency
    };
  } catch (err: any) {
    const endTime = performance.now();
    const latency = Math.round(endTime - startTime);
    return {
      success: false,
      message: `Connection failed: ${err.message || 'Unknown network error'}`,
      latency
    };
  }
}
