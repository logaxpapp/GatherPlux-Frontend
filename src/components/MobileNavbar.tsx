"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white py-3 px-5 flex justify-between items-center shadow-lg z-50">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/ylvcgvmytdjdxduamcvd"
          alt="Gatherplus Logo"
          width={30}
          height={30}
        />
      </div>

      {/* Hamburger Icon / Close Icon */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="focus:outline-none"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-5 w-64 bg-gray-800 shadow-lg p-6 space-y-8 rounded-3xl">
          <a href="#" className="block hover:text-gray-300">
            Category
          </a>
          <a href="#" className="block hover:text-gray-300">
            Upcoming Events
          </a>
          <a href="#" className="block hover:text-gray-300">
            Support
          </a>
          <a
            href="/create-event"
            className="inline-block bg-[#9edd45] text-black px-4 py-2 rounded-md font-medium text-center hover:bg-green-400"
          >
            + Create Event
          </a>
        </div>
      )}
    </nav>
  );
};

export default MobileNavbar;
