'use strict';
'use client';

import localFont from 'next/font/local';
import { Provider } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import { metadata } from './metadata';
import { store } from '@/store/store';
import './globals.css';
import ToastProvider from '@/helpers/higherOrderComponent/ToastProvider';

// Font configurations
const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <title>{metadata.title}</title>
        <meta name='description' content={metadata.description} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
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
