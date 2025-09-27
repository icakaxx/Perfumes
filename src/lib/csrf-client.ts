// CSRF token utility for client-side usage
export function getCSRFToken(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrf-token='))
    ?.split('=')[1];
    
  return token || '';
}

export function getCSRFHeaders(): Record<string, string> {
  const token = getCSRFToken();
  return token ? { 'X-CSRF-Token': token } : {};
}
