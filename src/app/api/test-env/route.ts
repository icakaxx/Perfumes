import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    return NextResponse.json({ 
      success: true,
      envCheck: {
        supabaseUrl: supabaseUrl ? 'Present' : 'Missing',
        supabaseAnonKey: supabaseAnonKey ? 'Present' : 'Missing', 
        serviceRoleKey: serviceRoleKey ? 'Present' : 'Missing',
        supabaseUrlValue: supabaseUrl?.substring(0, 20) + '...' || 'Not set'
      }
    });

  } catch (error) {
    return NextResponse.json({ 
      success: false,
      error: 'Failed to check environment variables',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

