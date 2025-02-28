"use client";

import React from "react";
import { useGetUserBookingsQuery } from "@/services/slices/booking.slice";
import Loader from "@/components/Loader";

export interface BookingsPageProps {
  id: number;
  code: string;
  fullname: string;
  event: {
    title: string;
    image: string[];
    currency: string;
  };
  session: {
    start_time: string;
    end_time: string;
  };
  ticket: {
    name: string;
    price: string;
    seat_type: string;
    no_per_seat_type: number;
  };
}

const BookingsPage = () => {
  const { data: bookings, isLoading } = useGetUserBookingsQuery("");

  return (
    <div className="min-h-screen bg-[#020e1e] flex justify-center text-white">
      <div className="w-full max-w-6xl bg-[#020e1e] rounded-lg shadow-md flex flex-col lg:flex-row">
        {/* Right Content Area */}
        <div className="w-full pl-6 flex flex-col">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">My Bookings</h2>
          </div>

          <div className="flex justify-between border-[rgb(44,62,80)] mb-4 pb-2">
            <button type="button" className="text-[#93d437] font-bold">
              Bookings
            </button>
          </div>

          {isLoading && <Loader />}

          <div>
            {!isLoading &&
            bookings &&
            bookings.body &&
            bookings.body.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {bookings.body.map((booking: BookingsPageProps) => (
                  <div key={booking.id} className="border border-white p-2">
                    <p>CODE: {booking.code}</p>
                    <p>Full Name: {booking.fullname}</p>
                    <p>Event Title: {booking.event.title}</p>
                    <p>Session Start Time: {booking.session.start_time}</p>
                    <p>Session End Time: {booking.session.end_time}</p>
                    <p>Ticket Name: {booking.ticket.name}</p>
                    <p>
                      Ticket Price: {booking.ticket.price}{" "}
                      {booking.event.currency.split("-")[0]}
                    </p>
                    <p>Seat Type: {booking.ticket.seat_type}</p>
                    <p>No. of Seats: {booking.ticket.no_per_seat_type}</p>
                  </div>
                ))}
              </div>
            ) : (
              !isLoading && <p>No bookings found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
