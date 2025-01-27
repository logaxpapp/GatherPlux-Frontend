import Image from 'next/image';
import React from 'react';

const DeletionConfirmation: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center relative">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          ✕
        </button>
        <Image
          src="/checkmark.png"
          alt="Checkmark"
          className="mx-auto mb-4 w-16 h-16"
        />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Deleted!</h2>
        <p className="text-gray-500 mb-6">
          You have successfully deleted Canada and all its states and cities
        </p>
        <button className="w-full py-2 px-4 text-white bg-blue-900 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Continue
        </button>
      </div>
    </div>
  );
};

export default DeletionConfirmation;
