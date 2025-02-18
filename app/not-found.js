import Link from "next/link";

export default async function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      {/* Animated 404 Text */}
      <h1 className="text-8xl font-bold text-red-500 animate-bounce">404</h1>
      <p className="text-2xl mt-4">Oops! Page not found.</p>

      {/* Buttons */}
      <div className="mt-6 space-x-4">
        <Link
          href="/"
          className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    
    </div>
  );
}