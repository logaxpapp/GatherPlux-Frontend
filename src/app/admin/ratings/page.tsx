"use client";

import React, { useState } from "react";
import { FaTrashAlt, FaStar } from "react-icons/fa";

const Ratings = () => {
  const [ratingsData, setRatingsData] = useState([
    { name: "John Doe", rating: 5, comment: "Excellent service!" },
    { name: "Jane Smith", rating: 4, comment: "Very good experience." },
    { name: "Alice Johnson", rating: 3, comment: "Good service, but could be improved." },
    { name: "Bob Lee", rating: 5, comment: "Loved it! Will definitely come again." },
    { name: "Charlie Brown", rating: 2, comment: "The experience was okay, but there were issues." },
    { name: "Emily Davis", rating: 4, comment: "Overall good, but some minor issues." },
     
    { name: "Grace Taylor", rating: 4, comment: "Great service, would recommend to others!" },
    { name: "Henry Harris", rating: 3, comment: "Not bad, but there's room for improvement." },
    { name: "Isabella Clark", rating: 5, comment: "Fantastic experience, highly recommend!" },
  ]);
  

  const handleDeleteRating = (index: number) => {
    setRatingsData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={`text-${i < rating ? 'yellow' : 'gray'}-400`} />
    ));
  };

  return (
    <div className="flex h-screen bg-[#1f2937] text-white">
      <div className="w-full mx-auto flex h-full">
        <main className="flex-1 p-10 bg-[#020e1e] pr-10">
          <header className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Ratings</h2>
            <button className="bg-gray-100 py-1 px-4 rounded-full border border-gray-300 text-sm text-[#011c39]">
              + Add Rating
            </button>
          </header>

          <section className="border border-gray-500 rounded-lg">
            <table className="min-w-full">
              <thead className="bg-[#2d3748]">
                <tr className="text-left">
                  <th className="p-3 text-base font-normal rounded-tl-lg">
                    Name
                  </th>
                  <th className="p-3 text-base font-normal">Rating</th>
                  <th className="p-3 text-base font-normal">Comments</th>
                  <th className="p-3 text-base font-normal rounded-tr-lg"></th>
                </tr>
              </thead>

              <tbody>
                {ratingsData.map((rating, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-500 ${
                      index === ratingsData.length - 1
                        ? "border-b-0 rounded-bl-lg rounded-br-lg"
                        : ""
                    } hover:bg-gray-600`}
                  >
                    <td className="p-3">{rating.name}</td>
                    <td className="p-3 flex">{renderStars(rating.rating)}</td>
                    <td className="p-3">{rating.comment}</td>
                    <td className="p-3 flex justify-between items-center">
                      <button
                        onClick={() => handleDeleteRating(index)}
                        className="bg-red-100 text-red-600 px-4 py-1 text-sm rounded-full flex items-center space-x-2 font-medium"
                      >
                        <span>Delete</span>
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Ratings;
