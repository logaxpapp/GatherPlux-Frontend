import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useDeleteAdminMutation } from '@/services/slices/admin.slice';

interface DeleteAdminProps {
  onClose: () => void;
  onDelete: () => void;
  adminName: string;
  adminId: number;
}

const DeleteAdmin: React.FC<DeleteAdminProps> = ({
  onClose,
  onDelete,
  adminName,
  adminId,
}) => {
  const [deleteAdmin] = useDeleteAdminMutation();

  const handleDeleteAdmin = async () => {
    const response = await deleteAdmin(adminId);
    if (response && response.data && response.data.code === 200) {
      onDelete();
    }
    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center relative'>
        {/* Close Button */}
        <button
          type='button'
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'
          aria-label='Close Modal'
        >
          ✕
        </button>

        {/* Icon */}
        <div className='flex justify-center mb-4 text-red-500'>
          <FaTrashAlt className='w-6 h-6' />
        </div>

        {/* Title */}
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>Delete Admin?</h2>

        {/* Message */}
        <p className='text-gray-500 mb-6'>
          {adminName
            ? `${adminName} will be permanently deleted.`
            : 'This admin will be permanently deleted.'}
        </p>

        {/* Actions */}
        <div className='flex justify-center space-x-4'>
          <button
            type='button'
            onClick={onClose}
            className='py-2 px-6 border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-100 focus:outline-none'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={handleDeleteAdmin}
            className='py-2 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAdmin;
