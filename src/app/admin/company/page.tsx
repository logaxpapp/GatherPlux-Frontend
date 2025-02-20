"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaTrashAlt, FaChevronDown } from "react-icons/fa";
import DeleteAdmin from "@/components/modal/Admins-delete-admins";

const Dash1 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<string | null>(null);

  const handleDelete = (adminName: string) => {
    setSelectedAdmin(adminName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null);
  };

  const confirmDelete = () => {
    // Perform the delete action here, then close the modal
    console.log(`${selectedAdmin} has been deleted.`);
    closeModal();
  };

  return (
    <div className="flex h-screen">
      {/* Page Wrapper for max width */}
      <div className="w-full mx-auto flex h-full">
        {/* Main Content */}
        <main className="flex-1 p-10 bg-[#020e1e] pr-10">
          <header className="flex justify-end mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="flex items-center justify-center w-10 h-10 rounded-md border border-[#243447]">
                  <i className="fas fa-envelope text-[#93d437]"></i>
                </button>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#93d437] rounded-full border border-[#243447]"></span>
              </div>
              <div className="relative">
                <button className="flex items-center justify-center w-10 h-10 rounded-md border border-[#243447]">
                  <i className="fas fa-bell text-[#93d437]"></i>
                </button>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#93d437] rounded-full border border-white"></span>
              </div>
              <div className="flex items-center space-x-2 rounded-md border border-[#243447] px-1 py-1">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                  alt="avatar"
                  width={16} 
                  height={16} 
                  className="w-7 h-7 rounded-full border border-[#243447]"
                />
                <div className="flex items-center">
                  <span className="text-[#93d437] font-medium">Emmanuel</span>
                  <i className="fas fa-chevron-down ml-1 text-[#93d437] text-xs pl-1"></i>
                </div>
              </div>
            </div>
          </header>

          <section className="border border-[#243447] rounded-lg">
            <div className="flex justify-between items-center bg-[#243447] pt-5 pb-3">
              <h2 className="text-xl font-bold text-[#eef0ec] pl-16">
                Companies
              </h2>
            </div>

            <table className="min-w-full bg-[#020e1e] border-b border-[#243447] rounded-t">
              <thead className="bg-[#243447] border-b border-[#42435c]">
                <tr className="text-left">
                  <th className="p-3">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 bg-[#243447] border-[#93d437]"
                    />
                  </th>
                  <th className="p-3 text-base font-normal text-[#f1f3ed]">
                    Name
                  </th>
                  <th className="p-3 text-base font-normal text-[#e2e6de]">
                    Country
                  </th>
                  <th className="p-3 text-base font-normal text-[#ebeee6]">
                    Status
                  </th>
                  <th className="p-3 text-base font-normal text-[#ebeee6]">
                    Subscription
                  </th>
                  <th className="p-3 text-base font-normal text-[#edf0e9]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {adminData.map((admin, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#243447] hover:bg-[#243447]"
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 bg-[#243447] border-[#93d437]"
                      />
                    </td>
                    <td className="p-3 font-semibold text-[#eaeee4]">
                      {admin.firstName} {admin.lastName}
                    </td>
                    <td className="p-3 text-[#93d437]">Canada</td>
                    <td className="p-3">
                      <button className="flex items-center bg-[#93d437] text-[#020e1e] px-2 py-1 text-sm rounded-full font-semibold">
                        Active <FaChevronDown className="ml-2" size={10} />
                      </button>
                    </td>
                    <td className="p-3 text-[#93d437]">Premium</td>
                    <td className="p-3">
                      <button
                        className="flex items-center bg-red-100 text-red-600 px-4 py-1 text-sm rounded-full"
                        onClick={() => handleDelete(`${admin.firstName} ${admin.lastName}`)}
                      >
                        Delete <FaTrashAlt className="ml-2" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-2 px-4 py-5">
              <button className="flex items-center space-x-2 px-4 py-2 border border-[#243447] text-[#93d437] rounded">
                <Image
                  src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/qmlzu1grmezavovfsbkc"
                  alt="Previous Arrow"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-3">
                <button className="w-10 h-10 flex items-center justify-center rounded-md bg-[#243447] text-[#93d437]">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center text-[#93d437]">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center text-[#93d437]">
                  3
                </button>
                <span className="pt-1 text-[#93d437]">...</span>
                <button className="w-10 h-10 flex items-center justify-center text-[#93d437]">
                  8
                </button>
                <button className="w-10 h-10 flex items-center justify-center text-[#93d437]">
                  10
                </button>
              </div>

              <button className="flex items-center space-x-2 px-4 py-2 border border-[#243447] text-[#93d437] rounded">
                <span>Next</span>
                <Image
                  src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/mku2phev17abdh4kdpfk"
                  alt="Next Arrow"
                  width={16}
                  height={16}
                  className="w-4 h-4 ml-2"
                />
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* Delete Modal */}
      {isModalOpen && (
        <DeleteAdmin
          onClose={closeModal}
          onDelete={confirmDelete}
          adminName={selectedAdmin || ""} adminId={0}        />
      )}
    </div>
  );
};

// Mock admin data
const adminData = [
  { firstName: "Emmanuel", lastName: "Ujah", email: "ujahemmanuel72@gmail.com" },
  { firstName: "Emmanuel", lastName: "Ujah", email: "ujahemmanuel72@gmail.com" },
  { firstName: "Emmanuel", lastName: "Ujah", email: "ujahemmanuel72@gmail.com" },
];

export default Dash1;
