"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FiUser, FiLock, FiBook, FiBookmark } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";

import { useUpdateUserProfileMutation } from "@/services/slices/user.slice";
import Loader from "@/components/Loader";
import { RootState } from "@/store/store";
import { setUserDetails } from "@/store/slices/user.slice";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();

  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [activeField, setActiveField] = useState<string | null>(null);

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
  const user = useSelector((state: RootState) => state.user.userDetails);

  const handleAllInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "currentEmail") {
      setCurrentEmail(value);
    }

    if (name === "newEmail") {
      setNewEmail(value);
    }

    if (name === "confirmEmail") {
      setConfirmEmail(value);
    }
  };

  const handleUpdateEmail = async () => {
    if (!currentEmail || !newEmail || !confirmEmail) {
      // notification.error({
      //   message: "Error",
      //   description: "Please fill all fields",
      // });
      console.log("Please fill all fields");
      return;
    }

    if (newEmail !== confirmEmail) {
      // notification.error({
      //   message: "Error",
      //   description: "Emails do not match",
      // });
      console.log("New Emails do not match");
      return;
    }

    const { data, error } = await updateUserProfile({
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      address: user.address,
      image_url: user.image_url,
      // Only changing email
      email: newEmail,
    }).unwrap();

    console.log(data, error);

    if (data && data.message === 'SUCCESSFUL') {
      // notification.success({
      //   message: "Email update successful",
      //   description: "Your email has been successfully updated",
      // });
      console.log(data.body);
      dispatch(setUserDetails(data.body));
      setCurrentEmail("");
      setNewEmail("");
      setConfirmEmail("");
    }

    if (error) {
      // notification.error({
      //   message: "Error",
      //   description: error.message,
      // });
      console.log("Error updating email");
    }
  };

  return (
    <div className="min-h-screen bg-[#020e1e] flex justify-center py-10 text-white pt-28">
      <div className="w-full max-w-6xl bg-[#020e1e] rounded-lg shadow-md flex flex-col lg:flex-row mt-14">

        {/* Left Content Area (Sidebar) */}
        <div className="w-full lg:w-1/4 bg-[#020e1e] p-6">
          <div className="flex justify-start mb-8">
            <button
              type="button"
              className="pr-14 pl-6 py-2 bg-[#93d437] text-[#0b1326] font-bold rounded-md hover:bg-[#a4de4a] text-lg"
            >
              Dashboard
            </button>
          </div>

          <ul className="space-y-4">
            <li className="flex items-center space-x-2 text-white px-4 py-2 rounded-md hover:bg-[#243447] transition duration-200 text-sm">
              <FiUser className="w-4 h-4" />
              <span>Account Info</span>
            </li>
            <li className="flex items-center space-x-2 font-medium text-[#93d437] bg-[#243447] px-4 py-2 rounded-md text-sm w-44">
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
            <li className="flex items-center space-x-2 text-white px-4 py-2 rounded-md hover:bg-[#243447] transition duration-200 text-sm">
              <FiBookmark className="w-4 h-4" />
              <span>Bookmark</span>
            </li>
          </ul>
        </div>

        {/* Separator Line */}
        <div className="hidden lg:block w-[1px] bg-[#2c3e50]"></div>

        {/* right section */}

        <div className="flex flex-col w-full p-8">
          <h2 className="text-white text-3xl mb-6">Change Email</h2>

          <div className="space-y-6">
            {/* Password Input */}
            <div className="relative max-w-lg">
              <label className="block text-gray-400 text-sm mb-1">Current Email</label>
              <div
                className={`flex items-center bg-gray-800 text-gray-400 p-3 rounded-lg ${activeField === "password" ? "border border-white" : ""}`}
              >
                <Image
                  src="/sms-tracking.png"
                  alt="mail Icon"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <input
                  type="email"
                  placeholder="Enter your current email address"
                  className="bg-transparent focus:outline-none w-full"
                  onFocus={() => setActiveField("password")}
                  onBlur={() => setActiveField(null)}
                  name="currentEmail"
                  value={currentEmail}
                  onChange={handleAllInputChange}
                />
              </div>
            </div>

            {/* Divider */}
            <hr className="border-t border-gray-600 my-4" />

            {/* New Password Input */}
            <div className="relative max-w-lg">
              <label className="block text-gray-400 text-sm mb-1">New Email</label>
              <div
                className={`flex items-center bg-gray-800 text-gray-400 p-3 rounded-lg ${activeField === "newPassword" ? "border border-white" : ""}`}
              >
                <Image
                  src="/sms-tracking.png"
                  alt="mail Icon"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <input
                  type="email"
                  placeholder="Enter your new email address"
                  className="bg-transparent focus:outline-none w-full"
                  onFocus={() => setActiveField("newPassword")}
                  onBlur={() => setActiveField(null)}
                  name="newEmail"
                  value={newEmail}
                  onChange={handleAllInputChange}
                />
              </div>
            </div>

            {/* Confirm New Password Input */}
            <div className="relative max-w-lg">
              <label className="block text-gray-400 text-sm mb-1">Confirm New Email</label>
              <div
                className={`flex items-center bg-gray-800 text-gray-400 p-3 rounded-lg ${activeField === "confirmPassword" ? "border border-white" : ""}`}
              >
                <Image
                  src="/sms-tracking.png"
                  alt="mail Icon"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <input
                  type="email"
                  placeholder="Re-enter your new password"
                  className="bg-transparent focus:outline-none w-full"
                  onFocus={() => setActiveField("confirmPassword")}
                  onBlur={() => setActiveField(null)}
                  name="confirmEmail"
                  value={confirmEmail}
                  onChange={handleAllInputChange}
                />
              </div>
            </div>
          </div>

          {/* Save Changes Button */}
          <button type="button" className="mt-8 w-40 self-end bg-lime-500 text-black font-bold py-2 rounded-full shadow-md hover:bg-lime-400" onClick={handleUpdateEmail}>
            {isLoading && <Loader />}
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
