"use strict";
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  useGetBookmarkedEventsQuery,
  useRemoveBookmarkEventMutation,
} from "@/services/slices/events.slice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { EventProps, formatDate } from "@/app/homepage/EventCard";
import { toast } from "react-toastify";

interface BookmarkProps {
  id: number;
  event: EventProps;
}

const Bookmarks: React.FC = () => {
  const [bookmarkedEvents, setBookmarkedEvents] = useState<BookmarkProps[]>([]);

  const user = useSelector((state: RootState) => state.user);

  const { data: bookmarkedEventsData } = useGetBookmarkedEventsQuery("");
  const [removeBookmarkMutation] = useRemoveBookmarkEventMutation();

  useEffect(() => {
    if (user.userDetails.id !== 0 && user.userDetails.email !== "") {
      if (
        bookmarkedEventsData &&
        bookmarkedEventsData.body &&
        bookmarkedEventsData.body.length > 0
      ) {
        setBookmarkedEvents(bookmarkedEventsData.body);
      }
    }
  }, [bookmarkedEventsData, user]);

  const handleRemoveBookmark = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const { value } = event.target as HTMLButtonElement;
    try {
      const response = await removeBookmarkMutation({
        id: value,
      }).unwrap();
      if (
        response &&
        response.code === 200 &&
        response.message === "SUCCESSFUL"
      ) {
        toast.success("Bookmark removed successfully!", {
          position: "top-right",
        });
        setBookmarkedEvents((prev) =>
          prev.filter((bookmark) => bookmark.id !== Number(value)),
        );
      }
    } catch {
      toast.error("Failed to remove bookmark!", { position: "top-right" });
    }
  };

  return (
    <div className="min-h-screen bg-[#020e1e] flex justify-center text-white">
      <div className="w-full max-w-6xl bg-[#020e1e] rounded-lg shadow-md flex flex-col lg:flex-row">
        {/* Right Content Area */}
        <div className="w-full pl-6 flex flex-col">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">My Bookmarks</h2>
          </div>

          <div className="flex justify-between border-[rgb(44,62,80)] mb-4 pb-2">
            <button type="button" className="text-[#93d437] font-bold">
              Bookmarked
            </button>
          </div>

          {/* Event Cards */}
          <div className="space-y-4 flex-grow">
            {bookmarkedEvents.length > 0 ? (
              bookmarkedEvents.map((bookmark) => (
                <div key={bookmark.id}>
                  {/* Card Content */}
                  <div className="flex items-center justify-between pb-4">
                    {/* Event Details with Blue Background */}
                    <div className="flex items-center space-x-4 bg-[#243447] p-4 max-w-[100%] rounded-md">
                      <Image
                        src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/yaw62wote2cdswpucoqq"
                        alt="Event Thumbnail"
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-sm">
                          {bookmark.event.title}
                        </h3>
                        <p className="text-[#a5b0c1] text-xs">
                          {bookmark.event.city} -{" "}
                          {formatDate(bookmark.event.start_date)}
                          <br />
                          {bookmark.event.time}
                        </p>
                        <p className="text-[#93d437] text-xs mt-1">
                          {Number(bookmark.event.price).toLocaleString()}{" "}
                          {bookmark.event.currency.split("-")[0]} •{" "}
                          <span className="text-orange-500">★</span>{" "}
                          <span className="text-white">
                            {Number(bookmark.event.likes).toLocaleString()}{" "}
                            Interested
                          </span>
                        </p>
                      </div>
                    </div>
                    {/* Separate Button */}
                    <button
                      type="button"
                      value={bookmark.id}
                      onClick={handleRemoveBookmark}
                      className="ml-4 bg-[#93d437] text-black font-bold px-6 py-2 rounded-full hover:bg-[#a4de4a]"
                    >
                      Remove from Bookmarks
                    </button>
                  </div>

                  {/* Thin Separator Line */}
                  <div className="border-b border-[#2c3e50]"></div>
                </div>
              ))
            ) : (
              <p>No Bookmarks</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
