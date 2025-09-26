import { NextRequest } from 'next/server';
import { randomBytes } from 'crypto';

export function generateCSRFToken(): string {
  return randomBytes(32).toString('hex');
}

export function validateCSRFToken(request: NextRequest): boolean {
  const csrfToken = request.headers.get('x-csrf-token');
  const cookieToken = request.cookies.get('csrf-token')?.value;
  
  if (!csrfToken || !cookieToken) {
    return false;
  }
  
  return csrfToken === cookieToken;
}

export function setCSRFTokenCookie(response: Response): Response {
  const token = generateCSRFToken();
  response.headers.set('Set-Cookie', `csrf-token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/`);
  return response;
}
