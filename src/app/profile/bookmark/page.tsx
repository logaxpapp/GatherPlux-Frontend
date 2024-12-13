// import Loader from "@/components/Loader";
import Image from "next/image";
import React from "react";
import { FiUser, FiMail, FiLock, FiBook, FiBookmark } from "react-icons/fi";

interface Props {
  image: string | null;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
  isLoading: boolean;
  handleUpdateProfile: () => void;
  handleAllOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  triggerFilePicker: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfilePage: React.FC<Props> = ({
  // image,
  // email,
  // firstname,
  // lastname,
  // phone,
  // address,
  // isLoading,
  // handleUpdateProfile,
  // triggerFilePicker,
  // handleAllOnChange,
  // fileInputRef,
  // handleFileChange,
}) => {
  return (
    <div className="min-h-screen bg-[#020e1e] flex justify-center py-10 text-white pt-28">
      <div className="w-full max-w-6xl bg-[#020e1e] rounded-lg shadow-md flex flex-col lg:flex-row ">

        {/* Left Content Area (Sidebar) */}
        <div className="w-full lg:w-1/4 bg-[#020e1e] p-6">
          <div className="flex justify-start mb-8">
            <button
              type="button"
              className="px-11 py-3 bg-[#93d437] text-[#0b1326] font-bold rounded-md hover:bg-[#a4de4a] text-lg"
            >
              Dashboard
            </button>
          </div>

          <ul className="space-y-4">
          <li className="flex items-center space-x-2 text-white px-4 py-2 rounded-md hover:bg-[#243447] transition duration-200 text-sm">
              <FiUser className="w-4 h-4" />
              <span>Account Info</span>
            </li>
            <li className="flex items-center space-x-2 text-white px-4 py-2 rounded-md hover:bg-[#243447] transition duration-200 text-sm">
              <FiMail className="w-4 h-4" />
              <span>Change Email</span>
            </li>
            <li className="flex items-center space-x-2 text-white px-4 py-2 rounded-md hover:bg-[#243447] transition duration-200 text-sm">
              <FiLock className="w-4 h-4" />
              <span>Password</span>
            </li>
            <li className="flex items-center space-x-2 text-white px-4 py-2 rounded-md hover:bg-[#243447] transition duration-200 text-sm">
              <FiBook className="w-4 h-4" />
              <span>Bookings</span>
            </li>

            <li className="flex items-center space-x-2 font-medium text-[#93d437] bg-[#243447] px-4 py-2 rounded-md text-sm w-44">
              <FiBookmark className="w-4 h-4" />
              <span>Bookmark</span>
            </li>
          </ul>
        </div>

        {/* Separator Line */}
        <div className="hidden lg:block w-[1px] bg-[#2c3e50]"></div>

  {/* Right Content Area */}
<div className="w-full lg:w-3/4 p-6 lg:p-8 flex flex-col">
  <div className="text-center mb-8">
    <h2 className="text-2xl font-bold text-white">My Bookmarks</h2>
  </div>

  <div className="flex justify-between border-b border-[#2c3e50] mb-4 pb-2">
    <button className="text-[#93d437] font-bold">Bookmarked</button>
  </div>

  {/* Event Cards */}
  <div className="space-y-4 flex-grow">
    {[...Array(4)].map((_, index) => (
      <div key={index}>
        {/* Card Content */}
        <div className="flex items-center justify-between pb-4">
          {/* Event Details with Blue Background */}
          <div className="flex items-center space-x-4 bg-[#243447] p-4 max-w-[70%] rounded-md">
            <Image
              src="/event-thumbnail.png"
              alt="Event Thumbnail"
              width={80}
              height={80}
              className="rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-white font-bold text-sm">
                Event title that can go up to two lines
              </h3>
              <p className="text-[#a5b0c1] text-xs">
                Venue - NOV 22<br />
                08:00 AM - 06:00 PM
              </p>
              <p className="text-[#93d437] text-xs mt-1">
                ₹499 • <span className="text-orange-500">★</span> <span className="text-white">10 Interested</span>
              </p>
            </div>
          </div>

          {/* Separate Button */}
          <button
            className="ml-4 bg-[#93d437] text-black font-bold px-6 py-2 rounded-full hover:bg-[#a4de4a]"
          >
            Remove from Bookmarks
          </button>
        </div>

        {/* Thin Separator Line */}
        {index < 3 && <div className="border-b border-[#2c3e50]"></div>}
      </div>
    ))}
  </div>

  {/* Bottom Buttons */}
  <div className="mt-auto flex justify-between space-x-4">
    <button className="bg-[#93d437] text-black font-bold px-6 py-3 rounded-md hover:bg-[#a4de4a]">
      Manage All Bookmarks
    </button>
    <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-md hover:bg-red-600">
      Clear All Bookmarks
    </button>
  </div>
</div>


      </div>
    </div>
  );
};

export default ProfilePage;
