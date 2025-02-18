'use client'

import Link from "next/link";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen bg-rose-200 text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-700 mb-6 font-mono">{error?.message || "An unexpected error occurred."}</p>
        
        <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>

          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Reload Page
          </button>

          <Link
            href="/"
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Go Home
          </Link>
        </div>
      </body>
    </html>
  );
}
