import { NextRequest, NextResponse } from 'next/server';
import { adminLoginSchema } from '@/lib/validation';
import { validateCSRFToken } from '@/lib/csrf';
import { randomBytes } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    // CSRF Protection
    if (!validateCSRFToken(request)) {
      return NextResponse.json(
        { error: 'CSRF token mismatch' },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Validate input
    const validatedData = adminLoginSchema.parse(body);
    const { username, password } = validatedData;

    // Check credentials against environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Admin credentials not configured in environment variables');
      }
      return NextResponse.json(
        { error: 'Admin authentication not configured' },
        { status: 500 }
      );
    }

    if (username === adminUsername && password === adminPassword) {
      // Generate secure session token
      const sessionToken = randomBytes(32).toString('hex');
      
      // Create response with httpOnly cookie
      const response = NextResponse.json({ 
        success: true, 
        message: 'Login successful' 
      });

      // Set httpOnly cookie with secure settings
      response.cookies.set('admin-session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600, // 1 hour
        path: '/'
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Admin login error:', error);
    }
    
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // CSRF Protection
    if (!validateCSRFToken(request)) {
      return NextResponse.json(
        { error: 'CSRF token mismatch' },
        { status: 403 }
      );
    }

    const response = NextResponse.json({ 
      success: true, 
      message: 'Logout successful' 
    });

    // Clear the admin session cookie
    response.cookies.set('admin-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Expire immediately
      path: '/'
    });

    return response;

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Admin logout error:', error);
    }
    
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
