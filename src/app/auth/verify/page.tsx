'use strict';
'use client';

import { useVerifyUserMutation } from '@/services/slices/user.slice';
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";

import Head from 'next/head';
import OTPInput from '@/components/UI/otpinput';
import Loader from '@/components/Loader';


export default function EmailVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [verifyUser, { isLoading }] = useVerifyUserMutation();

  const handleOtpChange = (otp: string[]) => {
    const otpString = otp.join('');

    if (otpString.length === 6) {
      handleSubmit(otpString);
    }
  };

  const handleSubmit = async (otp: string) => {
    if (otp === "" || email === "") {
      // toast.error("Please put an OTP value", {
      //   position: 'top-right'
      // });
      return;
    }

    try {
      const response = await verifyUser({ email, code: otp }).unwrap();

      if (response && response.code === 200 && response.message === 'SUCCESSFUL') {
        router.push("/auth/login");
      }

      // if (response && response.status === 400) {
      //   // toast.error("Invalid credentials", {
      //   //   position: 'top-right'
      //   // });
      //   return 'invalid activation code';
      // }

      // if (response && response.error) {
      //   // toast.error(response.error, {
      //   //   position: 'top-right'
      //   // });
      //   return response.error;
      // }

    } catch (err) {
      console.error("An error occured when verifying user: ", err);
    }

  };

  return (
    <>
      <Head>
        <title>Email Verification</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <div className="w-96 p-8 bg-dark-blue border border-lime-500 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-white mb-4">Email verification</h1>
          <p className="text-center text-gray-300 mb-6">
            We have sent a 6-digit OTP to <span className="text-white">{email}</span>. Please enter
            the code below to verify your mail.
          </p>
          <div className="flex justify-between gap-2 mb-6">
            <OTPInput length={6} onChange={handleOtpChange} isLoading={isLoading} />
            {isLoading && <Loader />}
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-300">
              Didn’t receive the code?{' '}
              <button type='button' className="text-lime-500 hover:underline">Resend code</button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
