'use client'; // Mark this as a client component

import React from 'react';
import { FiUser, FiLock, FiBook, FiBookmark, FiMail } from 'react-icons/fi';
import { usePathname, useRouter } from 'next/navigation'; // Add useRouter for navigation
import { removeCookie } from '@/utils/cookie.utility';
import { useDispatch } from 'react-redux';
import { logOut } from '@/store/slices/user.slice';
import isAuth from '@/helpers/higherOrderComponent/isAuthenticated';

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname(); // Get current route to apply active class
  const router = useRouter(); // For programmatic navigation
  const dispatch = useDispatch();

  const handleNavigation = (path: string) => {
    router.push(path); // Navigate to the specified path
  };

  const handleLogout = () => {
    removeCookie('token');
    dispatch(logOut());
    router.push('/auth/login');
  };

  return (
    <div className='bg-[#020e1e]'>
      <div className='flex bg-[#020e1e] min-h-screen mx-auto max-w-6xl pt-32'>
        {/* Sidebar */}
        <div className='bg-[#020e1e] p-6 border-r border-gray-700 relative'>
          <div className='flex justify-start mb-8'>
            <button
              type='button'
              className='pr-14 pl-6 py-2 bg-[#93d437] text-[#0b1326] font-bold rounded-md hover:bg-[#a4de4a] text-lg'
              onClick={() => handleNavigation('/dashboard')}
            >
              Dashboard
            </button>
          </div>

          <ul className='space-y-4'>
            {/* Sidebar Items */}
            <li
              className={`cursor-pointer flex items-center space-x-2 text-white px-4 py-2 rounded-md ${
                pathname === '/profile' ? 'bg-[#243447]' : 'hover:bg-[#243447]'
              } transition duration-200 text-sm`}
              onClick={() => handleNavigation('/profile')}
            >
              <FiUser className='w-4 h-4' />
              <span>Account Info</span>
            </li>
            <li
              className='cursor-pointer flex items-center space-x-2 text-white px-4 py-2 rounded-md hover:bg-[#243447] transition duration-200 text-sm'
              onClick={() => handleNavigation('/profile/change-email')}
            >
              <FiMail className='w-4 h-4' />
              <span>Change Email</span>
            </li>
            <li
              className={`cursor-pointer flex items-center space-x-2 text-white px-4 py-2 rounded-md ${
                pathname === '/profile/password'
                  ? 'bg-[#243447]'
                  : 'hover:bg-[#243447]'
              } transition duration-200 text-sm`}
              onClick={() => handleNavigation('/profile/reset-password')}
            >
              <FiLock className='w-4 h-4' />
              <span>Password</span>
            </li>
            <li
              className={`cursor-pointer flex items-center space-x-2 text-white px-4 py-2 rounded-md ${
                pathname === '/profile/bookings'
                  ? 'bg-[#243447]'
                  : 'hover:bg-[#243447]'
              } transition duration-200 text-sm`}
              onClick={() => handleNavigation('/profile/bookings')}
            >
              <FiBook className='w-4 h-4' />
              <span>Bookings</span>
            </li>
            <li
              className={`cursor-pointer flex items-center space-x-2 text-white px-4 py-2 rounded-md ${
                pathname === '/profile/bookmark'
                  ? 'bg-[#243447]'
                  : 'hover:bg-[#243447]'
              } transition duration-200 text-sm`}
              onClick={() => handleNavigation('/profile/bookmark')}
            >
              <FiBookmark className='w-4 h-4' />
              <span>Bookmark</span>
            </li>
          </ul>
          <button
            type='button'
            onClick={handleLogout}
            className='mt-8 w-full py-2 bg-[#f00] text-white rounded-md'
          >
            Logout
          </button>
        </div>

        {/* Main Content Area */}
        <div className='flex-1 p-6'>{children}</div>
      </div>
    </div>
  );
};

export default isAuth(SidebarLayout);
