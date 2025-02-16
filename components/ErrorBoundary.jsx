"use client"

import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary Caught an Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-100 text-red-700">
          <h1 className="text-3xl font-bold">Something went wrong!</h1>
          <p className="mt-2">{ this.state.error?.message || "An unexpected error occurred." }</p>
          <div className='flex flex-col-reverse gap-5'>
            <button
              onClick={ () => window.location.reload() }
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Refresh Page
            </button>
            <button
              onClick={ () => window.location.href = '/' }
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md"
            >
              Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;