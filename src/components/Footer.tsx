import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0b1120] text-white py-10">
      <div className="container mx-auto px-4 max-w-[1250px]">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <Image
              src="/logo.svg"
              alt="Gatherplus Logo"
              width={180} // Specify the width and height to optimize performance
              height={180}
              priority // Ensure the logo loads immediately for better LCP
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
            <a href="#" className="hover:text-[#89E101] transition" aria-label="About Us">
              About Us
            </a>
            <a href="#" className="hover:text-[#89E101] transition" aria-label="Contact">
              Contact
            </a>
            <a href="#" className="hover:text-[#89E101] transition" aria-label="Services">
              Services
            </a>
            <a href="#" className="hover:text-[#89E101] transition" aria-label="Careers">
              Careers
            </a>
            <a href="#" className="hover:text-[#89E101] transition" aria-label="Associates">
              Associates
            </a>
          </nav>
        </div>

        {/* Subscription Form */}
        <div className="mt-8 flex flex-col md:flex-row items-center gap-4">
          <p className="text-sm">Subscribe</p>
          <form className="flex w-full max-w-sm">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email for subscription"
              className="flex-1 px-4 py-2 rounded-l-md text-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#89E101] text-black px-4 py-2 rounded-r-md hover:bg-green-600 transition"
              aria-label="Subscribe button"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            {/* Privacy Links */}
            <div className="flex flex-wrap gap-4 text-center md:text-left">
              <a href="#" className="hover:text-[#89E101] transition" aria-label="Privacy Policy">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#89E101] transition" aria-label="Terms of Service">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#89E101] transition" aria-label="Cookies Settings">
                Cookies Settings
              </a>
            </div>

            {/* Copyright */}
            <p className="mt-4 md:mt-0 text-center">© logaxp. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
