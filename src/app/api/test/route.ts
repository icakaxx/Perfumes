import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Test Supabase connection
    const { data, error } = await supabase
      .from('regions')
      .select('count')
      .limit(1);

    if (error) {
      return NextResponse.json({ 
        message: 'API is working but Supabase error',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({ 
      message: 'API and Supabase are working',
      supabaseConnected: true,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'API test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
