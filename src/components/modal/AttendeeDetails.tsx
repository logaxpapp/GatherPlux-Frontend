"use strict";
"use client";

import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import Flag from "react-world-flags";
import { useBookEventMutation } from "@/services/slices/events.slice";
import { toast } from "react-toastify";
import { TicketProps } from "@/app/tickets/[id]/components/TicketPage";
import { useRouter } from "next/navigation";

interface AttendeeDetailsProps {
  ticket: TicketProps;
  eventID: number;
  sessionID: number;
  toggleModal: () => void;
  title: string;
  date: string;
}

const AttendeeDetails: React.FC<AttendeeDetailsProps> = ({
  ticket,
  eventID,
  sessionID,
  toggleModal,
  title,
  date,
}) => {
  const router = useRouter();

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const [bookEvent] = useBookEventMutation();

  const handleAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "fullName") setFullName(value);
    if (name === "email") setEmail(value);
    if (name === "phone") setPhone(value);
  };

  const handleBookEvent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!ticket.id || !eventID || !sessionID) {
      return toast.error("An error occured linking your ticket to the event");
    }

    if (!fullName || !email || !phone) {
      return toast.error("All fields are required");
    }

    const response = await bookEvent({
      fullName,
      email,
      phone,
      ticket_id: ticket.id,
      event_id: eventID,
      session_id: sessionID,
    });
    if (response.data) {
      toast.success("Event booked successfully");
      toggleModal();
      router.push("/");
    }
  };

  return (
    <>
      {/* Attendee Details Form */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Modal Container */}
        <div className="relative z-10 w-full max-w-xs sm:max-w-md lg:max-w-xl p-4 sm:p-5 bg-[#020e1e] text-white rounded-2xl shadow-lg border border-[#89E101]">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 border-b border-[#474e58] pb-3 bg-[#1b2634] -mx-5 px-5 -mt-4 pt-3 rounded-t-2xl">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Attendee Details
            </h2>
            <button
              type="button"
              onClick={toggleModal}
              className="text-3xl text-[#89E101] hover:text-red-500"
            >
              &times;
            </button>
          </div>

          {/* Event Info */}
          <div className="mb-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <h3 className="text-lg sm:text-xl font-medium">{title}</h3>
              <div className="flex items-center text-gray-400 text-sm sm:text-base">
                <FaRegCalendarAlt className="text-[#89E101] mr-2" />
                {date}
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Ticket: {ticket.name} - ₦{Number(ticket.price).toLocaleString()}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleBookEvent}>
            <div className="space-y-3 mb-4 px-4 py-3 bg-[#1b2634] rounded-md border-t border-[#89E101]">
              {/* Full Name */}
              <div>
                <label className="block text-gray-300 text-sm sm:text-base mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  name="fullName"
                  onChange={handleAllChange}
                  placeholder="Enter Attendee’s full name"
                  className="w-full bg-[#313b48] text-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-[#89E101] text-sm sm:text-base"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-300 text-sm sm:text-base mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  name="email"
                  onChange={handleAllChange}
                  placeholder="Enter your email"
                  className="w-full bg-[#313b48] text-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-[#89E101] text-sm sm:text-base"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-300 text-sm sm:text-base mb-1">
                  Phone
                </label>
                <div className="flex items-center bg-[#313b48] px-4 py-2 rounded-md focus-within:ring focus-within:ring-[#89E101]">
                  <Flag code="NG" className="w-6 h-4 mr-2" />
                  <input
                    type="tel"
                    value={phone}
                    name="phone"
                    onChange={handleAllChange}
                    placeholder="Enter Attendee's Phone Number"
                    className="w-full bg-transparent text-gray-300 focus:outline-none text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>

            {/* Terms and Checkout */}
            <div className="text-sm sm:text-base mb-4 text-gray-400 text-center">
              When you book you accept the{" "}
              <span className="text-[#89E101] cursor-pointer">
                Terms of Service
              </span>{" "}
              and have read the{" "}
              <span className="text-[#89E101] cursor-pointer">
                Privacy Policy
              </span>
              .
            </div>

            {/* Quantity and Total Section */}
            <div className="bg-[#1b2634] rounded-md p-4 -mx-5 -mb-5">
              {/* Quantity and Total */}
              {/* <div className="flex justify-between items-center text-lg text-gray-300 mb-3">
                <span>
                  Qty: <strong>1</strong>
                </span>
                <span>
                  Total: <strong className="text-[#89E101]">₦200</strong>
                </span>
              </div> */}

              <button
                type="submit"
                className="w-full py-3 bg-[#9edd45] text-black font-semibold rounded-md text-center hover:bg-[#7AC801] transition text-sm sm:text-base"
              >
                Book Event &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AttendeeDetails;
