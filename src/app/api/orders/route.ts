import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { validateCSRFToken } from '@/lib/csrf';
import { orderSchema } from '@/lib/validation';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  // CSRF Protection
  if (!validateCSRFToken(request)) {
    return NextResponse.json(
      { error: 'CSRF token mismatch' },
      { status: 403 }
    );
  }

  try {
    const orderData = await request.json();

    // Validate input data
    let validatedData;
    try {
      validatedData = orderSchema.parse(orderData);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          { 
            error: 'Validation failed', 
            details: error.issues.map(err => ({
              field: err.path.join('.'),
              message: err.message
            }))
          },
          { status: 400 }
        );
      }
      throw error;
    }

    // Insert order into Supabase
    const { data, error } = await supabaseAdmin()
      .from('orders')
      .insert([
        {
          customer_first_name: validatedData.firstName,
          customer_middle_name: validatedData.middleName || null,
          customer_last_name: validatedData.lastName,
          address: validatedData.address,
          phone: validatedData.phone,
          municipality: validatedData.municipality,
          city: validatedData.city,
          country: validatedData.country || 'Bulgaria',
          items: validatedData.items,
          total_price: validatedData.totalPrice,
          status: validatedData.status || 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        if (process.env.NODE_ENV === 'development') {
        console.error('Supabase error:', error);
      }
      }
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
    if (process.env.NODE_ENV === 'development') {
      console.error('API error:', error);
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin()
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Supabase error:', error);
      }
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
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

// PUT - Update order
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const updateData = await request.json();

    // Update order in Supabase
    const { data, error } = await supabaseAdmin()
      .from('orders')
      .update({
        ...updateData,
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
        { error: 'Failed to update order' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order: data,
      message: 'Order updated successfully'
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

// DELETE - Delete order
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Delete order from Supabase
    const { error } = await supabaseAdmin()
      .from('orders')
      .delete()
      .eq('id', id);

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Supabase error:', error);
      }
      return NextResponse.json(
        { error: 'Failed to delete order' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Order deleted successfully'
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