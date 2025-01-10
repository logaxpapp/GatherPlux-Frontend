"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  FaTags, // Icon for Categories
  FaStar, // Icon for Ratings
} from 'react-icons/fa';

// NavItem Component
function NavItem({
  icon,
  label,
  href,
  className = '',
}: {
  icon: React.ReactNode;
  label: string;
  href?: string; // Optional for items like Dashboard
  className?: string;
}) {
  const pathname = usePathname();
  const isActive = href && pathname === href;

  return (
    <Link href={href || '#'} className="block">
      <div
        className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${
          isActive
            ? 'bg-[#243447] text-[#93d437] font-bold'
            : href
            ? 'text-white hover:bg-[#243447]'
            : 'bg-[#93d437] text-[#020e1e] font-bold'
        } ${className}`}
      >
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center min-h-screen bg-[#020e1e]">
      <div className="flex w-full max-w-7xl h-full pt-24">
        {/* Sidebar */}
        <aside
          className="w-1/6 bg-[#020e1e] p-5 border-r border-[#243447]"
          style={{ height: 'calc(100% - 100px)' }}
        >
          <div className="flex items-center text-[#93d437] text-xl font-bold mb-8"></div>
          <nav className="space-y-3">
            <NavItem label="Dashboard" icon={undefined} />
            <NavItem icon={<FaBuilding />} label="Company" href="/admin/company" />
            <NavItem icon={<FaGlobe />} label="Country" href="/admin/country" />
            <NavItem icon={<FaUsers />} label="Users" href="/admin/users" />
            <NavItem icon={<FaUserShield />} label="Admins" href="/admin/admins" />
            <NavItem icon={<FaCreditCard />} label="Billing plans" href="/admin/billing" />
            <NavItem icon={<FaComments />} label="Messages" href="/admin/messages" />
            <NavItem icon={<FaKey />} label="Change password" href="/admin/resetpassword" />
            <NavItem icon={<FaTags />} label="Categories" href="/admin/categories" />
            <NavItem icon={<FaStar />} label="Ratings" href="/admin/ratings" />
          </nav>
          <nav className="mt-16 space-y-4">
            <NavItem icon={<FaCog />} label="Settings" href="/admin/settings" />
            <NavItem icon={<FaSignOutAlt />} label="Log out" href="/admin/logout" />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-5">{children}</main>
      </div>
    </div>
  );
}
