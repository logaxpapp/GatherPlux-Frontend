"use strict";
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import ProfilePage from "./profilePage/components/ProfilePage";
import {
  useLazyGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/services/slices/user.slice";
import { setUserDetails } from "@/store/slices/user.slice";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";

const Page = () => {
  const dispatch = useDispatch();

  const [image, setImage] = useState<string>(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
  );
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const userInfo = useSelector((state: RootState) => state.user.userDetails);

  const [getUserProfile] = useLazyGetUserProfileQuery();
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  useEffect(() => {
    const getProfile = async () => {
      const response = await getUserProfile("").unwrap();
      if (response && response.body) {
        setFirstname(response.body.firstname ?? "");
        setLastname(response.body.lastname ?? "");
        setPhone(response.body.phone ?? "");
        setAddress(response.body.address ?? "");
        setImage(
          response.body.image_url ??
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        );
        setEmail(response.body.email ?? "");

        dispatch(setUserDetails(response.body));
      }
    };

    getProfile();
  }, [dispatch, getUserProfile]);

  const handleAllOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "first":
        setFirstname(value);
        break;
      case "last":
        setLastname(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "address":
        setAddress(value);
        break;
      default:
        break;
    }
  };

  const handleUpdateProfile = async () => {
    if (
      firstname === userInfo?.firstname &&
      lastname === userInfo?.lastname &&
      phone === userInfo?.phone &&
      address === userInfo?.address &&
      image === userInfo?.image_url
    ) {
      console.error("No changes made");
      return;
    }

    try {
      const { data } = await updateUserProfile({
        firstname,
        lastname,
        phone,
        address,
        image_url: image,
      });
      if (data && data.message === "SUCCESSFUL") {
        toast.success("Profile updated successfully", {
          position: "top-right",
        });
        dispatch(setUserDetails(data.body));
      }
    } catch (err) {
      console.error("An error occurred: ", err);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const triggerFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append("files", files[0]);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}file`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        setImage(response.data.body[0].secure_url);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-[#020e1e] text-white">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <ProfilePage
          image={image}
          email={email}
          firstname={firstname}
          lastname={lastname}
          phone={phone}
          address={address}
          isLoading={isLoading}
          handleUpdateProfile={handleUpdateProfile}
          handleAllOnChange={handleAllOnChange}
          triggerFilePicker={triggerFilePicker}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default Page;
