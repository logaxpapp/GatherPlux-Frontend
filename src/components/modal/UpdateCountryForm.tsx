/* eslint-disable @typescript-eslint/no-unused-vars */
import { Country } from "@/app/admin/country/page";
import React, { useState, useEffect } from "react";

// Define the types for the props
type UpdateCountryFormProps = {
  country: Country | null; // The country name to display in the form
  onClose: () => void; // Callback to close the modal
};

const UpdateCountryForm: React.FC<UpdateCountryFormProps> = ({ country, onClose }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [currency, setCurrency] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [currencySymbols, setCurrencySymbols] = useState("");

  // Prepopulate fields if country is provided
  useEffect(() => {
    if (country) {
      setName(country.name); // Example: Set the name based on the country
      setCode("ExampleCode");
      setCurrency("ExampleCurrency");
      setCurrencyCode("EXC");
      setCurrencySymbols("$");
    }
  }, [country]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code || !currency || !currencyCode || !currencySymbols) {
      alert("Please fill out all fields.");
      return;
    }
    console.log({ country, name, code, currency, currencyCode, currencySymbols });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center text-gray-900">Update Country</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            &#10005;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Country</label>
            <select
              value={country?.code2 || ""}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled
            >
              <option value={country?.code2 || ""}>{country?.name || "Select a country"}</option>
            </select>
          </div>
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
          <div>
            <label className="block text-gray-700">Currency Symbols</label>
            <input
              type="text"
              value={currencySymbols}
              onChange={(e) => setCurrencySymbols(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 text-white p-3 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

const CountryUpdateContainer: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // Function to open the modal with a country name
  const handleOpenModal = (country: string) => {
    setSelectedCountry(country);
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Button or action that triggers the modal */}
      <button onClick={() => handleOpenModal("USA")}>Update USA</button>

      {/* Modal component */}
      {showModal && (
        <UpdateCountryForm 
            country={{ name:'', code2:'', currency:'', region:'' }} 
            onClose={handleCloseModal} />
      )}
    </>
  );
};

export default CountryUpdateContainer;
