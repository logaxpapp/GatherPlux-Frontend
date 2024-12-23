import React from "react";

  

 
import { FaArrowLeft, FaArrowRight, FaTrashAlt } from 'react-icons/fa';

  
const Countries = () => {
  return (
    <div className="flex h-screen bg-[#020e1e]">
      {/* Page Wrapper for max width */}
      <div className="w-full max-w-8xl mx-auto flex h-full">
        {/* Main Content */}
        <main className="flex-1 p-10 bg-[#020e1e] pr-10 text-white">
          {/* Countries Section */}
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
                <button className="border border-[#93d437] text-[#93d437] px-4 py-2 rounded-md flex items-center space-x-2">
                  <span className="border border-[#93d437] rounded-full w-6 h-6 flex items-center justify-center">
                    +
                  </span>
                  <span>Import Country</span>
                </button>
                <button className="border border-[#93d437] text-[#93d437] px-4 py-2 rounded-md flex items-center space-x-2">
                  <span className="border border-[#93d437] rounded-full w-6 h-6 flex items-center justify-center">
                    +
                  </span>
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
                  <tr
                    key={index}
                    className="border-b border-[#243447] hover:bg-[#93d437]"
                  >
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
                      <button className="flex items-center bg-[#93d437] text-[#020e1e] px-4 py-1 text-sm rounded-full">
                        Edit
                      </button>
                    </td>
                    <td className="p-3">
                      <button className="flex items-center bg-[#243447] text-red-500 px-4 py-1 text-sm rounded-full">
                        Delete <FaTrashAlt className="ml-2" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-2 px-4 py-5 text-white">
              <button className="flex items-center space-x-2 px-4 py-2 border border-[#243447] text-[#93d437] rounded">
                <FaArrowLeft className="text-xl" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-3">
                <button className="w-10 h-10 flex items-center justify-center rounded-md bg-[#93d437] text-[#020e1e]">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center text-[#93d437]">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center text-[#93d437]">
                  3
                </button>
                <span className="pt-1">...</span>
                <button className="w-10 h-10 flex items-center justify-center text-[#93d437]">
                  8
                </button>
                <button className="w-10 h-10 flex items-center justify-center text-[#93d437]">
                  10
                </button>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-[#243447] text-[#93d437] rounded">
                <span>Next</span>
                <FaArrowRight className="text-xl" />
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

// Mock country data
const countryData = [
  { code: "NG", name: "Nigeria", currency: "Naira", states: 36 },
  { code: "US", name: "United States", currency: "Dollar", states: 50 },
  { code: "CA", name: "Canada", currency: "Canadian Dollar", states: 13 },
  { code: "NG", name: "Nigeria", currency: "Naira", states: 36 },
  { code: "US", name: "United States", currency: "Dollar", states: 50 },
  { code: "CA", name: "Canada", currency: "Canadian Dollar", states: 13 },
];

export default Countries;