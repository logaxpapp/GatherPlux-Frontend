import React, { useState } from "react";

const UpdatePlanForm: React.FC = () => {
  const [name, setName] = useState("Starter");
  const [freePeriod, setFreePeriod] = useState("3");
  const [description, setDescription] = useState(
    "For basic appointment booking and management"
  );
  const [exitOnSave, setExitOnSave] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, freePeriod, description, exitOnSave });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Update Plan
          </h2>
          <button className="text-gray-500 hover:text-gray-700">
            &#10005;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-gray-700">Free period (months)</label>
            <input
              type="number"
              value={freePeriod}
              onChange={(e) => setFreePeriod(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={3}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={exitOnSave}
              onChange={(e) => setExitOnSave(e.target.checked)}
              className="h-4 w-4 border-gray-300 rounded"
            />
            <label className="ml-2 text-gray-700">Exit on save</label>
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

export default UpdatePlanForm;
