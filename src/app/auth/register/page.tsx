"use strict";
"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCreateUserMutation } from "@/services/slices/user.slice";
import Loader from "@/components/Loader";
import isAuth from "@/helpers/higherOrderComponent/isAuthenticated";
import { toast } from "react-toastify";

const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [signUpUser, { isLoading }] = useCreateUserMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = {
      name: formData.get("fullName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (!userData.email || !userData.password || !userData.name) {
      toast.error("Please fill all fields", {
        position: "top-right",
      });
      return;
    }

    try {
      const response = await signUpUser(userData).unwrap();
      if (
        response &&
        response.code === 200 &&
        response.message === "SUCCESSFUL"
      ) {
        router.push(`/auth/verify?email=${userData.email}`);
      }
    } catch (err) {
      toast.error("An error occurred when you up", {
        position: "top-right",
      });
      console.error("An error occurred when signing user up:", err);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-[#011926] to-[#002B41]"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 30%, rgba(0, 255, 102, 0.1), transparent 50%),
          radial-gradient(circle at 10% 70%, rgba(51, 170, 255, 0.1), transparent 90%)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="w-full sm:max-w-md p-6 sm:p-8 text-white rounded-3xl shadow-lg"
        style={{
          background: "linear-gradient(to bottom, #102730, #123739, #10212d)",
          borderTop: "5px solid #9EDD45",
          borderLeft: "1px solid #9EDD45",
          borderRight: "1px solid #9EDD45",
          borderBottom: "1px solid #9EDD45",
        }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-400 text-sm sm:text-base mb-6">
          Sign up to discover and book amazing events!
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#dbdae3]">
              Full Name
            </label>
            <div className="flex items-center px-3 bg-[#284449] rounded-md">
              <Image
                src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/zjkll3ygcuph3xf3cm2m"
                alt="Profile"
                width={24}
                height={24}
                className="w-6 sm:w-8 mr-2"
              />
              <input
                type="text"
                placeholder="Enter full name"
                name="fullName"
                className="w-full p-2 bg-transparent border-none focus:ring-0 focus:outline-none text-white text-sm sm:text-base"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#dbdae3]">
              Email
            </label>
            <div className="flex items-center px-3 bg-[#284449] rounded-md">
              <Image
                src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/zpab1aftksowvooyiiw0"
                alt="Mail"
                width={24}
                height={24}
                className="w-6 sm:w-8 mr-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                className="w-full p-2 bg-transparent border-none focus:ring-0 focus:outline-none text-white text-sm sm:text-base"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#dbdae3]">
              Password
            </label>
            <div className="flex items-center px-3 bg-[#284449] rounded-md">
              <Image
                src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/ewuk7ynzelrdok6m6t4i"
                alt="Lock"
                width={24}
                height={24}
                className="w-6 sm:w-8 mr-2"
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full p-2 bg-transparent border-none focus:ring-0 focus:outline-none text-white text-sm sm:text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 ml-2 text-sm sm:text-base"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 sm:py-3 bg-[#9EDD45] text-black font-medium rounded-md hover:bg-[#6EDD46] transition text-sm sm:text-base"
          >
            {isLoading && <Loader />}
            Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4 text-gray-400">
          <p className="text-sm sm:text-base">
            Already have an account?{" "}
            <a href="/auth/login" className="text-[#9EDD45] hover:underline">
              Log In
            </a>
          </p>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-600" />
            <span className="mx-2 text-sm sm:text-base">or</span>
            <hr className="flex-grow border-gray-600" />
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-full py-2 sm:py-3 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition text-sm sm:text-base"
          >
            <FcGoogle className="text-lg sm:text-xl mr-2" />
            Signup with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default isAuth(Signup);
