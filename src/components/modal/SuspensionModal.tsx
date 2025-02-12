import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface SuspensionModalProps {
  onClose: () => void;
  onSubmit: (reason: string, description: string) => void;
  eventName?: string;
}

const SuspensionModal: React.FC<SuspensionModalProps> = ({
  onClose,
  onSubmit,
  eventName,
}) => {
  const [reason, setReason] = useState("Violation of Companies Guideline");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onSubmit(reason, description);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg max-w-md w-full p-6 relative border border-primary-500">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-primary-500 hover:text-primary-500"
          onClick={onClose}
          aria-label="Close Modal"
        >
          <FaTimes size={24} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">
          Reason for Suspending {eventName}
        </h2>

        {/* Reason Dropdown */}
        <label className="block text-sm mb-2">Reason for Suspension</label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option>Violation of Companies Guideline</option>
          <option>Spam Activity</option>
          <option>Inappropriate Behavior</option>
        </select>

        {/* Description Textarea */}
        <label className="block text-sm mt-4 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-32 bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-1  focus:ring-primary-500"
          placeholder="Describe why this account is suspended"
        ></textarea>

        {/* Submit Button */}
        <button
          className="w-full mt-5 bg-primary-500 text-gray-900 font-semibold py-3 rounded-lg hover:bg-primary-500 transition"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SuspensionModal;
