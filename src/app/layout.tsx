"use strict";
"use client";

import localFont from "next/font/local";
import { Provider, useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { metadata } from "./metadata";
import { RootState, store } from "@/store/store";
import "./globals.css";
import ToastProvider from "@/helpers/higherOrderComponent/ToastProvider";
import { useLazyGetUserProfileQuery } from "@/services/slices/user.slice";
import { useEffect } from "react";
import { setUserDetails } from "@/store/slices/user.slice";

// Font configurations
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Fetch user details
const FetchUserDetails = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state: RootState) => state.user.userDetails);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const [getUserProfile] = useLazyGetUserProfileQuery();

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await getUserProfile("").unwrap();
      if (response && response.body) {
        dispatch(setUserDetails(response.body));
      }
    };

    if (accessToken) {
      if (userDetails.id === 0 && userDetails.email === "") {
        getUserDetails();
      }
    }
  }, [accessToken, userDetails, dispatch, getUserProfile]);

  return null;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <FetchUserDetails />
          <Navbar />
          <main>
            <ToastProvider>{children}</ToastProvider>
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
