import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-white">404</h1>
        <p className="text-2xl font-medium text-white mt-4">Oops! Page not found</p>
        <p className="text-lg text-white mt-2">
          We couldn't find the page you were looking for. It might have been moved or deleted.
        </p>
        <div className="mt-6">
          <Link
            to="/" // Use React Router's `Link` with the `to` prop for smooth navigation
            className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-purple-100 transition duration-300"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
