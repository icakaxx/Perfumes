import { createClient } from '@supabase/supabase-js';

// Ensure this is only used server-side
if (typeof window !== 'undefined') {
  throw new Error('supabaseAdmin can only be used server-side. Use supabaseBrowser for client-side operations.');
}

export const supabaseAdmin = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!  // never import this in client components
  );
