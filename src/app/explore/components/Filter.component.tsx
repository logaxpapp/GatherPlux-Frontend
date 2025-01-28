"use client"
import React, { useState } from "react";

export default function Filter() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <>
      {/* Hamburger Menu */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#9EDD45] p-2 rounded-full shadow-lg"
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#1C2A36] max-w-[342px] w-full md:w-auto transform transition-transform duration-300 ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:max-h-[1400px] p-4 rounded-2xl z-40`}
      >
        <h2 className="font-semibold text-[32px] my-6">Filter</h2>
        <div>
          <h3 className="font-semibold text-[24px] mb-4">Price</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="free"
                name="free"
                value="paid"
                className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]"
              />
              <label htmlFor="free" className="text-[20px]">
                Free
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="paid"
                name="paid"
                value="free"
                className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]"
              />
              <label htmlFor="paid" className="text-[20px]">
                Paid
              </label>
            </div>
          </div>
        </div>

        <hr className="my-6" />

        <div>
          <h3 className="font-semibold text-[24px] mb-4">Date</h3>
          <div className="flex flex-col space-y-4">
            {/* Date Options */}
            {["Today", "Tomorrow", "This Week", "This Weekend", "Pick a Date"].map((label) => (
              <div className="flex items-center space-x-2" key={label}>
                <input
                  type="checkbox"
                  id={label.toLowerCase().replace(" ", "_")}
                  name={label.toLowerCase()}
                  value={label.toLowerCase()}
                  className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]"
                />
                <label htmlFor={label.toLowerCase().replace(" ", "_")} className="text-[20px]">
                  {label}
                </label>
              </div>
            ))}
            <button
              type="button"
              className="bg-none text-[#9EDD45] text-[22px] self-start py-1 font-medium hover:bg-green-400"
            >
              More
            </button>
          </div>
        </div>

        <hr className="my-6" />

        <div>
          <h3 className="font-semibold text-[24px] mb-4">Category</h3>
          <div className="flex flex-col space-y-4">
            {/* Category Options */}
            {["Adventure Travel", "Art Exhibitions", "Auctions & Fundraisers", "Beer Festivals", "Benefit Concerts"].map(
              (label) => (
                <div className="flex items-center space-x-2" key={label}>
                  <input
                    type="checkbox"
                    id={label.toLowerCase().replace(/[^a-z]/g, "_")}
                    name={label.toLowerCase()}
                    value={label.toLowerCase()}
                    className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]"
                  />
                  <label htmlFor={label.toLowerCase().replace(/[^a-z]/g, "_")} className="text-[20px]">
                    {label}
                  </label>
                </div>
              )
            )}
            <button
              type="button"
              className="bg-none text-[#9EDD45] text-[22px] self-start py-1 font-medium hover:bg-green-400"
            >
              More
            </button>
          </div>
        </div>

        <hr className="my-6" />

        <div>
          <h3 className="font-semibold text-[24px] mb-4">Format</h3>
          <div className="flex flex-col space-y-4">
            {/* Format Options */}
            {[
              "Community Engagement",
              "Concert & Performances",
              "Conferences",
              "Experiential Events",
              "Festivals & Fairs",
            ].map((label) => (
              <div className="flex items-center space-x-2" key={label}>
                <input
                  type="checkbox"
                  id={label.toLowerCase().replace(/[^a-z]/g, "_")}
                  name={label.toLowerCase()}
                  value={label.toLowerCase()}
                  className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]"
                />
                <label htmlFor={label.toLowerCase().replace(/[^a-z]/g, "_")} className="text-[20px]">
                  {label}
                </label>
              </div>
            ))}
            <button
              type="button"
              className="bg-none text-[#9EDD45] text-[22px] self-start py-1 font-medium hover:bg-green-400"
            >
              More
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarVisible(false)}
        ></div>
      )}
    </>
  );
}
