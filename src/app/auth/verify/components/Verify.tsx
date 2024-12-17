'use strict';
'use client';

import { useVerifyUserMutation } from '@/services/slices/user.slice';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import Head from 'next/head';
import OTPInput from '@/components/UI/otpinput';
import Loader from '@/components/Loader';

export default function EmailVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get('email');

  const [verifyUser, { isLoading }] = useVerifyUserMutation();

  const handleOtpChange = (otp: string[]) => {
    const otpString = otp.join('');

    if (otpString.length === 6) {
      handleSubmit(otpString);
    }
  };

  const handleSubmit = async (otp: string) => {
    if (otp === '' || email === '') {
      return;
    }

    try {
      const response = await verifyUser({ email, code: otp }).unwrap();

      if (
        response &&
        response.code === 200 &&
        response.message === 'SUCCESSFUL'
      ) {
        router.push('/auth/login');
      }
    } catch (err) {
      console.error('An error occurred when verifying user: ', err);
    }
  };

  return (
    <>
      <Head>
        <title>Email Verification</title>
      </Head>
      <div
        className='flex items-center justify-center min-h-screen relative bg-gradient-to-br from-[#011926] to-[#002B41]'
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 30%, rgba(0, 255, 102, 0.1), transparent 50%), radial-gradient(circle at 10% 70%, rgba(51, 170, 255, 0.1), transparent 90%)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          className='w-full max-w-md p-6 text-white rounded-3xl shadow-lg mx-auto'
          style={{
            background: 'linear-gradient(to bottom, #102730, #123739, #10212d)',
            borderTop: '5px solid #9EDD45',
            borderLeft: '1px solid #9EDD45',
            borderRight: '1px solid #9EDD45',
            borderBottom: '1px solid #9EDD45',
          }}
        >
          <h1 className='text-3xl font-bold text-center mb-4'>
            Email Verification
          </h1>
          <p className='text-center text-gray-400 mb-6'>
            We have sent a 6-digit OTP to{' '}
            <span className='text-white'>{email}</span>. Please enter the code
            below to verify your mail.
          </p>
          <div className='flex flex-col items-center gap-4 mb-6'>
            <OTPInput
              length={6}
              onChange={handleOtpChange}
              isLoading={isLoading}
            />
            {isLoading && <Loader />}
          </div>
          <div className='text-center mt-4'>
            <p className='text-gray-400'>
              Didn’t receive the code?{' '}
              <button type='button' className='text-[#9EDD45] hover:underline'>
                Resend code
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
