'use client';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaTrashAlt } from 'react-icons/fa';
import { useGetAllAdminCountryQuery } from '@/services/slices/admin.slice';

type Country = {
  code2: string;
  name: string;
  currency: string;
  region: string;
};

const Countries = () => {
  const [countryData, setCountryData] = useState<Country[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countryToDelete, setCountryToDelete] = useState<Country | null>(null);

  const { data: countryAPIData } = useGetAllAdminCountryQuery(currentPage);

  useEffect(() => {
    if (
      countryAPIData &&
      countryAPIData.code === 200 &&
      countryAPIData.body &&
      countryAPIData.body.records
    ) {
      setCountryData(countryAPIData.body.records);
      setTotalPages(countryAPIData.body.totalPages);
      setCurrentPage(countryAPIData.body.currentPage);
    }
  }, [countryAPIData]);

  const openModal = (country: Country) => {
    setCountryToDelete(country);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCountryToDelete(null);
  };

  const deleteCountry = () => {
    // Logic for deleting the country from your data
    console.log('Deleted country: ', countryToDelete);
    closeModal(); // Close modal after deletion
  };

  const handlePageChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    if (name === 'previous') {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='flex h-screen bg-[#020e1e]'>
      <div className='w-full max-w-8xl mx-auto flex h-full'>
        <main className='flex-1 p-10 bg-[#020e1e] pr-10 text-white'>
          <section className='border border-[#243447] rounded-lg mt-16'>
            <div className='flex justify-between p-5'>
              <div className='flex items-center space-x-2 border border-[#243447] bg-[#020e1e] p-2 rounded-md'>
                <i className='fas fa-search text-[#93d437]'></i>
                <input
                  type='text'
                  placeholder='Search...'
                  className='w-80 focus:outline-none bg-transparent text-white'
                />
              </div>

              <div className='flex space-x-4 items-center'>
                <button className='border border-[#93d437] text-[#93d437] px-4 py-2 rounded-md flex items-center space-x-2'>
                  <span className='border border-[#93d437] rounded-full w-6 h-6 flex items-center justify-center'>
                    +
                  </span>
                  <span>Import Country</span>
                </button>
                <button
                  type='button'
                  className='border border-[#93d437] text-[#93d437] px-4 py-2 rounded-md flex items-center space-x-2'
                >
                  <span className='border border-[#93d437] rounded-full w-6 h-6 flex items-center justify-center'>
                    +
                  </span>
                  <span>New Country</span>
                </button>
              </div>
            </div>

            <table className='min-w-full border-b border-[#243447]'>
              <thead className='bg-[#243447] border-b border-[#243447]'>
                <tr className='text-left text-white'>
                  <th className='p-3 text-base font-normal flex items-center'>
                    <input type='checkbox' className='mr-2' title={''} />
                    Code
                  </th>
                  <th className='p-3 text-base font-normal'>Name</th>
                  <th className='p-3 text-base font-normal'>Currency</th>
                  <th className='p-3 text-base font-normal'>States</th>
                  <th className='p-3 text-base font-normal'>Details</th>
                  <th className='p-3 text-base font-normal'>Edit</th>
                  <th className='p-3 text-base font-normal'>Delete</th>
                </tr>
              </thead>

              <tbody>
                {countryData.map((country, index) => (
                  <tr
                    key={index}
                    className='border-b border-[#243447] hover:bg-[#93d437]'
                  >
                    <td className='p-3 flex items-center'>
                      <input type='checkbox' className='mr-2' title={''} />
                      {country.code2}
                    </td>
                    <td className='p-3'>{country.name}</td>
                    <td className='p-3'>{country.currency}</td>
                    <td className='p-3'>{country.region}</td>
                    <td className='p-3'>
                      <button
                        type='button'
                        className='flex items-center bg-[#243447] text-[#93d437] px-4 py-1 text-sm rounded-full'
                      >
                        View
                      </button>
                    </td>
                    <td className='p-3'>
                      <button
                        type='button'
                        className='flex items-center bg-[#93d437] text-[#020e1e] px-4 py-1 text-sm rounded-full'
                      >
                        Edit
                      </button>
                    </td>
                    <td className='p-3'>
                      <button
                        type='button'
                        className='flex items-center bg-[#243447] text-red-500 px-4 py-1 text-sm rounded-full'
                        onClick={() => openModal(country)} // Open modal on click
                      >
                        Delete <FaTrashAlt className='ml-2' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className='flex justify-between items-center mt-2 px-4 py-5 text-white'>
              <button
                type='button'
                name='previous'
                onClick={handlePageChange}
                disabled={currentPage === 0}
                className='flex items-center space-x-2 px-4 py-2 border border-[#243447] text-[#93d437] rounded'
              >
                <FaArrowLeft className='text-xl' />
                <span>Previous</span>
              </button>
              <span>
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                type='button'
                name='next'
                onClick={handlePageChange}
                disabled={currentPage === totalPages - 1}
                className='flex items-center space-x-2 px-4 py-2 border border-[#243447] text-[#93d437] rounded'
              >
                <span>Next</span>
                <FaArrowRight className='text-xl' />
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* Modal for confirmation */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-5 rounded-lg text-black w-96'>
            <h2 className='text-xl mb-4'>
              Are you sure you want to delete {countryToDelete?.name}?
            </h2>
            <div className='flex justify-end space-x-3'>
              <button
                type='button'
                className='px-4 py-2 bg-gray-300 rounded-md'
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type='button'
                className='px-4 py-2 bg-red-600 text-white rounded-md'
                onClick={deleteCountry}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Countries;
