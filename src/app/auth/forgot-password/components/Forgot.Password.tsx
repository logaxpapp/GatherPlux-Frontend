'use strict';
'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';

import { useResetUserPasswordRequestMutation } from "@/services/slices/user.slice";
import Loader from "@/components/Loader";


const ForgotPassword: React.FC = () => {

  const router = useRouter();

  const [email, setEmail] = useState<string>('');

  const [resetPasswordRequest, { isLoading }] = useResetUserPasswordRequestMutation();

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleResetPasswordRequest = async () => {

    if (email === '') {
      // toast.error("Please input your email!", {
      //   position: 'top-right'
      // });
      return;
    }

    try {
      const { data } = await resetPasswordRequest({ email });

      if (data && data.message === 'SUCCESSFUL') {
        router.push(`/auth/reset-password?email=${email}`);
      }
    } catch (err) {
      console.error("An error occured: ", err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-[#011926] to-[#002B41]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 30%, rgba(0, 255, 102, 0.1), transparent 50%), radial-gradient(circle at 10% 70%, rgba(51, 170, 255, 0.1), transparent 90%)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="w-full max-w-md p-6 text-white rounded-3xl shadow-lg relative"
        style={{
          background: "linear-gradient(to bottom, #102730, #123739, #10212d)",
          borderTop: "5px solid #9EDD45",
          borderLeft: "1px solid #9EDD45",
          borderRight: "1px solid #9EDD45",
          borderBottom: "1px solid #9EDD45",
        }}
      >
        {/* Lock Icon */}
        <div className="flex justify-center mb-4">
          <Image
            width={48}
            height={48}
            src="/lock.png"
            alt="Lock Icon"
          />
        </div>
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center">Forgot password</h2>
        <p className="text-center text-gray-400 mt-2">
          Oops! Forgot your password? Let’s get you back on track—enter your email below.
        </p>

        {/* Email Input */}
        <div className="mt-6">
          <label htmlFor="email" className="block text-gray-300 mb-2">
            Email
          </label>
          <div className="relative">
            <Image
              height={20}
              width={20}
              src="/sms-tracking.png"
              alt="Email Icon"
              className="absolute top-3 left-3"
            />
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              className="w-full pl-10 pr-3 py-2 bg-[#0f172a] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              value={email}
              onChange={handleOnchange}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Reset Password Button */}
        <button type="button" className="w-full mt-6 bg-lime-500 text-black font-bold py-2 rounded-lg hover:bg-lime-600" onClick={handleResetPasswordRequest}>
          {isLoading && <Loader />}
          Reset Password
        </button>

        {/* Back to Login Link */}
        <div className="mt-4 text-center">
          <Link href="/login" className="text-[#9EDD45] hover:underline flex items-center justify-center">
            <span className="mr-1">←</span> Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
