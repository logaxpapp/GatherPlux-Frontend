"use client";

import React, { useState } from "react";
import Image from "next/image";
import MobileNavbar from "./MobileNavbar";
import Link from "next/link";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("US");

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
  };

  return (
    <>
      <nav className="hidden lg:flex fixed top-0 left-0 w-full justify-center z-50 mt-8">
        <div className="flex items-center justify-between px-8 py-4 bg-gray-800/70 backdrop-blur-md text-white w-[90%] max-w-6xl shadow-lg">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Gatherplus Logo"
              width={150}
              height={150}
            />
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-8 text-sm">
            <a href="#" className="hover:text-gray-300">
              Category
            </a>
            <a href="#" className="hover:text-gray-300">
              Upcoming Events
            </a>
            <a href="#" className="hover:text-gray-300">
              Support
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            {/* Country Selector */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 text-white"
                onClick={toggleDropdown}
              >
                <Image
                  src={`https://flagcdn.com/w40/${selectedCountry.toLowerCase()}.png`}
                  alt={`${selectedCountry} Flag`}
                  width={24}
                  height={16}
                />
                <span className="text-sm capitalize">{selectedCountry}</span>
              </button>
              {isDropdownOpen && (
                <ul className="absolute top-full right-0 mt-2 w-40 bg-white text-black shadow-lg rounded z-50">
                  {["US", "GB", "CA", "AU"].map((country) => (
                    <li
                      key={country}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => handleCountrySelect(country)}
                    >
                      <Image
                        src={`https://flagcdn.com/w40/${country.toLowerCase()}.png`}
                        alt={`${country} Flag`}
                        width={24}
                        height={16}
                      />
                      <span className="ml-2 text-sm capitalize">
                        {country}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Create Event Button */}
            <a
              href="/create-event"
              className="bg-[#9edd45] text-black px-4 py-2 font-medium hover:bg-green-400 rounded"
            >
              + Create Event
            </a>

            {/* User Avatar */}
            <Link href="/auth/login">
              <Image
                src="/avatar.png"
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="lg:hidden">
        <MobileNavbar />
      </div>
    </>
  );
};

export default Navbar;
