import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiting (use Redis in production)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

export function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? '127.0.0.1';
  const limit = 100; // requests per window
  const window = 15 * 60 * 1000; // 15 minutes
  
  // Rate limiting
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetTime: Date.now() + window });
  } else {
    const data = rateLimit.get(ip)!;
    if (Date.now() > data.resetTime) {
      data.count = 1;
      data.resetTime = Date.now() + window;
    } else {
      data.count++;
      if (data.count > limit) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
    }
  }
  
  // Admin route protection
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login') &&
      !request.nextUrl.pathname.startsWith('/api/admin')) {
    
    const adminSession = request.cookies.get('admin-session');
    
    if (!adminSession || !adminSession.value) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // Generate CSRF token for GET requests to pages that need it
  if (request.method === 'GET' && request.nextUrl.pathname.startsWith('/order')) {
    const response = NextResponse.next();
    const token = generateCSRFToken();
    response.cookies.set('csrf-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 // 1 hour
    });
    return response;
  }
  
  return NextResponse.next();
}

function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export const config = {
  matcher: [
    '/api/:path*',
    '/order/:path*',
    '/admin/:path*'
  ]
};
