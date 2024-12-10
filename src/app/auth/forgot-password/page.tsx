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
    <div
      className="flex items-center justify-center min-h-screen relative bg-gradient-to-br from-[#011926] to-[#002B41]"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 30%, rgba(0, 255, 102, 0.1), transparent 50%),
          radial-gradient(circle at 10% 70%, rgba(51, 170, 255, 0.1), transparent 90%)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="w-full max-w-md p-6 text-white rounded-3xl shadow-lg relative"
        style={{
          background: 'linear-gradient(to bottom, #102730, #123739, #10212d)',
          borderTop: '5px solid #9EDD45',
          borderLeft: '1px solid #9EDD45',
          borderRight: '1px solid #9EDD45',
          borderBottom: '1px solid #9EDD45',
        }}
      >
        <h2 className="text-3xl font-bold text-center mb-2">Forgot Password</h2>
        <p className="text-center text-gray-400 mb-6">
          Oops! Forgot your password? Let&apos;s get you back on track—enter your email below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-[#dbdae3]">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border-[1px] border-[#97a0a4] bg-[#284449] rounded-md text-white focus:ring-0 focus:outline-none"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#9EDD45] text-black font-bold rounded-md hover:bg-[#6EDD46] transition"
          >
            Reset Password
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          <a href="#" className="text-[#9EDD45] hover:underline">
            Back to login
          </a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
