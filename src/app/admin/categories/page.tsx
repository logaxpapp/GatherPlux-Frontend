"use strict";
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaPencilAlt } from "react-icons/fa";
import { useGetAllAdminCategoriesQuery } from "@/services/slices/admin.slice";
import NewCategoryModal from "@/components/modal/NewCategory";

export type EventCategory = {
  name: string;
  description: string;
  archived?: boolean;
};

// Delete Confirmation Modal
interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: (category: EventCategory) => void;
  category: EventCategory | null;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onDelete,
  category,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white text-black rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-4">
          Are you sure you want to delete the category{" "}
          <span className="font-semibold">{category?.name}</span>?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (category) {
                onDelete(category);
                onClose();
              }
            }}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const EventCategories = () => {
  const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<EventCategory | null>(null);

  const { data: eventCategoriesAPIData } = useGetAllAdminCategoriesQuery("");

  useEffect(() => {
    if (
      eventCategoriesAPIData &&
      eventCategoriesAPIData.code === 200 &&
      eventCategoriesAPIData.body
    ) {
      setEventCategories(eventCategoriesAPIData.body);
    }
  }, [eventCategoriesAPIData]);

  const handleSaveCategory = (newCategory: EventCategory) => {
    setEventCategories([...eventCategories, newCategory]);
    setModalOpen(false);
  };

  const handleDeleteCategory = (categoryToDelete: EventCategory) => {
    setEventCategories(
      eventCategories.filter((cat) => cat.name !== categoryToDelete.name),
    );
  };

  return (
    <div className="flex h-screen bg-[#020e1e] text-white">
      <div className="w-full mx-auto flex h-full">
        <main className="flex-1 p-10">
          <header className="flex justify-end mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  type="button"
                  title=""
                  className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-500"
                >
                  <i className="fas fa-envelope text-white"></i>
                </button>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
              </div>
              <div className="relative">
                <button
                  type="button"
                  title=""
                  className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-500"
                >
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
                {eventCategories.map((category, index) => (
                  <tr
                    key={index}
                    className={`${
                      index === eventCategories.length - 1
                        ? "border-gray-600"
                        : "border-b border-gray-600"
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
                    <td className="p-3">{category.archived}</td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
                          setDeleteModalOpen(true);
                        }}
                        className="text-sm px-3 py-1 bg-red-600 rounded-full hover:bg-red-700"
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

      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDeleteCategory}
        category={selectedCategory}
      />
    </div>
  );
};

export default EventCategories;
