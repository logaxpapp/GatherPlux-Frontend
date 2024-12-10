'use strict';
'use client';

import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import Mail from '../../../../public/sms-tracking.svg';
import Lock from '../../../../public/lock.svg';
import { useLoginUserMutation } from '@/services/slices/user.slice';
import Loader from '@/components/Loader';
import { setToken } from '@/store/slices/user.slice';
import { setCookie } from '@/utils/cookie.utility';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [loginUser, { isLoading }] = useLoginUserMutation();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Access form data
    const formData = new FormData(e.currentTarget);
    const userData = {
      username: formData.get('email'),
      password: formData.get('password'),
    };

    if (userData.username === '' || userData.password === '') {
      // toast.error("Please fill all fields", {
      //   position: 'top-right'
      // });
      return;
    }

    try {
      const response = await loginUser(userData).unwrap();

      if (response && response.code === 200 && response.message === 'SUCCESSFUL') {
        setCookie('token', response.body.access_token);
        dispatch(setToken(response.body.access_token));
        router.push("/profile");
      }

      if (response && response.status === 401) {
        // toast.error("Invalid credentials", {
        //   position: 'top-right'
        // });
        return 'invalid credentials';
      }

      if (response && response.error) {
        // toast.error(response.error, {
        //   position: 'top-right'
        // });
        return response.error;
      }
    } catch (err) {
      console.error("An error occured when signing user up: ", err);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen relative bg-gradient-to-br from-[#011926] to-[#002B41]"
      style={{
        backgroundImage: `
        radial-gradient(circle at 50% 30%, rgba(0, 255, 102, 0.1), transparent 50%),
        radial-gradient(circle at 10% 70%, rgba(51, 170, 255, 0.1), transparent 90%)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}

    >
      <div
        className="w-full max-w-md p-6 text-white rounded-3xl shadow-lg relative"
        style={{
          background: 'linear-gradient(to bottom, #102730, #123739, #10212d)',
          borderTop: '5px solid #9EDD45',
          borderLeft: '1px solid #9EDD45',
          borderRight: '1px solid #9EDD45',
          borderBottom: '1px solid #9EDD45',
        }}
      >
        <h1 className="text-3xl font-bold text-center mb-2">Login</h1>
        <p className="text-center text-gray-400 mb-6">Login to book your next great experience</p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className=" block text-sm font-medium mb-1 text-[#dbdae3]">Email</label>
            <div className=" border-[1px] border-[#97a0a4] bg-[#284449] flex items-center px-3  rounded-md">
              <Image src={Mail.src} alt="Profile" width={24} height={24} className="mr-2" />
              <input
                type="email"
                name='email'
                placeholder="Enter email address"
                className="w-full p-2 bg-transparent border-none focus:ring-0 focus:outline-none text-white"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#dbdae3]">Password</label>
            <div className="border-[1px] border-[#97a0a4] bg-[#284449]  flex items-center px-3  rounded-md">
              <Image src={Lock.src} alt="Profile" width={24} height={24} className="mr-2" />
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
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
          <p className='text-right text-[#9EDD45] pb-6'>Forgot password</p>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-[#9EDD45] text-black font-bold rounded-md hover:bg-[#6EDD46] transition"
          >
            {isLoading && <Loader />}
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-gray-400">
          <p>
            Don&apos;t have an account?{' '}
            <a href="/login" className="text-[#9EDD45] hover:underline">
              Create account
            </a>
          </p>
          <div className="text-center my-4">
            <span className="mx-2 text-white">or</span>
          </div>
          <button type='button' className="flex items-center justify-center w-full py-2 bg-none border-none font-medium transition">
            <FcGoogle className="text-xl mr-2" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}
