import React, { useState } from 'react';

const CountryImportForm: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Please select a country and an option below to import country
        </h2>
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            id="country"
            className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Select country</option>
            {/* Add your list of countries here */}
          </select>
        </div>
        <div className="space-y-2 mb-6">
          <label className="flex items-center">
            <input
              type="radio"
              name="importOption"
              value="countryOnly"
              checked={selectedOption === 'countryOnly'}
              onChange={handleOptionChange}
              className="text-blue-600 focus:ring-blue-500 border-gray-300"
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
              className="text-blue-600 focus:ring-blue-500 border-gray-300"
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
              className="text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Import country, states and cities</span>
          </label>
        </div>
        <button className="w-full py-2 px-4 text-white bg-blue-900 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Import
        </button>
      </div>
    </div>
  );
};

export default CountryImportForm;
