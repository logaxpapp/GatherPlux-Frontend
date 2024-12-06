import Image from "next/image";
import { FaCalendarAlt, FaClock, FaTicketAlt } from "react-icons/fa";

const TicketPage = () => {
  return (
    <div
      className="p-4 bg-[#020e1e] text-white py-10"
      style={{
        backgroundImage: "url('/Line.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="mt-8 lg:mt-28 mb-6">
          <Image
            src="/sunday.png"
            alt="Sinful Sunday Banner"
            width={1200}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
            priority
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 mt-20 max-w-6xl mx-auto">
          {/* Left Section: Event Details */}
          <div className="lg:w-2/3">
            <h2 className="text-4xl font-bold mb-9">Sound Of Christmas 2023</h2>
            <p className="text-gray-300 flex items-center mb-6">
              <FaCalendarAlt className="mr-2" /> Saturday, 2 December 2023
            </p>
            <p className="text-gray-300 flex items-center mb-2">
              <FaClock className="mr-2" /> 6:30 PM - 9:30 PM
            </p>
            <p className="text-[#9edd45] mt-2 cursor-pointer">+ Add to Calendar</p>
          </div>

          {/* Right Section: Buttons and Ticket Info */}
          <div className="flex flex-col items-start lg:w-1/3 lg:items-end">
            {/* Action Icons */}
            <div className="flex space-x-4 mb-6">
              <Image
                src="/star.png"
                alt="Star Icon"
                width={40}
                height={40}
                className="rounded-full shadow-lg"
              />
              <Image
                src="/share.png"
                alt="Share Icon"
                width={40}
                height={40}
                className="rounded-full shadow-lg"
              />
            </div>

            {/* Buy Tickets Button */}
            <a href="/buy-tickets">
              <Image
                src="/ticketbtn.png"
                alt="Buy Tickets Button"
                width={200}
                height={60}
                className="cursor-pointer"
              />
            </a>

            {/* Ticket Information */}
            <div className="text-gray-300 mt-6 text-left lg:text-right">
              <h3 className="text-xl font-bold mb-2">Ticket Information</h3>
              <p className="flex items-center">
                <FaTicketAlt className="mr-2" /> Standard Ticket: ₦200 each
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
