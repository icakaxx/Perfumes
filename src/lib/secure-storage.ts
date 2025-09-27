// Simple encryption utility for localStorage data
// Note: This is basic obfuscation, not military-grade encryption
// For production, consider using Web Crypto API or server-side encryption

export function encryptData(data: any): string {
  try {
    const jsonString = JSON.stringify(data);
    // Simple base64 encoding with additional obfuscation
    const encoded = btoa(jsonString);
    // Add some basic obfuscation
    return encoded.split('').reverse().join('');
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error encrypting data:', error);
    }
    return '';
  }
}

export function decryptData(encryptedData: string): any {
  try {
    if (!encryptedData) return null;
    // Reverse the obfuscation
    const decoded = encryptedData.split('').reverse().join('');
    const jsonString = atob(decoded);
    return JSON.parse(jsonString);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error decrypting data:', error);
    }
    return null;
  }
}

export function setSecureStorage(key: string, data: any): void {
  try {
    const encrypted = encryptData(data);
    localStorage.setItem(key, encrypted);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error setting secure storage:', error);
    }
  }
}

export function getSecureStorage(key: string): any {
  try {
    const encrypted = localStorage.getItem(key);
    return encrypted ? decryptData(encrypted) : null;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error getting secure storage:', error);
    }
    return null;
  }
}
