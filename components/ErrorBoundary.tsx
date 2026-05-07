'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl font-bold mb-4 text-red-400">Oops, something went wrong</h1>
          <p className="text-gray-400 max-w-md mb-8">
            An unexpected error occurred in the application. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-white/10 hover:bg-white/20 border border-white/10 transition-colors px-6 py-3 rounded-xl inline-flex items-center gap-2"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
