import { FaRegCalendarAlt, FaPhoneAlt } from "react-icons/fa";

export default function AttendeeDetails() {
  return (
    <div className="max-w-md mx-auto bg-[#020e1e] text-white rounded-lg shadow-lg border border-[#89E101] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-[#89E101] pb-4">
        <h2 className="text-xl font-semibold">Attendee Details</h2>
        <button className="text-3xl text-[#89E101] hover:text-red-500">&times;</button>
      </div>

      {/* Event Info */}
      <div className="mb-6">
        <h3 className="text-lg font-medium">Sound Of Christmas 2023</h3>
        <p className="flex items-center text-gray-400 text-sm mt-1">
          <FaRegCalendarAlt className="text-[#89E101] mr-2" /> Saturday, 2 December 2023
        </p>
        <p className="text-gray-400 text-sm">Standard Ticket: Ticket #4</p>
      </div>

      {/* Form */}
      <form>
        <div className="space-y-4 mb-6 px-4 py-4 bg-[#1b2634] rounded-md border-t border-[#89E101] ">
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
              <FaPhoneAlt className="text-[#89E101] mr-2" />
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
          <span className="text-[#89E101] underline cursor-pointer">Terms of Service</span> and
          have read the{" "}
          <span className="text-[#89E101] underline cursor-pointer">Privacy Policy</span>.
        </div>

    {/* Quantity and Total with Background */}
<div className="bg-[#1b2634] p-4 rounded-md ">
  <div className="flex justify-between items-center text-lg text-gray-300 mb-4">
    <span>Qty: <strong>1</strong></span>
    <span>Total: <strong className="text-[#89E101]">₦200</strong></span>
  </div>

  {/* Checkout Button */}
  <button
    type="submit"
    className="w-full bg-[#9edd45] text-black font-semibold py-3 rounded-md text-center hover:bg-[#7AC801]"
  >
    Continue to Checkout &rarr;
  </button>
</div>

      </form>
    </div>
  );
}
