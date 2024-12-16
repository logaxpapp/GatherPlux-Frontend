/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getCookie } from '@/utils/cookie.utility';
import { useGetUserProfileQuery } from '@/services/slices/user.slice';
import { setUserDetails } from '@/store/slices/user.slice';

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const {
      data,
      isLoading: isProfileLoading,
      isError,
      isFetching,
    } = useGetUserProfileQuery('');

    useEffect(() => {
      const token = getCookie('token');

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

      // If valid user data exists, set authenticated state and dispatch user details
      setIsAuthenticated(true);
      dispatch(setUserDetails(data.body));
    }, [data, isProfileLoading, isFetching, isError, dispatch, router]);

    if (isProfileLoading || isFetching || !isAuthenticated) {
      return <div>Loading...</div>; // Optional: Add a spinner or loading screen
    }

    return <Component {...props} />;
  };
}
