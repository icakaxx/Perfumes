import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Log all environment variables that start with NEXT_PUBLIC_ or SUPABASE
    const allEnvVars = process.env;
    const relevantVars: Record<string, string> = {};
    
    for (const [key, value] of Object.entries(allEnvVars)) {
      if (key.startsWith('NEXT_PUBLIC_') || key.startsWith('SUPABASE_')) {
        relevantVars[key] = value ? 'Present' : 'Missing';
      }
    }

    return NextResponse.json({ 
      success: true,
      message: 'Environment variables debug',
      relevantVars,
      allKeys: Object.keys(allEnvVars).filter(key => 
        key.startsWith('NEXT_PUBLIC_') || key.startsWith('SUPABASE_')
      )
    });

  } catch (error) {
    return NextResponse.json({ 
      success: false,
      error: 'Failed to check environment variables',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

