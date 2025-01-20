'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaTrashAlt } from 'react-icons/fa';
import NewAdminForm from '@/components/modal/Admins-new-admin';
import DeleteAdmin from '@/components/modal/Admins-delete-admins';
import { useGetAllAdminsQuery } from '@/services/slices/admin.slice';

// Define the User type
interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

const Admins = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const { data: adminsAPIData } = useGetAllAdminsQuery('');

  useEffect(() => {
    if (
      adminsAPIData &&
      adminsAPIData.code === 200 &&
      adminsAPIData.body &&
      adminsAPIData.body.records
    ) {
      setUserData(adminsAPIData.body.records);
    }
  }, [adminsAPIData]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenDeleteModal = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setUserToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      setUserData((prevData) =>
        prevData.filter((user) => user.email !== userToDelete.email),
      );
    }
    handleCloseDeleteModal();
  };

  return (
    <div className='flex h-screen bg-[#1f2937] text-white'>
      <div className='w-full mx-auto flex h-full'>
        <main className='flex-1 p-10 bg-[#020e1e] pr-10'>
          <header className='flex justify-end mb-6'>
            <div className='flex items-center space-x-4'>
              <div className='relative'>
                <button
                  type='button'
                  title={''}
                  className='flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-[#020e1e] text-white'
                >
                  <i className='fas fa-envelope'></i>
                </button>
                <span className='absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white'></span>
              </div>
              <div className='relative'>
                <button
                  type='button'
                  title={''}
                  className='flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-[#020e1e] text-white'
                >
                  <i className='fas fa-bell'></i>
                </button>
                <span className='absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white'></span>
              </div>
              <div className='flex items-center space-x-2 rounded-md border border-gray-300 px-1 py-1 bg-[#020e1e] text-white'>
                <div className='w-7 h-7 rounded-full border border-gray-300 overflow-hidden'>
                  <Image
                    src='/avatar.jpg'
                    alt='avatar'
                    width={28}
                    height={28}
                  />
                </div>
                <div className='flex items-center'>
                  <span className='font-medium'>Emmanuel</span>
                  <i className='fas fa-chevron-down ml-1 text-xs pl-1'></i>
                </div>
              </div>
            </div>
          </header>

          <section className='border rounded-lg border-gray-500'>
            <div className='flex justify-between items-center bg-[#020e1e] pt-5 pb-3'>
              <h2 className='text-xl font-bold pl-16'>Admins</h2>
              <button
                type='button'
                onClick={handleOpenModal}
                className='mr-5 bg-gray-100 py-1 px-4 rounded-full border border-gray-300 text-sm text-[#011c39]'
              >
                + New Admin
              </button>
            </div>

            <table className='min-w-full border-b border-gray-500 rounded-t'>
              <thead className='bg-[#2d3748] border-b border-gray-500'>
                <tr className='text-left'>
                  <th className='pl-3 pr-1 text-base font-normal'>
                    {''}
                    <input type='checkbox' title={''} />
                  </th>
                  <th className='p-3 text-base font-normal'>First Name</th>
                  <th className='p-3 text-base font-normal'>Last Name</th>
                  <th className='p-3 text-base font-normal'>Email</th>
                  <th className='p-3 text-base font-normal'></th>
                </tr>
              </thead>

              <tbody>
                {userData.map((user) => (
                  <tr
                    key={user.id}
                    className='border-b border-gray-500 hover:bg-gray-600'
                  >
                    <td className='pl-3 pr-1'>
                      <input type='checkbox' title={''} />
                    </td>
                    <td className='p-3'>{user.firstname}</td>
                    <td className='p-3'>{user.lastname}</td>
                    <td className='p-3'>{user.email}</td>
                    <td className='p-3 flex justify-between items-center'>
                      <button
                        type='button'
                        title={''}
                        onClick={() => handleOpenDeleteModal(user)}
                        className='bg-red-100 text-red-600 px-4 py-1 text-sm rounded-full flex items-center space-x-2 font-medium'
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

      {/* Modals */}
      {isModalOpen && <NewAdminForm onClose={handleCloseModal} />}
      {isDeleteModalOpen && userToDelete && (
        <DeleteAdmin
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteUser}
          adminName={`${userToDelete.firstname} ${userToDelete.lastname}`}
          adminId={userToDelete.id}
        />
      )}
    </div>
  );
};

export default Admins;
