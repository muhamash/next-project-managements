"use client"

import { useRouter } from 'next/router';

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold text-red-600">Oops! Something went wrong</h1>
      <p className="text-gray-600 mt-2">An unexpected error has occurred.</p>
      
      <div className="mt-6 flex gap-4">
        <button 
          onClick={() => router.reload()} 
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          Reload Page
        </button>
        
        <button 
          onClick={() => router.push('/')} 
          className="px-6 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900">
          Back to Home
        </button>
      </div>
    </div>
  );
}
