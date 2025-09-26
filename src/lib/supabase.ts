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

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For admin operations (server-side)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
