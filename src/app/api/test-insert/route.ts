import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Get environment variables directly
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log('Environment check:', {
      supabaseUrl: supabaseUrl ? 'Present' : 'Missing',
      supabaseAnonKey: supabaseAnonKey ? 'Present' : 'Missing'
    });

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ 
        success: false,
        error: 'Missing Supabase environment variables',
        env: {
          supabaseUrl: supabaseUrl ? 'Present' : 'Missing',
          supabaseAnonKey: supabaseAnonKey ? 'Present' : 'Missing'
        }
      }, { status: 500 });
    }

    // Create Supabase client directly in the API route
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Test data - simple product
    const testProduct = {
      id: 'test-1',
      name: 'Test Perfume',
      brand: 'Test Brand',
      description: 'This is a test product to verify database connection',
      image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
      concentration: 'EDT',
      gender_profile: 'Unisex',
      top_notes: ['Test Note 1', 'Test Note 2'],
      heart_notes: ['Test Heart 1'],
      base_notes: ['Test Base 1'],
      variants: [
        {
          id: 'test-1-50',
          volumeMl: 50,
          price: 99.99,
          inStock: true
        }
      ],
      rating: 4.5
    };

    console.log('Attempting to insert test product:', testProduct);

    // Try to insert the test product
    const { data, error } = await supabase
      .from('products')
      .insert([testProduct])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ 
        success: false,
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      }, { status: 500 });
    }

    console.log('Successfully inserted test product:', data);

    return NextResponse.json({ 
      success: true,
      message: 'Test product inserted successfully',
      data: data
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Get environment variables directly
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ 
        success: false,
        error: 'Missing Supabase environment variables'
      }, { status: 500 });
    }

    // Create Supabase client directly in the API route
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Try to fetch products to test connection
    const { data, error } = await supabase
      .from('products')
      .select('id, name, brand, gender_profile')
      .limit(5);

    if (error) {
      console.error('Supabase fetch error:', error);
      return NextResponse.json({ 
        success: false,
        error: error.message,
        code: error.code,
        details: error.details
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Successfully connected to products table',
      count: data ? data.length : 0,
      products: data
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
