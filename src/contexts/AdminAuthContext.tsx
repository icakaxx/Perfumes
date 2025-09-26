"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCSRFHeaders } from '@/lib/csrf-client';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if admin is already logged in
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch('/api/admin/session', {
        method: 'GET',
        credentials: 'include', // Include cookies
      });
      
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Session check failed:', error);
      }
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getCSRFHeaders(),
        },
        credentials: 'include', // Include cookies
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        return true;
      } else {
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Login failed:', error);
      }
      setIsAuthenticated(false);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch('/api/admin/auth', {
        method: 'DELETE',
        headers: {
          ...getCSRFHeaders(),
        },
        credentials: 'include', // Include cookies
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Logout failed:', error);
      }
    } finally {
      setIsAuthenticated(false);
      router.push('/admin/login');
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

