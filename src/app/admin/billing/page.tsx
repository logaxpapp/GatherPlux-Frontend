"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPencilAlt } from "react-icons/fa";
import NewSubscriptionPlanForm from "@/components/modal/NewSubscriptionPlanForm";

const Countries = () => {
  const [isNewPlanModalOpen, setIsNewPlanModalOpen] = useState(false);

  const openNewPlanModal = () => setIsNewPlanModalOpen(true);
  const closeNewPlanModal = () => setIsNewPlanModalOpen(false);

  // Mock subscription data
  const subscriptionData = [
    {
      name: "Alands Island",
      starter: "Not set",
      standard: "Not set",
      premium: "Not set",
    },
    {
      name: "Canada",
      starter: "Not set",
      standard: "Not set",
      premium: "Not set",
    },
    {
      name: "Algeria",
      starter: "Not set",
      standard: "Not set",
      premium: "Not set",
    },
    {
      name: "Cameroun",
      starter: "Not set",
      standard: "Not set",
      premium: "Not set",
    },
    {
      name: "Nigeria",
      starter: "Not set",
      standard: "Not set",
      premium: "Not set",
    },
    {
      name: "United States",
      starter: "Not set",
      standard: "Not set",
      premium: "Not set",
    },
  ];

  return (
    <div className="flex h-screen bg-[#020e1e] text-white">
      <div className="w-full mx-auto flex h-full">
        <main className="flex-1 p-10 pr-10">
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
                    src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/zjkll3ygcuph3xf3cm2m"
                    alt="avatar"
                    width={28}
                    height={28}
                  />
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Emmanuel</span>
                  <i className="fas fa-chevron-down ml-1 text-xs pl-1"></i>
                </div>
              </div>
            </div>
          </header>

          <section className="border border-gray-600 rounded-lg">
            <div className="flex justify-between items-center bg-[#1a2938] pt-5 pb-3 px-16">
              <h2 className="text-xl font-bold">Subscription Plan</h2>
              <button
                onClick={openNewPlanModal}
                className="flex items-center px-4 py-2 bg-[#243447] text-white rounded-lg shadow-sm hover:bg-[#1f2d3b]"
              >
                <div className="flex items-center justify-center w-6 h-6 border border-gray-400 rounded-full mr-2">
                  <span className="text-white">+</span>
                </div>
                New Plan
              </button>
            </div>
            <table className="min-w-full bg-[#243447] rounded-t">
              <thead>
                <tr>
                  <th className="p-3 text-base font-normal bg-[#1f2d3b] text-left">
                    Plans
                  </th>
                  <th className="p-3 text-base font-normal bg-[#93d437] text-left">
                    Prices
                  </th>
                  <th
                    className="p-3 text-base font-normal bg-[#55677a] text-left"
                    colSpan={2}
                  ></th>
                </tr>
                <tr className="text-left bg-[#1a2938] border-b border-gray-600">
                  <th className="p-3 text-base font-normal flex items-center">
                    <input type="checkbox" className="mr-2" /> Name
                  </th>
                  <th className="p-3 text-base font-normal">Starter</th>
                  <th className="p-3 text-base font-normal">Standard</th>
                  <th className="p-3 text-base font-normal">Premium</th>
                </tr>
              </thead>
              <tbody>
                {subscriptionData.map((country, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-600 hover:bg-gray-700"
                  >
                    <td className="p-3 flex items-center">
                      <input type="checkbox" className="mr-2" />
                      {country.name}
                    </td>
                    <td className="p-3">
                      {country.starter === "Not set" ? (
                        <span className="inline-flex items-center">
                          {country.starter}
                          <FaPencilAlt className="ml-2 w-4 h-4 text-gray-500" />
                        </span>
                      ) : (
                        <span>{country.starter}</span>
                      )}
                    </td>
                    <td className="p-3">
                      {country.standard === "Not set" ? (
                        <span className="inline-flex items-center">
                          {country.standard}
                          <FaPencilAlt className="ml-2 w-4 h-4 text-gray-500" />
                        </span>
                      ) : (
                        <span>{country.standard}</span>
                      )}
                    </td>
                    <td className="p-3">
                      {country.premium === "Not set" ? (
                        <span className="inline-flex items-center">
                          {country.premium}
                          <FaPencilAlt className="ml-2 w-4 h-4 text-gray-500" />
                        </span>
                      ) : (
                        <span>{country.premium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>

      {isNewPlanModalOpen && (
        <NewSubscriptionPlanForm onClose={closeNewPlanModal} />
      )}
    </div>
  );
};

export default Countries;
