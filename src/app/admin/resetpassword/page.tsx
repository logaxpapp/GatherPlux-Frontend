import React from 'react';

const PasswordResetForm: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#020e1e]text-white pb-64">
      <div className="bg-[#374151] p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Password reset</h2>
          <button className="text-gray-400 hover:text-gray-200">
            &#x2715;
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium" htmlFor="oldPassword">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              className="mt-1 p-2 w-full border border-gray-500 rounded-md bg-[#4b5563] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Old Password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="mt-1 p-2 w-full border border-gray-500 rounded-md bg-[#4b5563] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="New Password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 w-full border border-gray-500 rounded-md bg-[#4b5563] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-[#020e1e] text-white rounded-md hover:bg-[#173357] focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Change password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetForm;
