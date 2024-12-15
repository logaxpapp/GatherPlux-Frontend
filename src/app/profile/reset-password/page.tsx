

"use client";
import Image from "next/image";
import React, { useState } from "react";
import {   FiEye, FiEyeOff } from "react-icons/fi";

const ProfilePage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-[#020e1e] flex justify-center  text-white ">
      <div className="w-full max-w-6xl bg-[#020e1e] rounded-lg shadow-md flex flex-col lg:flex-row ">

      

      

        <div className="flex flex-col w-full ">
      <h2 className="text-white text-3xl mb-6">Change Password</h2>

      <div className="space-y-6">
        {/* Password Input */}
        <div className="relative max-w-lg">
          <label className="block text-gray-400 text-sm mb-1">Password</label>
          <div
            className={`flex items-center bg-gray-800 text-gray-400 p-3 rounded-lg ${activeField === "password" ? "border border-white" : ""}`}
          >
            <Image
              src="/lock.png"
              alt="Lock Icon"
              width={20}
              height={20}
              className="mr-2"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="bg-transparent focus:outline-none w-full"
              onFocus={() => setActiveField("password")}
              onBlur={() => setActiveField(null)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-gray-400 hover:text-white"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-600 my-4" />

        {/* New Password Input */}
        <div className="relative max-w-lg">
          <label className="block text-gray-400 text-sm mb-1">New Password</label>
          <div
            className={`flex items-center bg-gray-800 text-gray-400 p-3 rounded-lg ${activeField === "newPassword" ? "border border-white" : ""}`}
          >
            <Image
              src="/lock.png"
              alt="Lock Icon"
              width={20}
              height={20}
              className="mr-2"
            />
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your new password"
              className="bg-transparent focus:outline-none w-full"
              onFocus={() => setActiveField("newPassword")}
              onBlur={() => setActiveField(null)}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="ml-2 text-gray-400 hover:text-white"
            >
              {showNewPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        {/* Confirm New Password Input */}
        <div className="relative max-w-lg">
          <label className="block text-gray-400 text-sm mb-1">Confirm New Password</label>
          <div
            className={`flex items-center bg-gray-800 text-gray-400 p-3 rounded-lg ${activeField === "confirmPassword" ? "border border-white" : ""}`}
          >
            <Image
              src="/lock.png"
              alt="Lock Icon"
              width={20}
              height={20}
              className="mr-2"
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your new password"
              className="bg-transparent focus:outline-none w-full"
              onFocus={() => setActiveField("confirmPassword")}
              onBlur={() => setActiveField(null)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="ml-2 text-gray-400 hover:text-white"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      <button className="mt-8 w-40 self-end bg-lime-500 text-black font-bold py-2 rounded-full shadow-md hover:bg-lime-400">
        Save changes
      </button>
    </div>
      </div>
    </div>
  );
};

export default ProfilePage;
