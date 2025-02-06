"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaGlobe,
  FaBuilding,
  FaUsers,
  FaUserShield,
  FaCreditCard,
  FaComments,
  FaKey,
  FaSignOutAlt,
  FaCog,
  FaTags,
  FaStar,
  FaBars,
  FaTimes,
  FaArrowLeft, // Icon for Back button
} from "react-icons/fa";
import { removeCookie } from "@/utils/cookie.utility";
import { useDispatch } from "react-redux";
import { logOut } from "@/store/slices/user.slice";
import Image from "next/image";
import isAuth from "@/helpers/higherOrderComponent/isAuthenticated";
// import isAuth from "@/helpers/higherOrderComponent/isAuthenticated";

// NavItem Component
function NavItem({
  icon,
  label,
  href,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive = href && pathname === href;

  return (
    <Link href={href || "#"} className="block">
      <div
        className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${
          isActive
            ? "bg-[#243447] text-[#93d437] font-bold"
            : href
              ? "text-white hover:bg-[#243447]"
              : "bg-[#93d437] text-[#020e1e] font-bold"
        } ${className}`}
      >
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  );
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const goBack = () => {
    router.back();
  };

  const handleLogout = () => {
    removeCookie("token");
    dispatch(logOut());
    router.replace("/");
    setIsSidebarOpen(false); // Close sidebar after logout
  };

  return (
    <div className="flex justify-center min-h-screen bg-[#020e1e]">
      {/* Mobile Header */}
      <header className="flex items-center justify-between bg-[#243447] text-white w-full fixed top-0 left-0 z-50 md:hidden">
        <button
          onClick={goBack}
          className="p-4 text-xl focus:outline-none"
          aria-label="Go Back"
        >
          <FaArrowLeft />
        </button>
        <h1 className="p-4 text-lg font-bold">Admin Panel</h1>
        <button
          onClick={toggleSidebar}
          className="p-4 text-2xl focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      <div className="flex w-full max-w-7xl h-full pt-24">
        {/* Sidebar */}
      {/* Sidebar */}
<aside
  className={`fixed inset-y-0 left-0 transform ${
    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  } md:translate-x-0 transition-transform duration-300 bg-[#020e1e] p-5 border-r border-[#243447] w-64 md:static`}
  style={{ height: "calc(100% - 100px)" }}
>
  <div className="flex items-center text-[#93d437] text-xl font-bold mb-8">
    Admin Panel
  </div>
  <nav className="space-y-3">
    <NavItem label="Dashboard" icon={undefined} />
    <NavItem icon={<FaBuilding />} label="Company" href="/admin/company" />
    <NavItem icon={<FaGlobe />} label="Country" href="/admin/country" />

    <NavItem
  icon={<Image src="/driver.png" alt="Manage Event" width={20} height={20} />}
  label="Manage Event"
  href="/admin/manage-event"
/>






    <NavItem icon={<FaUsers />} label="Users" href="/admin/users" />
    <NavItem icon={<FaUserShield />} label="Admins" href="/admin/admins" />
    <NavItem icon={<FaCreditCard />} label="Billing plans" href="/admin/billing" />
    <NavItem icon={<FaComments />} label="Messages" href="/admin/messages" />
    <NavItem icon={<FaKey />} label="Change password" href="/admin/resetpassword" />
    <NavItem icon={<FaTags />} label="Categories" href="/admin/categories" />
    <NavItem icon={<FaStar />} label="Ratings" href="/admin/ratings" />

    {/* Manage Event with driver.png */}
   
  </nav>

  <nav className="mt-16 space-y-4">
    <NavItem icon={<FaCog />} label="Settings" href="/admin/settings" />
    <button
      type="button"
      onClick={handleLogout}
      className="mt-8 w-full py-2 bg-[#f00] text-white rounded-md flex items-center justify-center"
    >
      <FaSignOutAlt className="mr-2" />
      Logout
    </button>
  </nav>
</aside>


        {/* Main Content */}
        <main className="flex-1 p-5">{children}</main>
      </div>
    </div>
  );
};

export default  isAuth(AdminLayout) ;
