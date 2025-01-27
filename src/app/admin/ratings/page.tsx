"use client";

import React, { useState } from "react";
import { FaTrashAlt, FaStar } from "react-icons/fa";

type Rating = {
  name: string;
  rating: number;
  comment: string;
};

const Ratings = () => {
  const [ratingsData, setRatingsData] = useState<Rating[]>([
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

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleAddRating = (newRating: Rating) => {
    setRatingsData((prevData) => [...prevData, newRating]);
    setAddModalOpen(false);
  };

  const handleDeleteRating = () => {
    setRatingsData((prevData) =>
      prevData.filter((_, index) => index !== selectedRating)
    );
    setDeleteModalOpen(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={`text-${i < rating ? "yellow" : "gray"}-400`} />
    ));
  };

  return (
    <div className="flex h-screen bg-[#1f2937] text-white">
      <div className="w-full mx-auto flex h-full">
        <main className="flex-1 p-10 bg-[#020e1e] pr-10">
          <header className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Ratings</h2>
            <button
              className="bg-gray-100 py-1 px-4 rounded-full border border-gray-300 text-sm text-[#011c39]"
              onClick={() => setAddModalOpen(true)}
            >
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
                        onClick={() => {
                          setSelectedRating(index);
                          setDeleteModalOpen(true);
                        }}
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

   {/* Add Rating Modal */}
{isAddModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white text-black p-6 rounded-lg w-96">
      <h2 className="text-lg font-bold mb-4">Add New Rating</h2>
      
      {/* Add Rating Form */}
      {/* Add Rating Form */}
<form
  onSubmit={(e) => {
    e.preventDefault();

    // Cast e.target to HTMLFormElement
    const form = e.target as HTMLFormElement;

    const newRating: Rating = {
      name: (form.name as unknown as HTMLInputElement).value,
      rating: Number((form.rating as HTMLInputElement).value),
      comment: (form.comment as HTMLTextAreaElement).value,
    };

    handleAddRating(newRating);
  }}
>
  <div className="mb-4">
    <label htmlFor="name" className="block font-medium mb-2">
      Name
    </label>
    <input
      id="name"
      name="name"
      type="text"
      required
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      placeholder="Enter your name"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="rating" className="block font-medium mb-2">
      Rating
    </label>
    <div className="flex space-x-2">
      {Array.from({ length: 5 }, (_, i) => (
        <label key={i} className="cursor-pointer">
          <input
            type="radio"
            name="rating"
            value={i + 1}
            required
            className="hidden"
          />
          <FaStar
            className={`text-gray-400 hover:text-yellow-500 ${i + 1 <= 5 ? "hover:text-yellow-500" : ""}`}
          />
        </label>
      ))}
    </div>
  </div>

  <div className="mb-4">
    <label htmlFor="comment" className="block font-medium mb-2">
      Comments
    </label>
    <textarea
      id="comment"
      name="comment"
     
      required
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      placeholder="Write your comments here"
    ></textarea>
  </div>

  <div className="flex justify-end space-x-4">
    <button
      type="button"
      className="bg-gray-300 text-black px-4 py-2 rounded"
      onClick={() => setAddModalOpen(false)}
    >
      Cancel
    </button>
    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Add Rating
    </button>
  </div>
</form>

    </div>
  </div>
)}


      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete this rating?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleDeleteRating}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ratings;
