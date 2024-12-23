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
      <div className="max-w-xl mx-auto bg-[#020e1e] text-white rounded-lg shadow-lg border border-[#89E101] p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-[#474e58] pb-4 bg-[#1b2634] -mx-6 px-6 -mt-5 pt-4">
          <h2 className="text-xl font-semibold">Attendee Details</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-3xl text-[#89E101] hover:text-red-500"
          >
            &times;
          </button>
        </div>

        {/* Event Info */}
        <div className="mb-6">
          <div className="flex justify-between items-start gap-x-4">
            <h3 className="text-lg font-medium">Sound Of Christmas 2023</h3>
            <div className="flex items-center text-gray-400 text-sm">
              <FaRegCalendarAlt className="text-[#89E101] mr-2" />
              Saturday, 2 December 2023
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-2">Standard Ticket: Ticket #4</p>
        </div>

        {/* Form */}
        <form>
          <div className="space-y-4 mb-6 px-4 py-4 bg-[#1b2634] rounded-md border-t border-[#89E101]">
            {/* Full Name */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter Attendee’s full name"
                className="w-full bg-[#313b48] text-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-[#89E101]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-[#313b48] text-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-[#89E101]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">Phone</label>
              <div className="flex items-center bg-[#313b48] px-4 py-2 rounded-md focus-within:ring focus-within:ring-[#89E101]">
                <Flag code="NG" className="w-6 h-4 mr-2" />
                <input
                  type="tel"
                  placeholder="Enter Attendee's Phone Number"
                  className="w-full bg-transparent text-gray-300 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Terms and Checkout */}
          <div className="text-sm mb-6 text-gray-400">
            I accept the{" "}
            <span className="text-[#89E101] cursor-pointer">Terms of Service</span> and
            have read the{" "}
            <span className="text-[#89E101] cursor-pointer">Privacy Policy</span>.
          </div>

          {/* Quantity and Total Section */}
          <div className="bg-[#1b2634] rounded-md p-4 -mx-6 -mb-6">
            {/* Quantity and Total */}
            <div className="flex justify-between items-center text-lg text-gray-300 mb-4">
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
              onClick={openModal} // Open the modal on click
              className="w-full bg-[#9edd45] text-black font-semibold py-3 rounded-md text-center hover:bg-[#7AC801] mb-5"
            >
              Continue to Checkout &rarr;
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <OrderSummary />
          {/* Keep the "X" button inside the modal */}
          <button
            onClick={() => setIsModalOpen(false)} // Close the modal
            className="absolute top-0 right-0 text-white p-4 text-3xl"
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}
