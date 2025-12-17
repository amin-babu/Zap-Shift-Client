import React from 'react';
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-65px)] text-center bg-base-200">
      <div className="bg-base-100 shadow-xl p-10 rounded-2xl max-w-md w-full">
        <FaLock className="text-error text-6xl mx-auto mb-5" />

        <h1 className="text-4xl font-bold text-error mb-2">
          403 Forbidden
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          Oops!<br/>You don’t have permission to access this page.
        </p>

        <Link to="/" className="btn btn-primary text-secondary">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;