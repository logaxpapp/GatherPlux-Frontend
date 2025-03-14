"use strict";
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useLazyGetAllCategoriesQuery } from "@/services/slices/category.slice";
import { CategoriesProps } from "../upcoming-events/components/EventCard.component";
import { useRouter } from "next/navigation";

const Hero: React.FC = () => {
  const router = useRouter();

  const [sparkles, setSparkles] = useState<
    {
      top: string;
      left: string;
      animationDelay: string;
      animationDuration: string;
    }[]
  >([]);

  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [dropdownCategories, setDropdownCategories] = useState<boolean>(false);

  const [getAllCategories] = useLazyGetAllCategoriesQuery();

  useEffect(() => {
    setSparkles(
      Array.from({ length: 50 }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 2 + 1}s`,
      })),
    );
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getAllCategories("").unwrap();
      if (response && response.message === "SUCCESSFUL" && response.body) {
        setCategories(response.body);
      }
    };
    fetchCategories();
  }, [getAllCategories]);

  const handleSearchBarChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    router.push(`/explore?query=${event.target.value}`);
  };

  const handleCategoryClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const category = event.currentTarget.value;
    if (category) {
      router.push(`/explore?query=${category}`);
    }
  };

  const handleSearchBarFocus = () => {
    setDropdownCategories(true);
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center text-white sparkle-background min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `
          linear-gradient(
            to bottom,
            rgba(3, 13, 30, 0.8) 78%,
            rgba(7, 72, 61, 0.7) 100%,
            rgba(3, 15, 31, 0.7) 100%,
            rgba(0, 0, 0, 0.9) 100%,
            rgba(0, 0, 0, 0) 10%
          ),
          url('https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/hqttomr2qy90ybsnknzn')`,
      }}
    >
      {/* Sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {sparkles.map((sparkle, index) => (
          <div key={index} className="sparkle" style={sparkle} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl">
        <h1 className="font-menseal text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 whitespace-normal">
          Discover Your Next Event Adventure,
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #9ada43, #4c9e10, #b6d80e)",
            }}
          >
            with Instant Booking.
          </span>
        </h1>

        <p className="text-base sm:text-lg mb-8 font-thin">
          Find events nearby, personalize your experience, and book in seconds!
        </p>

        {/* Marketplace */}
        <div className="flex items-center bg-[#253f3f] rounded-full px-2 sm:px-4 py-2 sm:py-4 shadow-md w-full sm:w-auto space-x-2 sm:space-x-4 max-w-2xl mx-auto text-white">
          <div className="flex items-center space-x-2 flex-grow">
            <Image
              src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/ngr4snr3hzu2lxjlzcbx"
              alt="Search Icon"
              width={14} // Reduced size for smaller screens
              height={14}
            />
            <input
              type="text"
              placeholder="Search Events, Categories, Location..."
              onChange={handleSearchBarChange}
              onFocus={handleSearchBarFocus}
              className="flex-grow outline-none bg-transparent text-xs sm:text-base text-[#ffffff] placeholder-gray-300"
            />
          </div>
        </div>

        {dropdownCategories && (
          <div className="flex justify-center gap-4 flex-wrap mt-8">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  value={category.name}
                  onClick={handleCategoryClick}
                  className={`px-8 py-2 rounded-full text-sm font-semibold border border-gray-800 hover:bg-gray-700 hover:text-white bg-[#9edd45] text-black`}
                >
                  {category.name}
                </button>
              ))
            ) : (
              <div>No categories available</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
