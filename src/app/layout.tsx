import { ReactNode } from "react";
import Navbar from "../components/Navbar"; // Adjust path if needed
import "../styles/globals.css"; // This should be relative to the layout.tsx file


// Import local fonts (if you're using custom fonts)
import localFont from "next/font/local";

// Define fonts using localFont
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900", // Define font weight range
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Your App Name",
  description: "Description of your app",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Navbar will be included at the top of the layout */}
        <Navbar />

        {/* Main content of each page will be injected here */}
        <main>{children}</main>

        {/* Optional footer (if you want it to appear on every page) */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
