import React, { useState } from 'react';

const CountryImportForm: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true); // Track modal visibility

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal when the X button is clicked
  };

  if (!isModalOpen) return null; // Don't render the modal if it's closed

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-opacity-50 fixed inset-0 z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full transform transition-all duration-300 ease-in-out scale-100 opacity-100">
        <button
          aria-label="Close Modal"
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">
          Please select a country and an option below to import country
        </h2>
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            id="country"
            className="block w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 "
          >
            <option>Select country</option>
            {/* Add your list of countries here */}
          </select>
        </div>
        <div className="space-y-4 mb-6">
          <label className="flex items-center">
            <input
              type="radio"
              name="importOption"
              value="countryOnly"
              checked={selectedOption === 'countryOnly'}
              onChange={handleOptionChange}
              className="text-primary-500 focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Import country only</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="importOption"
              value="countryAndStates"
              checked={selectedOption === 'countryAndStates'}
              onChange={handleOptionChange}
              className="text-primary-500 focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Import country and states only</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="importOption"
              value="countryStatesAndCities"
              checked={selectedOption === 'countryStatesAndCities'}
              onChange={handleOptionChange}
              className="text-primary-500  focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Import country, states and cities</span>
          </label>
        </div>
        <button className="w-full py-3 px-4 text-white bg-primary-500 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-300 ease-in-out">
          Import
        </button>
      </div>
    </div>
  );
};

export default CountryImportForm;
