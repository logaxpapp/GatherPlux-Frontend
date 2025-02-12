"use strict";
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetUserPasswordRequestMutation } from "@/services/slices/user.slice";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailParams = searchParams.get("email");

  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (emailParams) {
      setEmail(emailParams);
    }
  }, [emailParams]);

  const [resetPasswordRequest, { isLoading }] =
    useResetUserPasswordRequestMutation();

  const handleEmailchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleCodechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handlePasswordchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleResetPasswordRequest = async () => {
    if (email === "") {
      toast.error("Please input your email!", {
        position: "top-right",
      });
      return;
    }

    try {
      const { data } = await resetPasswordRequest({ email });

      if (data && data.message === "SUCCESSFUL") {
        toast.success("Password reset successful", {
          position: "top-right",
        });
        router.push("/auth/login");
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
        {/* Key Icon */}
        <div className="flex justify-center mb-4">
          <Image height={48} width={48} src="/lock.png" alt="Key Icon" />
        </div>
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center">Reset Password</h2>
        <p className="text-center text-gray-400 mt-2">
          Set a new password to secure your account. <br />
          Make it strong and unique.
        </p>

        {/* Email Input */}
        <div className="mt-6">
          <label htmlFor="password" className="block text-gray-300 mb-2">
            Email
          </label>
          <div className="relative">
            <Image
              height={20}
              width={20}
              src="/sms-tracking.png"
              alt="Password Icon"
              className="absolute top-3 left-3"
            />
            <input
              type="email"
              id="email"
              placeholder={""}
              className="w-full pl-10 pr-10 py-2 bg-[#0f172a] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              value={email}
              onChange={handleEmailchange}
            />
          </div>
        </div>

        {/* Code Input */}
        <div className="mt-4">
          <label htmlFor="password" className="block text-gray-300 mb-2">
            Code
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
              type="number"
              id="code"
              placeholder={"Enter the code sent to your email"}
              className="w-full pl-10 pr-10 py-2 bg-[#0f172a] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={code}
              onChange={handleCodechange}
            />
          </div>
        </div>

        {/* Confirm Password Input */}
        <div className="mt-4">
          <label
            htmlFor="confirm-password"
            className="block text-gray-300 mb-2"
          >
            New Password
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
              type={showPassword ? "text" : "password"}
              id="confirm-password"
              placeholder="Enter your new password"
              className="w-full pl-10 pr-10 py-2 bg-[#0f172a] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              value={newPassword}
              onChange={handlePasswordchange}
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

        {/* Reset Password Button */}
        <button
          type="button"
          className="w-full mt-6 bg-lime-500 text-black font-bold py-2 rounded-lg hover:bg-lime-600"
          onClick={handleResetPasswordRequest}
        >
          {isLoading && <Loader />}
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

export default ResetPassword;
