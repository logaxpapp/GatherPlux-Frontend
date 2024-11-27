import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0b1120] text-white py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-start gap-8">
          {/* Left Section: Logo and Nav Links */}
          <div className="flex flex-col items-center sm:items-start">
            {/* Logo */}
            <div className="mb-6">
              <Image
                src="/logo.svg"
                alt="Gatherplus Logo"
                width={180}
                height={180}
                priority
              />
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm">
              <a href="#" className="hover:text-[#89E101] transition">
                About Us
              </a>
              <a href="#" className="hover:text-[#89E101] transition">
                Contact
              </a>
              <a href="#" className="hover:text-[#89E101] transition">
                Services
              </a>
              <a href="#" className="hover:text-[#89E101] transition">
                Careers
              </a>
              <a href="#" className="hover:text-[#89E101] transition">
                Associates
              </a>
            </nav>
          </div>

          {/* Right Section: Subscription Form */}
          <div className="flex flex-col items-center sm:items-start gap-4 w-full max-w-sm">
            <p className="text-sm text-center sm:text-left">Subscribe</p>
            <form className="flex w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-md text-black focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#89E101] text-black px-4 py-2 rounded-r-md hover:bg-green-600 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4">
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 text-sm">
            {/* Privacy Links */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-4">
              <a href="#" className="hover:text-[#89E101] transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#89E101] transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#89E101] transition">
                Cookies Settings
              </a>
            </div>

            {/* Copyright */}
            <p className="text-center sm:text-right">
              © logaxp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
