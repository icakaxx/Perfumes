import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET - Fetch all gift sets
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin()
      .from('gift_sets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Supabase error:', error);
      }
      return NextResponse.json(
        { error: 'Failed to fetch gift sets' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('API error:', error);
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Add new gift set
export async function POST(request: NextRequest) {
  try {
    const giftSetData = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'brand', 'description', 'concentration', 'top_notes', 'heart_notes', 'base_notes', 'variants'];
    for (const field of requiredFields) {
      if (!giftSetData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Ensure at least one image is provided
    if (!giftSetData.image_url && (!giftSetData.image_urls || giftSetData.image_urls.length === 0)) {
      return NextResponse.json(
        { error: 'At least one image URL is required' },
        { status: 400 }
      );
    }

    // Insert gift set into Supabase
    const { data, error } = await supabaseAdmin()
      .from('gift_sets')
      .insert([
        {
          name: giftSetData.name,
          brand: giftSetData.brand,
          description: giftSetData.description,
          image_url: giftSetData.image_url || (giftSetData.image_urls && giftSetData.image_urls[0]) || '',
          image_urls: giftSetData.image_urls || (giftSetData.image_url ? [giftSetData.image_url] : []),
          concentration: giftSetData.concentration,
          top_notes: giftSetData.top_notes,
          heart_notes: giftSetData.heart_notes,
          base_notes: giftSetData.base_notes,
          variants: giftSetData.variants,
          rating: giftSetData.rating || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Supabase error:', error);
      }
      return NextResponse.json(
        { error: 'Failed to add gift set' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      giftSet: data,
      message: 'Gift set added successfully'
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('API error:', error);
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update gift set
export async function PUT(request: NextRequest) {
  try {
    const { id, ...giftSetData } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Gift set ID is required' },
        { status: 400 }
      );
    }

    // Update gift set in Supabase
    const { data, error } = await supabaseAdmin()
      .from('gift_sets')
      .update({
        ...giftSetData,
        image_url: giftSetData.image_url || (giftSetData.image_urls && giftSetData.image_urls[0]) || '',
        image_urls: giftSetData.image_urls || (giftSetData.image_url ? [giftSetData.image_url] : []),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Supabase error:', error);
      }
      return NextResponse.json(
        { error: 'Failed to update gift set' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      giftSet: data,
      message: 'Gift set updated successfully'
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('API error:', error);
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Remove gift set
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Gift set ID is required' },
        { status: 400 }
      );
    }

    // Delete gift set from Supabase
    const { error } = await supabaseAdmin()
      .from('gift_sets')
      .delete()
      .eq('id', id);

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Supabase error:', error);
      }
      return NextResponse.json(
        { error: 'Failed to delete gift set' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Gift set deleted successfully'
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('API error:', error);
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
