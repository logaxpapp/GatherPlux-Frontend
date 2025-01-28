'use client';

import DeleteAdmin from "@/components/modal/Admins-delete-admins";
import { useEffect, useState } from 'react';
import { FaTrashAlt, FaSearch } from 'react-icons/fa';
import { useGetAllUsersQuery } from '@/services/slices/admin.slice';

type User = {
  id: number; // assuming there is an id field
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  city: string;
};

const Countries = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const { data: usersAPIData } = useGetAllUsersQuery(currentPage);

  useEffect(() => {
    if (
      usersAPIData &&
      usersAPIData.code === 200 &&
      usersAPIData.body &&
      usersAPIData.body.records
    ) {
      setUserData(usersAPIData.body.records);
      setTotalPages(usersAPIData.body.totalPages);
      setCurrentPage(usersAPIData.body.currentPage);
    }
  }, [usersAPIData]);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const filteredUsers = userData.filter(
    (user) =>
      user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='flex h-screen'>
      <div className='w-full mx-auto flex h-full'>
        <main className='flex-1 p-10'>
          {/* Search */}
          <div className='mb-6 flex justify-center'>
            <div className='relative w-1/2'>
              <input
                type='text'
                placeholder='Search users...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full p-2 pl-10 bg-[#1e2a38] text-white border border-gray-500 rounded-md'
                aria-label='Search users'
              />
              <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            </div>
          </div>

          {/* Users Table */}
          <section className='border-[0.5px] border-[#455870] rounded-lg bg-[#0e1925] text-white'>
            <div className='flex justify-between items-center p-4'>
              <h2 className='text-xl font-bold'>Users</h2>
            </div>

            <table className='min-w-full rounded-t'>
              <thead>
                <tr>
                  <th className='p-3 bg-[#2c3e50]'>Firstname</th>
                  <th className='p-3 bg-[#2c3e50]'>Lastname</th>
                  <th className='p-3 bg-[#2c3e50]'>Email</th>
                  <th className='p-3 bg-[#2c3e50]'>Phone</th>
                  <th className='p-3 bg-[#2c3e50]'>City</th>
                  <th className='p-3 bg-[#2c3e50]'>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={index}
                    className='border-b border-[#34495e] hover:bg-[#2c3e50]'
                  >
                    <td className='p-3'>{user.firstname}</td>
                    <td className='p-3'>{user.lastname}</td>
                    <td className='p-3'>{user.email}</td>
                    <td className='p-3'>{user.phone}</td>
                    <td className='p-3'>{user.city}</td>
                    <td className='p-3'>
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className='bg-[#f44336] text-white px-4 py-1 rounded-full flex items-center space-x-2'
                      >
                        <FaTrashAlt />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className='flex justify-between items-center mt-4 px-4 py-5'>
              <button
                type='button'
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className='px-4 py-2 border border-gray-500 rounded text-white'
              >
                Previous
              </button>
              <button
                type='button'
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className='px-4 py-2 border border-gray-500 rounded text-white'
              >
                Next
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* Delete Modal */}
      {isModalOpen && userToDelete && (
        <DeleteAdmin
          adminName={`${userToDelete.firstname} ${userToDelete.lastname}`}
          adminId={userToDelete.id} // use the id or email or any unique field
          onClose={handleModalClose}
          onDelete={() => {
            console.log(`Deleting user: ${userToDelete.firstname}`);
            handleModalClose();
          }}
        />
      )}
    </div>
  );
};

export default Countries;
