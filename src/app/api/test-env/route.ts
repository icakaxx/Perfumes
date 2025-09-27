import { NextResponse } from 'next/server';

export async function GET() {
  // Only allow in development mode
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ 
      success: false,
      error: 'This endpoint is only available in development mode'
    }, { status: 403 });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    return NextResponse.json({ 
      success: true,
      envCheck: {
        supabaseUrl: supabaseUrl ? 'Present' : 'Missing',
        supabaseAnonKey: supabaseAnonKey ? 'Present' : 'Missing', 
        serviceRoleKey: serviceRoleKey ? 'Present' : 'Missing'
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

