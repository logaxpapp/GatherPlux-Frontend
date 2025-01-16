'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MobileNavbar from './MobileNavbar';
import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [hasScrolled, setHasScrolled] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`hidden lg:flex fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          hasScrolled
            ? 'bg-[#020e1e] border-b-[1px] border-[#9edd45]'
            : 'bg-transparent'
        }`}
      >
        <div className='flex items-center justify-between px-8 py-8 w-full max-w-7xl mx-auto text-white shadow-lg'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link href='/'>
              <Image
                src='/logo.png'
                alt='Gatherplus Logo'
                width={150}
                height={150}
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className='flex space-x-8 text-sm'>
            <a href='#' className='hover:text-[#9edd45] text-white'>
              Category
            </a>
            <Link
              href='/upcoming-events'
              className='hover:text-[#9edd45] text-white'
            >
              Upcoming Events
            </Link>
            <a href='#' className='hover:text-[#9edd45] text-white'>
              Support
            </a>
          </div>

          {/* Actions */}
          <div className='flex items-center space-x-6'>
            {/* Country Selector */}
            <div className='relative'>
              <button
                type='button'
                className='flex items-center gap-1 text-white'
                onClick={toggleDropdown}
              >
                <Image
                  src={`https://flagcdn.com/w40/${selectedCountry.toLowerCase()}.png`}
                  alt={`${selectedCountry} Flag`}
                  width={24}
                  height={16}
                />
                <span className='text-sm capitalize'>{selectedCountry}</span>
                <FaChevronDown className='text-white' />
              </button>
              {isDropdownOpen && (
                <ul className='absolute top-full right-0 mt-2 w-40 bg-white text-black shadow-lg rounded z-50'>
                  {['US', 'GB', 'CA', 'AU'].map((country) => (
                    <li
                      key={country}
                      className='px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center'
                      onClick={() => handleCountrySelect(country)}
                    >
                      <Image
                        src={`https://flagcdn.com/w40/${country.toLowerCase()}.png`}
                        alt={`${country} Flag`}
                        width={24}
                        height={16}
                      />
                      <span className='ml-2 text-sm capitalize'>{country}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Create Event Button */}
            <a
              href='/create-event'
              className='bg-[#9edd45] text-black px-4 py-2 font-medium hover:bg-green-400 rounded-full'
            >
              + Create Event
            </a>

            {/* User Avatar */}
            <Link href='/profile'>
              <Image
                src='/avatar.png'
                alt='User Avatar'
                width={40}
                height={40}
                className='rounded-full'
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className='lg:hidden'>
        <MobileNavbar />
      </div>
    </>
  );
};

export default Navbar;
