import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-[70vh] flex items-center justify-center px-4">
    <div className="text-center">
      <div className="text-9xl font-heading font-bold text-maroon/20">404</div>
      <h1 className="text-4xl font-heading font-bold -mt-8 mb-2">Page Not Found</h1>
      <p className="text-gray-500 mb-6">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-primary inline-flex">Return Home</Link>
    </div>
  </div>
);

export default NotFound;
