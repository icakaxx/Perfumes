import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const adminSession = request.cookies.get('admin-session');
    
    if (!adminSession || !adminSession.value) {
      return NextResponse.json({ 
        isAuthenticated: false 
      });
    }

    // In a production app, you'd validate the session token against a database
    // For now, we'll just check if the cookie exists and has a value
    const isValidSession = adminSession.value.length > 0;

    return NextResponse.json({ 
      isAuthenticated: isValidSession 
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Session check error:', error);
    }
    
    return NextResponse.json({ 
      isAuthenticated: false 
    });
  }
}
