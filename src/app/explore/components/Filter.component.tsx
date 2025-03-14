"use client";
import React, { useEffect, useState } from "react";
import { useLazyGetAllCategoriesQuery } from "@/services/slices/category.slice";
import { CategoriesProps } from "@/app/upcoming-events/components/EventCard.component";
import { useLazyGetSearchedEventsQuery } from "@/services/slices/events.slice";

export default function Filter() {
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | "">("");
  const [selectedPrice, setSelectedPrice] = useState<string | "">("");
  const [selectedDate, setSelectedDate] = useState<string | "">("");
  const [formatedSelectedDate, setFormatedSelectedDate] = useState<
    string | { start: string; end: string } | null
  >("");

  const [getAllCategories] = useLazyGetAllCategoriesQuery();
  const [getSearchedEvents] = useLazyGetSearchedEventsQuery();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getAllCategories("").unwrap();
      if (response && response.message === "SUCCESSFUL" && response.body) {
        setCategories(response.body);
      }
    };
    fetchCategories();
  }, [getAllCategories]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPrice(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const getDateFromLabel = (label: string) => {
      const today = new Date();

      switch (label.toLowerCase()) {
        case "today":
          return today.toISOString().split("T")[0];

        case "tomorrow":
          return new Date(today.setDate(today.getDate() + 1))
            .toISOString()
            .split("T")[0];

        case "this week": {
          const startOfWeek = new Date(
            today.setDate(today.getDate() - today.getDay() + 1),
          ); // Monday
          const endOfWeek = new Date(today.setDate(today.getDate() + 5)); // Sunday
          return {
            start: startOfWeek.toISOString().split("T")[0],
            end: endOfWeek.toISOString().split("T")[0],
          };
        }

        case "this weekend": {
          const saturday = new Date(
            today.setDate(today.getDate() - today.getDay() + 6),
          ); // Saturday
          const sunday = new Date(today.setDate(today.getDate() + 1)); // Sunday
          return {
            start: saturday.toISOString().split("T")[0],
            end: sunday.toISOString().split("T")[0],
          };
        }

        default:
          return null;
      }
    };

    const selectedLabel = event.target.value;
    const dateData = getDateFromLabel(selectedLabel);

    setSelectedDate(selectedLabel);
    setFormatedSelectedDate(dateData);
  };

  const handleFilter = async () => {
    const filterEvent = await getSearchedEvents({
      category: selectedCategory,
      date: formatedSelectedDate,
      price: selectedPrice,
    });

    console.log(filterEvent);
  };

  return (
    <>
      {/* Hamburger Menu */}
      <button
        className="md:hidden fixed top-0 left-0 w-full h-[60px] bg-[#1C2A36] z-50 flex items-center px-4 shadow-lg"
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
        className={`fixed top-0 left-0 h-full bg-[#1C2A36] w-full md:w-auto transform transition-transform duration-300 ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:max-h-[1400px] p-4 rounded-2xl z-40  overflow-y-auto scrollbar-hide`}
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
                value="free"
                checked={selectedPrice === "free"}
                onChange={handlePriceChange}
                className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]"
              />
              <label htmlFor="free" className="text-[10px]">
                Free
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="paid"
                name="paid"
                value="paid"
                checked={selectedPrice === "paid"}
                onChange={handlePriceChange}
                className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]"
              />
              <label htmlFor="paid" className="text-[10px]">
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
            {["Today", "Tomorrow", "This Week", "This Weekend"].map((label) => (
              <div className="flex items-center space-x-2" key={label}>
                <input
                  type="checkbox"
                  id={label.toLowerCase().replace(" ", "_")}
                  name={label.toLowerCase()}
                  value={label.toLowerCase()}
                  checked={selectedDate === label.toLowerCase()}
                  onChange={handleDateChange}
                  className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]"
                />
                <label
                  htmlFor={label.toLowerCase().replace(" ", "_")}
                  className="text-[10px]"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-6" />

        <div>
          <h3 className="font-semibold text-[24px] mb-4">Category</h3>
          <div className="flex flex-col space-y-4">
            {/* Category Options */}
            {categories.map((category) => (
              <div className="flex items-center space-x-2" key={category.id}>
                <input
                  type="checkbox"
                  name={category.name}
                  value={category.name}
                  checked={selectedCategory === category.name}
                  onChange={handleCategoryChange}
                  className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]"
                />
                <label htmlFor={category.name} className="text-[10px]">
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <button
            className="bg-[#9EDD45] text-white px-4 py-2 rounded-md"
            onClick={handleFilter}
          >
            Apply Filters
          </button>
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
