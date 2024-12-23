'use client';

import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '@/services/slices/user.slice';
import Loader from '@/components/Loader';
import { setToken } from '@/store/slices/user.slice';
import { setCookie } from '@/utils/cookie.utility';
import Link from 'next/link';
import Image from 'next/image';

interface LoginModalProps {
  onClose: () => void;
}
export default function LoginModal({ onClose }: LoginModalProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = {
      username: formData.get('email'),
      password: formData.get('password'),
    };

    if (userData.username === '' || userData.password === '') {
      return;
    }

    try {
      const response = await loginUser(userData).unwrap();

      if (response?.code === 200 && response.message === 'SUCCESSFUL') {
        setCookie('token', response.body.access_token);
        dispatch(setToken(response.body.access_token));
        router.push('/profile');
      }
    } catch (err) {
      console.error('An error occurred: ', err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Semi-transparent black background */}
      <div className="absolute inset-0 bg-black bg-opacity-80" onClick={onClose}></div>
  
      {/* Modal Content */}
      <div
        className="relative z-10 w-full max-w-md p-6 text-white rounded-3xl shadow-lg"
        style={{
          background: 'linear-gradient(to bottom, #102730, #123739, #10212d)',
          borderTop: '5px solid #9EDD45',
          borderLeft: '1px solid #9EDD45',
          borderRight: '1px solid #9EDD45',
          borderBottom: '1px solid #9EDD45',
        }}
      >
        <button
          className="absolute top-3 right-3 text-white font-bold"
          onClick={onClose}
        >
          ✕
        </button>
        <h1 className="text-3xl font-bold text-center mb-2">Sign In</h1>
        <p className="text-center text-gray-400 mb-6">
          Login to book your next great experience
        </p>
  
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#dbdae3]">
              Email
            </label>
            <div className="border-[1px] border-[#97a0a4] bg-[#284449] flex items-center px-3 rounded-md">
              <Image
                src="/sms-tracking.svg"
                alt="Mail Icon"
                width={24}
                height={24}
                className="mr-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                className="w-full p-2 bg-transparent border-none focus:ring-0 focus:outline-none text-white"
              />
            </div>
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-1 text-[#dbdae3]">
              Password
            </label>
            <div className="border-[1px] border-[#97a0a4] bg-[#284449] flex items-center px-3 mb-3 rounded-md">
              <Image
                src="/lock.svg"
                alt="Lock Icon"
                width={24}
                height={24}
                className="mr-2"
              />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                className="w-full p-2 bg-transparent border-none focus:ring-0 focus:outline-none text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 ml-2"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
  
          <Link
            href="/auth/forgot-password"
            className="flex items-center justify-end text-[#9EDD45] pb-6"
          >
            Forgot password
          </Link>
  
          <button
            type="submit"
            className="w-full py-2 bg-[#9EDD45] text-black font-bold rounded-md hover:bg-[#6EDD46] transition"
          >
            {isLoading && <Loader />}
            Sign In
          </button>
        </form>
  
        <div className="mt-4 text-gray-400">
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-[#9EDD45] hover:underline">
              Create account
            </Link>
          </p>
          <div className="text-center my-4">
            <span className="mx-2 text-white">or</span>
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-full py-2 bg-none border-none font-medium transition"
          >
            <FcGoogle className="text-xl mr-2" />
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
  
}
