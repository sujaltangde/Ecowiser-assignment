import React from 'react'
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="bg-white min-h-screen md:pb-0 pb-24 flex flex-col items-center justify-center text-center">
      <h1 className="md:text-8xl text-6xl font-bold text-orange-500">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mt-4">Page Not Found</h2>
      <p className="text-md text-gray-600 md:px-0 px-12 mt-2">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="bg-orange-500 text-sm font-semibold hover:bg-orange-600 text-white py-2 
      px-8 rounded-md mt-6">
        Go Back to Home
      </Link>
    </div>
  )
}
