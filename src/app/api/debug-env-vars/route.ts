import { NextResponse } from 'next/server';

export async function GET() {
  // Only show in development for security
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 });
  }

  return NextResponse.json({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Present' : 'Missing',
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Present' : 'Missing',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Present' : 'Missing',
    nodeEnv: process.env.NODE_ENV
  });
}
