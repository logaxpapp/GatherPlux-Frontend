import React, { useState } from "react";

// Define the props for the component
interface NewSubscriptionPlanFormProps {
  onClose: () => void;
}

const NewSubscriptionPlanForm: React.FC<NewSubscriptionPlanFormProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [freePeriod, setFreePeriod] = useState("");
  const [description, setDescription] = useState("");
  const [exitOnSave, setExitOnSave] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, freePeriod, description, exitOnSave });

    // Optionally close the modal after save
    if (exitOnSave) {
      onClose(); // Close the modal if 'Exit on save' is checked
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-gray-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            New Subscription Plan
          </h2>
          <button
            onClick={onClose} // Close the modal when clicked
            className="text-gray-500 hover:text-gray-700"
          >
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
              className="w-full p-2 border rounded-lg
              focus:ring-1 focus:ring-primary-500   focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700">Free period (months)</label>
            <input
              type="text"
              value={freePeriod}
              onChange={(e) => setFreePeriod(e.target.value)}
              className="w-full p-2 border rounded-lg  
              focus:ring-1 focus:ring-primary-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-lg 
              focus:ring-1 focus:ring-primary-500  focus:outline-none h-28 resize-none"
            ></textarea>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={exitOnSave}
              onChange={() => setExitOnSave(!exitOnSave)}
              className="h-5 w-5 text-zinc-900 border-gray-300 rounded"
            />
            <label className="ml-2 text-gray-700">Exit on save</label>
          </div>
          <button
            type="submit"
            className="w-full bg-[#93d437] text-white p-3 rounded-lg font-semibold hover:bg-green-500 transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewSubscriptionPlanForm;
