import Loader from "@/components/Loader";
import Image from "next/image";
import React from "react";
import { FiUser, FiMail, FiLock, FiBook } from "react-icons/fi";

<FiUser className="text-[#a5b0c1] w-5 h-5" />;

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

const ProfilePage: React.FC<Props> = ({ image, email, firstname, lastname, phone, address, isLoading, handleUpdateProfile, triggerFilePicker, handleAllOnChange, fileInputRef, handleFileChange }) => {
  return (
    <div className="min-h-screen bg-[#020e1e] flex justify-center py-10 text-white">
      <div className="w-full max-w-6xl bg-[#020e1e] rounded-lg shadow-md flex flex-col lg:flex-row mt-14">

        <div className="w-full max-w-[1000px] bg-[#020e1e] flex justify-center mt-20">

          {/* Left Content Area (Sidebar) */}
          <div className="w-full lg:w-1/4 bg-[#020e1e] p-6">
            {/* Dashboard Button */}
            <div className="flex justify-start mb-8">
              <button type="button" className="px-11 py-3 bg-[#93d437] text-[#0b1326] font-bold rounded-md hover:bg-[#a4de4a] text-lg">
                Dashboard
              </button>
            </div>

            {/* Sidebar Links */}
            <ul className="space-y-4">
              <li className="flex items-center space-x-2 font-medium text-[#93d437] bg-[#243447] px-4 py-2 rounded-md text-sm w-44">
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
            </ul>
          </div>


          {/* Separator Line */}
          <div className="hidden lg:block w-[1px] bg-[#2c3e50]"></div>

          {/* Right Content Area */}
          <div className="w-full lg:w-3/4 p-6 lg:p-8 bg-[#020e1e]">
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-6">
              Account Information
            </h2>

            {/* Grey Line Below the Heading */}
            <hr className="border-[#2c3e50] mb-8" />

            {/* Centered Narrow Container */}
            <div className="max-w-4xl mx-auto">
              {/* Profile Photo Section */}
              <div className="flex items-center mb-8">
                {/* Avatar */}
                <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-[#243447] flex items-center justify-center">
                  <Image
                    height={100}
                    width={100}
                    src={image || '/Ellipse 1 (1).png'}
                    alt="User display picture"
                    className="object-cover rounded-full"
                  />
                  {/* Camera Icon Overlay */}
                  <div className="absolute bottom-0 right-0 bg-[#1b263b] p-1 rounded-full cursor-pointer">
                    <Image
                      height={20}
                      width={20}
                      src="/Camera icon.png"
                      alt="Camera Icon"
                      className="lg:w-6 lg:h-6"
                      onClick={triggerFilePicker}
                    />
                    <input
                      className="hidden"
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      title={''}
                    />
                  </div>
                </div>

                {/* Name and Email */}
                <div className="ml-4 lg:ml-6">
                  <h3 className="text-lg font-semibold text-white">{`${firstname} ${lastname}`}</h3>
                  <p className="text-sm lg:text-base text-[#a5b0c1]">{email}</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-8">
                <h3 className="text-sm lg:text-lg font-semibold mb-4 text-white">Profile Information</h3>
                {/* First Name */}
                <div className="flex flex-col">
                  <label className="font-bold text-sm text-[#a5b0c1] mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 bg-[#1b263b] text-sm text-white border border-[#2c3e50] rounded-lg"
                    placeholder="Enter first name"
                    value={firstname}
                    name="first"
                    onChange={handleAllOnChange}
                  />
                </div>

                {/* Last Name */}
                <div className="flex flex-col">
                  <label className="font-bold text-sm text-[#a5b0c1] mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 bg-[#1b263b] text-sm text-white border border-[#2c3e50] rounded-lg"
                    placeholder="Enter last name"
                    value={lastname}
                    name="last"
                    onChange={handleAllOnChange}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="font-bold text-sm text-[#a5b0c1] mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 bg-[#1b263b] text-sm text-white border border-[#2c3e50] rounded-lg cursor-not-allowed"
                    placeholder="Enter your email"
                    value={email}
                    readOnly
                  />
                </div>
              </div>

              {/* Contact Details */}
              <h3 className="text-sm lg:text-lg font-semibold mt-8 mb-4 text-white">
                Contact Details
              </h3>
              <p className="text-xs lg:text-sm text-[#a5b0c1] mb-4">
                These details are private and only used to contact you for ticketing or prizes.
              </p>

              <div className="space-y-8">
                {/* Phone Number */}
                <div className="flex flex-col">
                  <label className="font-bold text-sm text-[#a5b0c1] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 bg-[#1b263b] text-sm text-white border border-[#2c3e50] rounded-lg"
                    placeholder="+234"
                    value={phone}
                    name="phone"
                    onChange={handleAllOnChange}
                  />
                </div>

                {/* Address */}
                <div className="flex flex-col">
                  <label className="font-bold text-sm text-[#a5b0c1] mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full pt-2 pl-2 pb-16 bg-[#1b263b] text-sm text-white border border-[#2c3e50] rounded-lg"
                    placeholder="Enter address"
                    value={address}
                    name="address"
                    onChange={handleAllOnChange}
                  />
                </div>

                {/* Update Button */}
                <button type="button" className="w-full mt-6 bg-lime-500 text-black font-bold py-2 rounded-lg hover:bg-lime-600" onClick={handleUpdateProfile}>
                  {isLoading && <Loader />}
                  Update Profile
                </button>

              </div>
            </div>
          </div>




        </div>
      </div>
    </div>
  );
};

export default ProfilePage;