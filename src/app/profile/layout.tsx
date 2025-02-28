"use client";

import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiLock,
  FiBook,
  FiBookmark,
  FiMail,
  FiMenu,
} from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { removeCookie } from "@/utils/cookie.utility";
import { useDispatch } from "react-redux";
import { logOut } from "@/store/slices/user.slice";
import isAuth from "@/helpers/higherOrderComponent/isAuthenticated";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsSidebarOpen(false); // Close sidebar after navigation
  };

  const handleLogout = () => {
    removeCookie("token");
    dispatch(logOut());
    router.replace("/auth/login");
    setIsSidebarOpen(false); // Close sidebar after logout
  };

  const handleClickOutside = (event: MouseEvent) => {
    const sidebar = document.getElementById("sidebar");
    if (sidebar && !sidebar.contains(event.target as Node)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="bg-[#020e1e]">
      <div className="flex bg-[#020e1e] min-h-screen mx-auto max-w-6xl pt-16 md:pt-32 relative">
        {/* Hamburger Menu */}
        <div className="absolute top-20 left-4 md:hidden">
          <button
            type="button"
            className="text-primary text-2xl"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FiMenu />
          </button>
        </div>

        {/* Sidebar */}
        <div
          id="sidebar"
          className={`fixed inset-y-0 left-0 z-20 bg-[#020e1e] mt-10 sm:mt-0 p-16 sm:p-6 border-r border-gray-700 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0`}
        >
          <div className="flex justify-between mb-8">
            <button
              type="button"
              className="pr-14 pl-6 py-2 bg-[#93d437] text-[#0b1326] font-bold rounded-md hover:bg-[#a4de4a] text-lg"
              onClick={() => handleNavigation("/dashboard")}
            >
              Dashboard
            </button>
            {/* Close Sidebar Button */}
            <button
              type="button"
              className="text-white text-xl md:hidden pl-3"
              onClick={() => setIsSidebarOpen(false)}
            >
              ✕
            </button>
          </div>

          <ul className="space-y-4">
            <li
              className={`cursor-pointer flex items-center space-x-2 text-white px-4 py-2 rounded-md ${
                pathname === "/profile" ? "bg-[#243447]" : "hover:bg-[#243447]"
              } transition duration-200 text-sm`}
              onClick={() => handleNavigation("/profile")}
            >
              <FiUser className="w-4 h-4" />
              <span>Account Info</span>
            </li>
            <li
              className="cursor-pointer flex items-center space-x-2 text-white px-4 py-2 rounded-md hover:bg-[#243447] transition duration-200 text-sm"
              onClick={() => handleNavigation("/profile/change-email")}
            >
              <FiMail className="w-4 h-4" />
              <span>Change Email</span>
            </li>
            <li
              className={`cursor-pointer flex items-center space-x-2 text-white px-4 py-2 rounded-md ${
                pathname === "/profile/password"
                  ? "bg-[#243447]"
                  : "hover:bg-[#243447]"
              } transition duration-200 text-sm`}
              onClick={() => handleNavigation("/profile/reset-password")}
            >
              <FiLock className="w-4 h-4" />
              <span>Password</span>
            </li>
            <li
              className={`cursor-pointer flex items-center space-x-2 text-white px-4 py-2 rounded-md ${
                pathname === "/profile/bookings"
                  ? "bg-[#243447]"
                  : "hover:bg-[#243447]"
              } transition duration-200 text-sm`}
              onClick={() => handleNavigation("/profile/bookings")}
            >
              <FiBook className="w-4 h-4" />
              <span>Bookings</span>
            </li>
            <li
              className={`cursor-pointer flex items-center space-x-2 text-white px-4 py-2 rounded-md ${
                pathname === "/profile/bookmark"
                  ? "bg-[#243447]"
                  : "hover:bg-[#243447]"
              } transition duration-200 text-sm`}
              onClick={() => handleNavigation("/profile/events")}
            >
              <FiBookmark className="w-4 h-4" />
              <span>My Events</span>
            </li>
            <li
              className={`cursor-pointer flex items-center space-x-2 text-white px-4 py-2 rounded-md ${
                pathname === "/profile/bookmark"
                  ? "bg-[#243447]"
                  : "hover:bg-[#243447]"
              } transition duration-200 text-sm`}
              onClick={() => handleNavigation("/profile/bookmark")}
            >
              <FiBookmark className="w-4 h-4" />
              <span>Bookmark</span>
            </li>
          </ul>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-8 w-full py-2 bg-[#f00] text-white rounded-md"
          >
            Logout
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  );
};

export default isAuth(SidebarLayout);
