"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development only
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
    
    // In production, you might want to send this to an error reporting service
    // like Sentry, LogRocket, etc.
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetError }: { error?: Error; resetError: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-xl text-gray-900">
            Нещо се обърка
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Извиняваме се за неудобството. Възникна неочаквана грешка.
          </p>
          
          {process.env.NODE_ENV === 'development' && error && (
            <details className="text-left bg-gray-50 p-3 rounded text-sm">
              <summary className="cursor-pointer font-medium text-gray-700">
                Детайли за грешката (само в development)
              </summary>
              <pre className="mt-2 text-xs text-red-600 whitespace-pre-wrap">
                {error.message}
                {error.stack && `\n\nStack trace:\n${error.stack}`}
              </pre>
            </details>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button 
              onClick={resetError}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Опитай отново
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/'}
            >
              Начална страница
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Hook for functional components to trigger error boundary
export function useErrorHandler() {
  return (error: Error) => {
    throw error;
  };
}
