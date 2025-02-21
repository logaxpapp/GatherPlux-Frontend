import { useState } from "react";
import { useDispatch } from "react-redux";
import { useCreateUserMutation } from "@/services/slices/user.slice";
import Loader from "@/components/Loader";
import { setToken } from "@/store/slices/user.slice";
import { setCookie } from "@/utils/cookie.utility";
import Image from "next/image";
import { toast } from "react-toastify";

interface SignUpModalProps {
  onClose: () => void;
}
export default function SignUpModal({ onClose }: SignUpModalProps) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [registerUser, { isLoading }] = useCreateUserMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = {
      name: formData.get("fullName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (!userData.email || !userData.password || !userData.name) {
      return;
    }

    try {
      const response = await registerUser(userData).unwrap();
      if (response?.code === 200 && response.message === "SUCCESSFUL") {
        setCookie("token", response.body.access_token);
        dispatch(setToken(response.body.access_token));
        onClose();
      }
    } catch (err) {
      toast.error(`An error occurred: ${err}`, {
        position: "top-right",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background */}
      <div
        className="absolute inset-0 bg-black bg-opacity-80"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-xs sm:max-w-md lg:max-w-lg p-4 sm:p-6 lg:p-8 text-white rounded-3xl shadow-lg"
        style={{
          background: "linear-gradient(to bottom, #102730, #123739, #10212d)",
          borderTop: "5px solid #9EDD45",
          borderLeft: "1px solid #9EDD45",
          borderRight: "1px solid #9EDD45",
          borderBottom: "1px solid #9EDD45",
        }}
      >
        <button
          className="absolute top-2 right-2 text-white font-bold text-sm sm:text-base"
          onClick={onClose}
        >
          ✕
        </button>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-3">
          Sign Up
        </h1>
        <p className="text-center text-gray-400 text-sm sm:text-base lg:text-lg mb-4">
          Create an account to book your next great experience
        </p>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#dbdae3]">
              Full Name
            </label>
            <div className="border-[1px] border-[#97a0a4] bg-[#284449] flex items-center px-2 sm:px-3 rounded-md">
              <Image
                src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/ewuk7ynzelrdok6m6t4i"
                alt="Lock Icon"
                width={16}
                height={16}
                className="mr-2"
              />
              <input
                type="text"
                placeholder="Enter full name"
                name="fullName"
                className="w-full p-1 sm:p-2 lg:p-3 bg-transparent border-none focus:ring-0 focus:outline-none text-white text-sm sm:text-base"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-[#dbdae3]">
              Email
            </label>
            <div className="border-[1px] border-[#97a0a4] bg-[#284449] flex items-center px-2 sm:px-3 rounded-md">
              <Image
                src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/xfydxp5zbbdbgtbxvpkh"
                alt="Mail Icon"
                width={16}
                height={16}
                className="mr-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                className="w-full p-1 sm:p-2 lg:p-3 bg-transparent border-none focus:ring-0 focus:outline-none text-white text-sm sm:text-base"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-[#dbdae3]">
              Password
            </label>
            <div className="border-[1px] border-[#97a0a4] bg-[#284449] flex items-center px-2 sm:px-3 rounded-md">
              <Image
                src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/ewuk7ynzelrdok6m6t4i"
                alt="Lock Icon"
                width={16}
                height={16}
                className="mr-2"
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full p-1 sm:p-2 lg:p-3 bg-transparent border-none focus:ring-0 focus:outline-none text-white text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 ml-2 text-xs sm:text-sm"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 sm:py-3 lg:py-4 bg-[#9EDD45] text-black font-bold rounded-md text-sm sm:text-base hover:bg-[#6EDD46] transition"
          >
            {isLoading && <Loader />}
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
