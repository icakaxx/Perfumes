import { NextResponse } from 'next/server';
import { municipalities } from '@/data/locations';

export async function GET() {
  try {
    // Sort municipalities by name
    const sortedMunicipalities = municipalities.sort((a, b) => 
      a.name.localeCompare(b.name, 'bg')
    );

    return NextResponse.json(sortedMunicipalities);

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('API error:', error);
    }
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
}
