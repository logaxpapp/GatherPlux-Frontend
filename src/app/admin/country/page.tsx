"use client";

import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import UpdateCountryForm from "@/components/modal/UpdateCountryForm";
import CountryImportForm from "@/components/modal/CountryImportForm";
import NewCountryForm from "@/components/modal/NewCountryForm";

type Country = {
  code: string;
  name: string;
  currency: string;
  states: number;
};

const Countries = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isNewCountryModalOpen, setIsNewCountryModalOpen] = useState(false);
  const [countryToDelete, setCountryToDelete] = useState<Country | null>(null);
  const [countryToEdit, setCountryToEdit] = useState<Country | null>(null);

  const openEditModal = (country: Country) => {
    setCountryToEdit(country);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setCountryToEdit(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (country: Country) => {
    setCountryToDelete(country);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setCountryToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const openImportModal = () => setIsImportModalOpen(true);
  const closeImportModal = () => setIsImportModalOpen(false);

  const openNewCountryModal = () => setIsNewCountryModalOpen(true);
  const closeNewCountryModal = () => setIsNewCountryModalOpen(false);

  const deleteCountry = () => {
    console.log("Deleted country:", countryToDelete);
    closeDeleteModal();
  };

  const countryData: Country[] = [
    { code: "NG", name: "Nigeria", currency: "Naira", states: 36 },
    { code: "US", name: "United States", currency: "Dollar", states: 50 },
    { code: "CA", name: "Canada", currency: "Canadian Dollar", states: 13 },
  ];

  return (
    <div className="flex h-screen bg-[#020e1e]">
      <div className="w-full max-w-8xl mx-auto flex h-full">
        <main className="flex-1 p-10 bg-[#020e1e] pr-10 text-white">
          <section className="border border-[#243447] rounded-lg mt-16">
            <div className="flex justify-between p-5">
              <div className="flex items-center space-x-2 border border-[#243447] bg-[#020e1e] p-2 rounded-md">
                <i className="fas fa-search text-[#93d437]"></i>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-80 focus:outline-none bg-transparent text-white"
                />
              </div>

              <div className="flex space-x-4 items-center">
                <button
                  className="border border-[#93d437] text-[#93d437] px-4 py-2 rounded-md flex items-center space-x-2"
                  onClick={openImportModal}
                >
                  <span className="border border-[#93d437] rounded-full w-6 h-6 flex items-center justify-center">+</span>
                  <span>Import Country</span>
                </button>
                <button
                  className="border border-[#93d437] text-[#93d437] px-4 py-2 rounded-md flex items-center space-x-2"
                  onClick={openNewCountryModal}
                >
                  <span className="border border-[#93d437] rounded-full w-6 h-6 flex items-center justify-center">+</span>
                  <span>New Country</span>
                </button>
              </div>
            </div>

            <table className="min-w-full border-b border-[#243447]">
              <thead className="bg-[#243447] border-b border-[#243447]">
                <tr className="text-left text-white">
                  <th className="p-3 text-base font-normal flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Code
                  </th>
                  <th className="p-3 text-base font-normal">Name</th>
                  <th className="p-3 text-base font-normal">Currency</th>
                  <th className="p-3 text-base font-normal">States</th>
                  <th className="p-3 text-base font-normal">Details</th>
                  <th className="p-3 text-base font-normal">Edit</th>
                  <th className="p-3 text-base font-normal">Delete</th>
                </tr>
              </thead>

              <tbody>
                {countryData.map((country, index) => (
                  <tr key={index} className="border-b border-[#243447] hover:bg-[#93d437]">
                    <td className="p-3 flex items-center">
                      <input type="checkbox" className="mr-2" />
                      {country.code}
                    </td>
                    <td className="p-3">{country.name}</td>
                    <td className="p-3">{country.currency}</td>
                    <td className="p-3">{country.states}</td>
                    <td className="p-3">
                      <button className="flex items-center bg-[#243447] text-[#93d437] px-4 py-1 text-sm rounded-full">
                        View
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => openEditModal(country)}
                        className="flex items-center bg-[#93d437] text-[#020e1e] px-4 py-1 text-sm rounded-full"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        className="flex items-center bg-[#243447] text-red-500 px-4 py-1 text-sm rounded-full"
                        onClick={() => openDeleteModal(country)}
                      >
                        Delete <FaTrashAlt className="ml-2" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>

      {isEditModalOpen && countryToEdit && (
        <UpdateCountryForm country={countryToEdit} onClose={closeEditModal} />
      )}

      {isDeleteModalOpen && countryToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg text-black w-96">
            <h2 className="text-xl mb-4">
              Are you sure you want to delete {countryToDelete?.name}?
            </h2>
            <div className="flex justify-end space-x-3">
              <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={closeDeleteModal}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md" onClick={deleteCountry}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {isImportModalOpen && <CountryImportForm onClose={closeImportModal} />}

      {isNewCountryModalOpen && <NewCountryForm onClose={closeNewCountryModal} />}
    </div>
  );
};

export default Countries;
