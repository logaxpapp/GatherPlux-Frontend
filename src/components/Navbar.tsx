"use client";

import React, { useState } from "react";
import Image from "next/image";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("United States");

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
  };

  return (
    <>
      <nav className="hidden lg:flex fixed top-0 left-0 w-full justify-center z-50 mt-8">
        <div className="flex items-center justify-between px-6 py-4 bg-gray-800/70 backdrop-blur-md text-white rounded-full w-[90%] max-w-6xl shadow-lg">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Gatherplus Logo"
              width={150}
              height={150}
            />
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-8">
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
          <div className="flex items-center space-x-4 relative">
            <div className="relative flex items-center">
              <button
                type="button"
                className="flex items-center gap-2 text-white"
                onClick={toggleDropdown}
              >
                <Image
                  src={`https://flagcdn.com/w40/${selectedCountry
                    .slice(0, 2)
                    .toLowerCase()}.png`}
                  alt={`${selectedCountry} Flag`}
                  width={24}
                  height={16}
                />
                <span className="text-sm">{selectedCountry}</span>
              </button>
              {isDropdownOpen && (
                <ul className="absolute top-full right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg z-50">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCountrySelect("US")}
                  >
                    <Image
                      src="https://flagcdn.com/w40/us.png"
                      alt="United States Flag"
                      width={24}
                      height={16}
                    />
                    <span className="ml-2">United States</span>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCountrySelect("GB")}
                  >
                    <Image
                      src="https://flagcdn.com/w40/gb.png"
                      alt="United Kingdom Flag"
                      width={24}
                      height={16}
                    />
                    <span className="ml-2">United Kingdom</span>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCountrySelect("CA")}
                  >
                    <Image
                      src="https://flagcdn.com/w40/ca.png"
                      alt="Canada Flag"
                      width={24}
                      height={16}
                    />
                    <span className="ml-2">Canada</span>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCountrySelect("AU")}
                  >
                    <Image
                      src="https://flagcdn.com/w40/au.png"
                      alt="Australia Flag"
                      width={24}
                      height={16}
                    />
                    <span className="ml-2">Australia</span>
                  </li>
                </ul>
              )}
            </div>
            <a href="/create-event" className="bg-[#9edd45] text-black px-4 py-2 rounded-full font-medium hover:bg-green-400">
              + Create Event
            </a>
            <Image
              src="/avatar.png"
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>
      </nav>

      <div className="lg:hidden">
        <MobileNavbar />
      </div>
    </>
  );
};

export default Navbar;
