import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-center z-50 mt-8">
      <div className="flex items-center justify-between px-6 py-4 bg-gray-800/70 backdrop-blur-md text-white rounded-full w-[90%] max-w-6xl shadow-lg">
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-3">
          <Image
            src="/logo.png" // Path to your logo image
            alt="Gatherplus Logo"
            width={150}
            height={150}
          />
        </div>

        {/* Center Section: Navigation Links */}
        <div className="flex space-x-8">
          <a href="#" className="hover:text-gray-300">
            Category
          </a>
          <a href="#" className="hover:text-gray-300">
            Upcoming Events
          </a>
          <a href="#" className="hover:text-gray-300">
            Support
          </a>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center space-x-4">
          {/* Globe Icon */}
          <Image
            src="/global.png" // Use global.png from public folder
            alt="Language Selector"
            width={24}
            height={24}
            className="cursor-pointer"
          />

          {/* Create Event Button */}
          <button type="button" className="bg-[#9EDD45] text-black px-4 py-1 rounded-full font-medium hover:bg-green-400">
            + Create Event
          </button>

          {/* Profile Icon */}
          <Image
            src="/avatar.png" // Path to avatar image
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
