'use strict';
'use client';

import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle password reset logic here (e.g., send reset email)
    console.log('Sending reset email to:', email);
  };

  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-10 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-white mb-4">Forgot Password</h2>
        <p className="text-gray-400 mb-4">Oops! Forgot your password? Let&apos;s get you back on track-enter your email below.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md"
          >
            Reset Password
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          <a href="#" className="text-blue-400 hover:underline">
            Back to login
          </a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;