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
    // Only show presence, not actual values
    const relevantVars: Record<string, string> = {};
    
    const envKeys = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY'];
    
    for (const key of envKeys) {
      relevantVars[key] = process.env[key] ? 'Present' : 'Missing';
    }

    return NextResponse.json({ 
      success: true,
      message: 'Environment variables debug (development only)',
      relevantVars
    });

  } catch (error) {
    return NextResponse.json({ 
      success: false,
      error: 'Failed to check environment variables',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

