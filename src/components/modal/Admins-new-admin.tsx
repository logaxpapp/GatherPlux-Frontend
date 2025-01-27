import React from 'react';
import { useCreateAdminMutation } from '@/services/slices/admin.slice';

interface NewAdminFormProps {
  open: boolean;
  onClose: () => void;
}

const NewAdminForm: React.FC<NewAdminFormProps> = ({ onClose }) => {
  const [createAdmin] = useCreateAdminMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = e.currentTarget.form as HTMLFormElement;
    const formData = new FormData(form);
    const adminDetails = {
      firstname: formData.get('firstName') as string,
      lastname: formData.get('lastName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    // Validation
    if (
      adminDetails.email === '' ||
      adminDetails.password === '' ||
      adminDetails.firstname === '' ||
      adminDetails.lastname === '' ||
      !adminDetails.email.includes('@') ||
      !adminDetails.email.includes('.')
    ) {
      alert('Please fill all fields correctly.');
      return;
    }

    // Create Admin API Call
    const response = await createAdmin(adminDetails);
    if (response && response.data && response.data.code === 200) {
      alert('Admin created successfully!');
      onClose(); // Close the modal after success
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-96 z-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">New Admin</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            &#x2715; {/* Unicode for "X" */}
          </button>
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="firstName"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="mt-1 p-2 w-full border border-gray-300 text-black rounded-md focus:outline-none"
                placeholder="First name"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="lastName"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="mt-1 p-2 w-full border border-gray-300 text-black rounded-md focus:outline-none"
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border border-gray-300 text-black rounded-md focus:outline-none"
                placeholder="Email"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border border-gray-300 text-black rounded-md focus:outline-none"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-[#A6D361FF] focus:outline-none"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAdminForm;
