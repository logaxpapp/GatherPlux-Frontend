

"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FiUser, FiLock, FiBook, FiBookmark, FiEye, FiEyeOff } from "react-icons/fi";

const ProfilePage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-[#020e1e] flex justify-center py-10 text-white pt-28">
      <div className="w-full max-w-6xl bg-[#020e1e] rounded-lg shadow-md flex flex-col lg:flex-row mt-14">

        {/* Left Content Area (Sidebar) */}
        <div className="w-full lg:w-1/4 bg-[#020e1e] p-6">
          <div className="flex justify-start mb-8">
            <button
              type="button"
              className="pr-14 pl-6 py-2 bg-[#93d437] text-[#0b1326] font-bold rounded-md hover:bg-[#a4de4a] text-lg"
            >
              Dashboard
            </button>
          </div>

          <ul className="space-y-4">
            <li className="flex items-center space-x-2 text-white px-4 py-2 rounded-md hover:bg-[#243447] transition duration-200 text-sm">
              <FiUser className="w-4 h-4" />
              <span>Account Info</span>
            </li>
            <li className="flex items-center space-x-2 font-medium text-[#93d437] bg-[#243447] px-4 py-2 rounded-md text-sm w-44">
              <span>Change Email</span>
            </li>


            <li className="flex items-center space-x-2 text-white px-4 py-2 rounded-md hover:bg-[#243447] transition duration-200 text-sm">
              <FiLock className="w-4 h-4" />
              <span>Password</span>
            </li>
            <li className="flex items-center space-x-2 text-white px-4 py-2 rounded-md hover:bg-[#243447] transition duration-200 text-sm">
              <FiBook className="w-4 h-4" />
              <span>Bookings</span>
            </li>
            <li className="flex items-center space-x-2 text-white px-4 py-2 rounded-md hover:bg-[#243447] transition duration-200 text-sm">
              <FiBookmark className="w-4 h-4" />
              <span>Bookmark</span>
            </li>
          </ul>
        </div>

        {/* Separator Line */}
        <div className="hidden lg:block w-[1px] bg-[#2c3e50]"></div>

{/* right section */}

       <div className="flex flex-col w-full p-8">
      <h2 className="text-white text-3xl mb-6">Change Email</h2>

      <div className="space-y-6">
        {/* Password Input */}
        <div className="relative max-w-lg">
          <label className="block text-gray-400 text-sm mb-1">Current Email</label>
          <div
            className={`flex items-center bg-gray-800 text-gray-400 p-3 rounded-lg ${activeField === "password" ? "border border-white" : ""}`}
          >
            <Image
              src="/sms-tracking.png"
              alt="mail Icon"
              width={20}
              height={20}
              className="mr-2"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your current email address"
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
          <label className="block text-gray-400 text-sm mb-1">New Email</label>
          <div
            className={`flex items-center bg-gray-800 text-gray-400 p-3 rounded-lg ${activeField === "newPassword" ? "border border-white" : ""}`}
          >
            <Image
              src="/sms-tracking.png"
              alt="mail Icon"
              width={20}
              height={20}
              className="mr-2"
            />
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your new email address"
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
          <label className="block text-gray-400 text-sm mb-1">Confirm New Email</label>
          <div
            className={`flex items-center bg-gray-800 text-gray-400 p-3 rounded-lg ${activeField === "confirmPassword" ? "border border-white" : ""}`}
          >
            <Image
              src="/sms-tracking.png"
              alt="mail Icon"
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