import React from "react";
import Link from "next/link";

const ForgotPassword: React.FC = () => {
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
          <img
            src="/lock.png" // Replace with the path to your lock icon
            alt="Lock Icon"
            className="w-12 h-12"
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
            <img
              src="/sms-tracking.png" // Replace with the path to your SMS-tracking icon
              alt="Email Icon"
              className="absolute top-3 left-3 w-5 h-5"
            />
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              className="w-full pl-10 pr-3 py-2 bg-[#0f172a] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>
        </div>

        {/* Reset Password Button */}
        <button className="w-full mt-6 bg-lime-500 text-black font-bold py-2 rounded-lg hover:bg-lime-600">
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
