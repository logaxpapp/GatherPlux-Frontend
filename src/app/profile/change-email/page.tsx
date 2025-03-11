"use client";
import Image from "next/image";
import React, { useState } from "react";
import {} from "react-icons/fi";
import {} from "react-icons/fi";
import { useDispatch } from "react-redux";

import { useUpdateUserEmailMutation } from "@/services/slices/user.slice";
import Loader from "@/components/Loader";
import { setUserDetails } from "@/store/slices/user.slice";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();

  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [activeField, setActiveField] = useState<string | "">("");

  const [updateUserEmail, { isLoading }] = useUpdateUserEmailMutation();

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

    try {
      const response = await updateUserEmail({
        email: newEmail,
      }).unwrap();

      if (
        response &&
        response.code === 200 &&
        response.message === "SUCCESSFUL"
      ) {
        // notification.success({
        //   message: "Success",
        //   description: "Email updated successfully",
        // });
        console.log("Email updated successfully");
        setCurrentEmail("");
        setNewEmail("");
        setConfirmEmail("");
        dispatch(setUserDetails(response.body[1].body));
      } else {
        // notification.error({
        //   message: "Error",
        //   description: "An error occurred while updating your email",
        // });
        console.log("An error occurred while updating your email");
      }
    } catch {
      // notification.error({
      //   message: "Error",
      //   description: "An error occurred while updating your email",
      // });
      console.log("An error occurred while updating your email");
    }
  };

  return (
    <div className="min-h-screen bg-[#020e1e] flex justify-center  text-white ">
      <div className="w-full max-w-6xl bg-[#020e1e] rounded-lg shadow-md flex flex-col lg:flex-row ">
        {/* right section */}

        <div className="flex flex-col w-full pl-8">
          <div className="flex flex-col w-full">
            <h2 className="text-white text-3xl mb-6">Change Email</h2>

            <div className="space-y-6">
              {/* Password Input */}
              <div className="relative max-w-lg">
                <label className="block text-gray-400 text-sm mb-1">
                  Current Email
                </label>
                <div
                  className={`flex items-center bg-gray-800 text-gray-400 p-3 rounded-lg ${
                    activeField === "password" ? "border border-white" : ""
                  }`}
                >
                  <Image
                    src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/xfydxp5zbbdbgtbxvpkh"
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
                    onBlur={() => setActiveField("")}
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
                <label className="block text-gray-400 text-sm mb-1">
                  New Email
                </label>
                <div
                  className={`flex items-center bg-gray-800 text-gray-400 p-3 rounded-lg ${
                    activeField === "newPassword" ? "border border-white" : ""
                  }`}
                >
                  <Image
                    src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/xfydxp5zbbdbgtbxvpkh"
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
                    onBlur={() => setActiveField("")}
                    name="newEmail"
                    value={newEmail}
                    onChange={handleAllInputChange}
                  />
                </div>
              </div>

              {/* Confirm New Password Input */}
              <div className="relative max-w-lg">
                <label className="block text-gray-400 text-sm mb-1">
                  Confirm New Email
                </label>
                <div
                  className={`flex items-center bg-gray-800 text-gray-400 p-3 rounded-lg ${
                    activeField === "confirmPassword"
                      ? "border border-white"
                      : ""
                  }`}
                >
                  <Image
                    src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/xfydxp5zbbdbgtbxvpkh"
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
                    onBlur={() => setActiveField("")}
                    name="confirmEmail"
                    value={confirmEmail}
                    onChange={handleAllInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Save Changes Button */}
            <button
              type="button"
              className="mt-8 w-40 self-end bg-lime-500 text-black font-bold py-2 rounded-full shadow-md hover:bg-lime-400"
              onClick={handleUpdateEmail}
            >
              {isLoading && <Loader />}
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
