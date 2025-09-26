import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'address', 'phone', 'municipality', 'city', 'items'];
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Insert order into Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          customer_first_name: orderData.firstName,
          customer_middle_name: orderData.middleName || null,
          customer_last_name: orderData.lastName,
          address: orderData.address,
          phone: orderData.phone,
          municipality: orderData.municipality,
          city: orderData.city,
          country: orderData.country || 'Bulgaria',
          items: orderData.items,
          total_price: orderData.totalPrice,
          status: orderData.status || 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save order to database' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: data.id,
      message: 'Order placed successfully'
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
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