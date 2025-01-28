import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import Flag from "react-world-flags";
import OrderSummary from "./OrderSummary"; // Import the OrderSummary modal component

export default function AttendeeDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Default to false

  const openModal = () => {
    setIsModalOpen(true); // Open the modal when the button is clicked
  };

  return (
    <>
      {/* Attendee Details Form */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-80"
          onClick={() => setIsModalOpen(false)}
        ></div>
  
        {/* Modal Container */}
        <div
          className="relative z-10 w-full max-w-xs sm:max-w-md lg:max-w-xl p-4 sm:p-5 bg-[#020e1e] text-white rounded-2xl shadow-lg border border-[#89E101]"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4 border-b border-[#474e58] pb-3 bg-[#1b2634] -mx-5 px-5 -mt-4 pt-3 rounded-t-2xl">
            <h2 className="text-xl sm:text-2xl font-semibold">Attendee Details</h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-3xl text-[#89E101] hover:text-red-500"
            >
              &times;
            </button>
          </div>
  
          {/* Event Info */}
          <div className="mb-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <h3 className="text-lg sm:text-xl font-medium">Sound Of Christmas 2023</h3>
              <div className="flex items-center text-gray-400 text-sm sm:text-base">
                <FaRegCalendarAlt className="text-[#89E101] mr-2" />
                Saturday, 2 December 2023
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-2">Standard Ticket: Ticket #4</p>
          </div>
  
          {/* Form */}
          <form>
            <div className="space-y-3 mb-4 px-4 py-3 bg-[#1b2634] rounded-md border-t border-[#89E101]">
              {/* Full Name */}
              <div>
                <label className="block text-gray-300 text-sm sm:text-base mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter Attendee’s full name"
                  className="w-full bg-[#313b48] text-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-[#89E101] text-sm sm:text-base"
                />
              </div>
  
              {/* Email */}
              <div>
                <label className="block text-gray-300 text-sm sm:text-base mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[#313b48] text-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-[#89E101] text-sm sm:text-base"
                />
              </div>
  
              {/* Phone */}
              <div>
                <label className="block text-gray-300 text-sm sm:text-base mb-1">Phone</label>
                <div className="flex items-center bg-[#313b48] px-4 py-2 rounded-md focus-within:ring focus-within:ring-[#89E101]">
                  <Flag code="NG" className="w-6 h-4 mr-2" />
                  <input
                    type="tel"
                    placeholder="Enter Attendee's Phone Number"
                    className="w-full bg-transparent text-gray-300 focus:outline-none text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>
  
            {/* Terms and Checkout */}
            <div className="text-sm sm:text-base mb-4 text-gray-400 text-center">
              I accept the{" "}
              <span className="text-[#89E101] cursor-pointer">Terms of Service</span> and
              have read the{" "}
              <span className="text-[#89E101] cursor-pointer">Privacy Policy</span>.
            </div>
  
            {/* Quantity and Total Section */}
            <div className="bg-[#1b2634] rounded-md p-4 -mx-5 -mb-5">
              {/* Quantity and Total */}
              <div className="flex justify-between items-center text-lg text-gray-300 mb-3">
                <span>
                  Qty: <strong>1</strong>
                </span>
                <span>
                  Total: <strong className="text-[#89E101]">₦200</strong>
                </span>
              </div>
  
              {/* Checkout Button */}
              <button
                type="button"
                onClick={openModal}
                className="w-full py-3 bg-[#9edd45] text-black font-semibold rounded-md text-center hover:bg-[#7AC801] transition text-sm sm:text-base"
              >
                Continue to Checkout &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
  
      {/* Order Summary Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <OrderSummary />
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-0 right-0 text-white p-4 text-3xl"
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
  
  
}
