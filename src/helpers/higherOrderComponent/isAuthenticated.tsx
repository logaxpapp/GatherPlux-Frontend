/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserProfileQuery } from '@/services/slices/user.slice';
import { setUserDetails } from '@/store/slices/user.slice';
import { RootState } from '@/store/store';

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const token = useSelector((state: RootState) => state.user.accessToken);
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const {
      data,
      isLoading: isProfileLoading,
      isError,
      isFetching,
    } = useGetUserProfileQuery('');

    useEffect(() => {
      if (!token) {
        router.push('/auth/login');
        return;
      }

      if (isFetching || isProfileLoading) {
        return; // Wait for profile data to finish loading
      }

      if (isError || !data || !data.body) {
        router.push('/auth/login');
        return;
      }

      if (
        pathname === '/auth/login' ||
        pathname === '/auth/register' ||
        pathname === '/auth/forgot-password' ||
        pathname === '/auth/reset-password' ||
        pathname === '/auth/reset' ||
        pathname === '/auth/verify'
      ) {
        if (token) {
          router.push('/profile');
          return;
        }
      }

      // If valid user data exists, set authenticated state and dispatch user details
      dispatch(setUserDetails(data.body));
    }, [
      data,
      isProfileLoading,
      isFetching,
      isError,
      dispatch,
      router,
      pathname,
      token,
    ]);

    if (isProfileLoading || isFetching) {
      return <div>Loading...</div>; // Optional: Add a spinner or loading screen
    }

    return <Component {...props} />;
  };
}
