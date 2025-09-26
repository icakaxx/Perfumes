import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Debug logging
console.log('Supabase URL:', supabaseUrl ? 'Present' : 'Missing')
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing')

if (!supabaseUrl) {
  throw new Error('supabaseUrl is required. Please check your .env.local file.')
}

if (!supabaseAnonKey) {
  throw new Error('supabaseAnonKey is required. Please check your .env.local file.')
}

// Browser/client components - use this for client-side operations
export const supabaseBrowser = () =>
  createClient(supabaseUrl, supabaseAnonKey)

// Legacy export for backward compatibility
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For admin operations (server-side only)
export const supabaseAdmin = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!serviceRoleKey) {
    console.error('SUPABASE_SERVICE_ROLE_KEY is missing!');
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for admin operations. Please check your environment variables.');
  }
  
  return createClient(supabaseUrl, serviceRoleKey);
}
