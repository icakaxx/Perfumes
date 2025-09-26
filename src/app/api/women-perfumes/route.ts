import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET - Fetch all women's perfumes
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin()
      .from('women_perfumes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch women\'s perfumes' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Add new women's perfume
export async function POST(request: NextRequest) {
  try {
    const perfumeData = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'brand', 'description', 'concentration', 'top_notes', 'heart_notes', 'base_notes', 'variants'];
    for (const field of requiredFields) {
      if (!perfumeData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Ensure at least one image is provided
    if (!perfumeData.image_url && (!perfumeData.image_urls || perfumeData.image_urls.length === 0)) {
      return NextResponse.json(
        { error: 'At least one image URL is required' },
        { status: 400 }
      );
    }

    // Insert perfume into Supabase
    const { data, error } = await supabaseAdmin()
      .from('women_perfumes')
      .insert([
        {
          name: perfumeData.name,
          brand: perfumeData.brand,
          description: perfumeData.description,
          image_url: perfumeData.image_url || (perfumeData.image_urls && perfumeData.image_urls[0]) || '',
          image_urls: perfumeData.image_urls || (perfumeData.image_url ? [perfumeData.image_url] : []),
          concentration: perfumeData.concentration,
          top_notes: perfumeData.top_notes,
          heart_notes: perfumeData.heart_notes,
          base_notes: perfumeData.base_notes,
          variants: perfumeData.variants,
          rating: perfumeData.rating || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to add women\'s perfume' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      perfume: data,
      message: 'Women\'s perfume added successfully'
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update women's perfume
export async function PUT(request: NextRequest) {
  try {
    const { id, ...perfumeData } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Perfume ID is required' },
        { status: 400 }
      );
    }

    // Update perfume in Supabase
    const { data, error } = await supabaseAdmin()
      .from('women_perfumes')
      .update({
        ...perfumeData,
        image_url: perfumeData.image_url || (perfumeData.image_urls && perfumeData.image_urls[0]) || '',
        image_urls: perfumeData.image_urls || (perfumeData.image_url ? [perfumeData.image_url] : []),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to update women\'s perfume' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      perfume: data,
      message: 'Women\'s perfume updated successfully'
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Remove women's perfume
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Perfume ID is required' },
        { status: 400 }
      );
    }

    // Delete perfume from Supabase
    const { error } = await supabaseAdmin()
      .from('women_perfumes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to delete women\'s perfume' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Women\'s perfume deleted successfully'
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
