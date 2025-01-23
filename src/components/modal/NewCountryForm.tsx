import React, { useState } from "react";

const NewCountryForm: React.FC = () => {
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [currency, setCurrency] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [currencySymbols, setCurrencySymbols] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ country, name, code, currency, currencyCode, currencySymbols });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            New Country
          </h2>
          <button className="text-gray-500 hover:text-gray-700">
            &#10005;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Country Dropdown */}
          <div>
            <label className="block text-gray-700">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select country</option>
              {/* Add more country options as needed */}
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              {/* Add other countries */}
            </select>
          </div>
          {/* Name and Code */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700">Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          {/* Currency and Currency Code */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Currency</label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700">Currency Code</label>
              <input
                type="text"
                value={currencyCode}
                onChange={(e) => setCurrencyCode(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          {/* Currency Symbols */}
          <div>
            <label className="block text-gray-700">Currency Symbols</label>
            <input
              type="text"
              value={currencySymbols}
              onChange={(e) => setCurrencySymbols(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-blue-900 text-white p-3 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewCountryForm;
