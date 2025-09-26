import { NextRequest, NextResponse } from 'next/server';
import { getMunicipalityById } from '@/data/locations';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const municipalityId = searchParams.get('municipality_id');

    if (!municipalityId) {
      return NextResponse.json(
        { error: 'Municipality ID is required' },
        { status: 400 }
      );
    }

    // For now, we'll return the municipality as the "city" since we don't have separate cities data
    // In a real implementation, you would have a separate cities table
    const municipality = getMunicipalityById(parseInt(municipalityId));
    
    if (!municipality) {
      return NextResponse.json(
        { error: 'Municipality not found' },
        { status: 404 }
      );
    }

    // Return the municipality as a "city" for the dropdown
    const cityData = {
      id: municipality.id,
      name: municipality.name,
      municipality_id: municipality.id
    };

    return NextResponse.json([cityData]);

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
}
