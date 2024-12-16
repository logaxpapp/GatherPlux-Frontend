'use strict';
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import ProfilePage from './profilePage/components/ProfilePage';
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '@/services/slices/user.slice';
import { setUserDetails } from '@/store/slices/user.slice';
import { RootState } from '@/store/store';

const Page = () => {
  const dispatch = useDispatch();

  const [image, setImage] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const userInfo = useSelector((state: RootState) => state.user.userDetails);

  const { data } = useGetUserProfileQuery('');
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  useEffect(() => {
    if (data) {
      setFirstname(data.body.firstname);
      setLastname(data.body.lastname);
      setPhone(data.body.phone);
      setAddress(data.body.address);
      setImage(data.body.image_url);
      setEmail(data.body.email);

      // set the user details in the state
      dispatch(setUserDetails(data.body));
    }
  }, [data, dispatch]);

  const handleAllOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'first':
        setFirstname(value);
        break;
      case 'last':
        setLastname(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'address':
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
      console.error('No changes made');
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
      if (data && data.message === 'SUCCESSFUL') {
        dispatch(setUserDetails(data.body));
      }
    } catch (err) {
      console.error('An error occurred: ', err);
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
      formData.append('files', files[0]);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}file`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        setImage(response.data.body[0].secure_url);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div className='min-h-screen flex bg-[#020e1e] text-white'>
      {/* Main Content */}
      <div className='flex-1 p-8'>
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
