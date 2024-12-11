'use client';

import { useState } from 'react';
import Head from 'next/head';

export default function ChangeEmailAndPassword() {
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [passwordForEmailChange, setPasswordForEmailChange] = useState('');
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const handleEmailChange = () => {
    if (!newEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert('Please enter a valid email address.');
      return;
    }
    setIsEmailLoading(true);
    setTimeout(() => {
      alert('Email updated successfully!');
      setIsEmailLoading(false);
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Change Email and Password</title>
      </Head>
      <div
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#011926] to-[#002B41]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 30%, rgba(0, 255, 102, 0.1), transparent 50%), radial-gradient(circle at 10% 70%, rgba(51, 170, 255, 0.1), transparent 90%)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          className="w-full max-w-md p-6 text-white rounded-3xl shadow-lg mx-auto"
          style={{
            background: 'linear-gradient(to bottom, #102730, #123739, #10212d)',
            borderTop: '5px solid #9EDD45',
            borderLeft: '1px solid #9EDD45',
            borderRight: '1px solid #9EDD45',
            borderBottom: '1px solid #9EDD45',
          }}
        >
          <h1 className="text-3xl font-bold text-center mb-4">Change Email & Password</h1>

          {/* Change Email Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Change Email</h2>
            <input
              type="email"
              placeholder="Current email"
              className="w-full p-3 text-black rounded-md mb-4"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
            />
            <input
              type="email"
              placeholder="New email"
              className="w-full p-3 text-black rounded-md mb-4"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password for confirmation"
              className="w-full p-3 text-black rounded-md mb-4"
              value={passwordForEmailChange}
              onChange={(e) => setPasswordForEmailChange(e.target.value)}
            />
            <button
              className="w-full py-2 bg-[#9EDD45] text-black rounded-md font-bold hover:bg-green-600"
              onClick={handleEmailChange}
              disabled={isEmailLoading}
            >
              {isEmailLoading ? 'Updating...' : 'Update Email'}
            </button>
          </div>
 
        </div>
      </div>
    </>
  );
}
