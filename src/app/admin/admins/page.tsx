"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import NewCategoryModal from "@/components/modal/NewCategory";
import DeleteAdmin from "@/components/modal/Admins-delete-admins";

const EventCategories = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categories, setCategories] = useState(eventCategories);
  const [selectedCategory, setSelectedCategory] = useState<{ name: string; description: string; status: string } | null>(null);


  const handleSaveCategory = (newCategory: { name: string; description: string; status: string }) => {
    setCategories([...categories, newCategory]);
  };

  const handleDeleteCategory = (categoryToDelete: { name: string; description: string; status: string } | null) => {
    setCategories(categories.filter((category) => category !== categoryToDelete));
  };

  return (
    <div className="flex h-screen bg-[#020e1e] text-white">
      <div className="w-full mx-auto flex h-full">
        <main className="flex-1 p-10">
          <header className="flex justify-end mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-500">
                  <i className="fas fa-envelope text-white"></i>
                </button>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
              </div>
              <div className="relative">
                <button className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-500">
                  <i className="fas fa-bell text-white"></i>
                </button>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
              </div>
              <div className="flex items-center space-x-2 rounded-md border border-gray-500 px-1 py-1">
                <div className="w-7 h-7 rounded-full border border-gray-300 overflow-hidden">
                  <Image
                    src="/avatar.jpg"
                    alt="avatar"
                    width={50}
                    height={50}
                    className="w-full h-full"
                  />
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Emmanuel</span>
                  <i className="fas fa-chevron-down ml-1 text-xs pl-1"></i>
                </div>
              </div>
            </div>
          </header>

          <section className="rounded-lg overflow-hidden border border-gray-600">
            <div className="flex justify-between items-center py-5 px-6">
              <h2 className="text-xl font-bold">Event Categories</h2>
              <button
                className="flex items-center px-4 py-2 bg-[#243447] text-white rounded-lg shadow-sm hover:bg-[#1f2d3b]"
                onClick={() => setModalOpen(true)}
              >
                <div className="flex items-center justify-center w-6 h-6 border border-gray-400 rounded-full mr-2">
                  <span className="text-white">+</span>
                </div>
                New Category
              </button>
            </div>
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-left bg-[#1a2938] border-b border-gray-600">
                  <th className="p-3 text-base font-normal">Category Name</th>
                  <th className="p-3 text-base font-normal">Description</th>
                  <th className="p-3 text-base font-normal">Status</th>
                  <th className="p-3 text-base font-normal">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr
                    key={index}
                    className={`${
                      index === categories.length - 1 ? "border-gray-600" : "border-b border-gray-600"
                    } hover:bg-gray-700`}
                  >
                    <td className="p-3">{category.name}</td>
                    <td className="p-3">
                      {category.description === "Not set" ? (
                        <span className="inline-flex items-center">
                          {category.description}
                          <FaPencilAlt className="ml-2 w-4 h-4 text-gray-500" />
                        </span>
                      ) : (
                        <span>{category.description}</span>
                      )}
                    </td>
                    <td className="p-3">{category.status}</td>
                    <td className="p-3">
                      <button
                        className="text-sm px-3 py-1 bg-red-600 rounded-full hover:bg-red-700"
                        onClick={() => {
                          setSelectedCategory(category);
                          setDeleteModalOpen(true);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>

      <NewCategoryModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveCategory}
      />

      {isDeleteModalOpen && (
        <DeleteAdmin
          onClose={() => setDeleteModalOpen(false)}
          onDelete={() => {
            handleDeleteCategory(selectedCategory);
            setDeleteModalOpen(false);
          }}
          itemName={selectedCategory?.name || ""}
        />
      )}
    </div>
  );
};

// Mock data for event categories
const eventCategories = [
  { name: "Music", description: "Concerts and live shows", status: "Active" },
  { name: "Sports", description: "Live matches and tournaments", status: "Active" },
  { name: "Workshops", description: "Educational and hands-on events", status: "Active" },
  { name: "Conferences", description: "Business and professional events", status: "Inactive" },
  { name: "Festivals", description: "Cultural and seasonal events", status: "Active" },
  { name: "Networking", description: "Meetups and social events", status: "Inactive" },
];

export default EventCategories;
