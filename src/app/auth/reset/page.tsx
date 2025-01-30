"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import isAuth from "@/helpers/higherOrderComponent/isAuthenticated";

const ResetPassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#011926] to-[#002B41]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 30%, rgba(0, 255, 102, 0.1), transparent 50%), radial-gradient(circle at 10% 70%, rgba(51, 170, 255, 0.1), transparent 90%)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="w-full max-w-sm md:max-w-md lg:max-w-lg p-6 sm:p-8 text-white rounded-3xl shadow-lg relative"
        style={{
          background: "linear-gradient(to bottom, #102730, #123739, #10212d)",
          borderTop: "5px solid #9EDD45",
          borderLeft: "1px solid #9EDD45",
          borderRight: "1px solid #9EDD45",
          borderBottom: "1px solid #9EDD45",
        }}
      >
        {/* Key Icon */}
        <div className="flex justify-center mb-4">
          <Image height={48} width={48} src="/lock.png" alt="Key Icon" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Reset Password
        </h2>
        <p className="text-center text-gray-400 mt-2">
          Set a new password to secure your account. <br />
          Make it strong and unique.
        </p>

        {/* Password Input */}
        <div className="mt-6">
          <label htmlFor="password" className="block text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <Image
              height={20}
              width={20}
              src="/lock.png"
              alt="Password Icon"
              className="absolute top-3 left-3"
            />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="w-full pl-10 pr-10 py-2 bg-[#0f172a] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-2 right-3 text-gray-400"
            >
              👁️
            </button>
          </div>
        </div>

        {/* Confirm Password Input */}
        <div className="mt-4">
          <label
            htmlFor="confirm-password"
            className="block text-gray-300 mb-2"
          >
            Confirm password
          </label>
          <div className="relative">
            <Image
              height={20}
              width={20}
              src="/lock.png"
              alt="Confirm Password Icon"
              className="absolute top-3 left-3"
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              placeholder="Enter your password again"
              className="w-full pl-10 pr-10 py-2 bg-[#0f172a] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-2 right-3 text-gray-400"
            >
              👁️
            </button>
          </div>
        </div>

        {/* Reset Password Button */}
        <button className="w-full mt-6 bg-lime-500 text-black font-bold py-2 rounded-lg hover:bg-lime-600">
          Reset Password
        </button>

        {/* Back to Login Link */}
        <div className="mt-4 text-center">
          <Link
            href="/login"
            className="text-[#9EDD45] hover:underline flex items-center justify-center"
          >
            <span className="mr-1">←</span> Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default isAuth(ResetPassword);
