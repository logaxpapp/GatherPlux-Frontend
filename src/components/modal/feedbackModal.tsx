import Image from "next/image";
import { useState } from "react";

interface FeedbackModalProps {
  isOpen: boolean; // Boolean to control modal visibility
  onClose: () => void; // Function to handle modal closure
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState<string>("");
  const [sliderValue, setSliderValue] = useState<number>(3);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50  ">
<div className="bg-gray-900 text-white rounded-lg w-full max-w-md overflow-hidden border border-[#9edd45]">
  {/* Header */}
  <div className="bg-[#1b2634] w-full border-b border-gray-600">
    <div className="flex justify-between items-center p-4">
      <div className="flex items-center space-x-2">
              <Image
                src="/message-circle.png"
                alt="Message Icon"
                width={20}
                height={20}
                className="h-6 w-6"
              />
              <h2 className="text-xl font-semibold">Feedback</h2>
            </div>
            <button
              onClick={onClose}
              className="text-4xl text-[#9edd45] hover:text-gray-200 transition"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-2 text-center">
            How was your experience?
          </h3>
          <p className="text-gray-400 mb-4 text-center text-base">
            Your input is valuable in helping us better understand your needs
            and tailor our service accordingly.
          </p>
{/* Emojis */}
<div className="flex justify-between mb-4 text-4xl relative">
  {[
    { label: "angry", emoji: "😡", value: 1 },
    { label: "frustrated", emoji: "😤", value: 2 },
    { label: "neutral", emoji: "🤔", value: 3 },
    { label: "happy", emoji: "😊", value: 4 },
    { label: "excited", emoji: "🤩", value: 5 },
  ].map(({ label, emoji, value }) => (
    <div className="flex flex-col items-center" key={label}>
      <span
        role="img"
        aria-label={label}
        style={{
          filter: sliderValue === value ? "none" : "grayscale(1)",
          opacity: sliderValue === value ? 1 : 0.5,
          transition: "all 0.3s ease",
        }}
      >
        {emoji}
      </span>
      {/* Line below emoji */}
      <div className="w-[1px] h-4 bg-gray-400 mt-2"></div>
    </div>
  ))}
</div>

          {/* Slider */}
<input
  type="range"
  min="1"
  max="5"
  value={sliderValue}
  onChange={(e) => setSliderValue(Number(e.target.value))}
  className="w-full h-3 rounded-lg appearance-none outline-none"
  style={{
    background: `linear-gradient(to right, #ff0600,#ffcc01, #90f500  ${
      ((sliderValue - 1) / 4) * 100
    }%, #37414d ${(sliderValue - 1) / 4}% 100%)`,
  }}
/>

          {/* Text Area */}
          <p className="pt-4 text-sm text-gray-300">Tell us About your Expereience</p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Type something ..."
            className="w-full bg-gray-800 text-gray-300 rounded-lg mt-4 p-3 outline-none border border-[#37414d] "
            rows={3}
          ></textarea>
        </div>

        {/* Footer */}
        <div className="bg-[#1b2634] w-full">
          <div className="flex justify-between items-center p-4">
            <button
              onClick={onClose}
              className="hover:bg-gray-600 text-white py-2 px-8 rounded-md transition border border-[#37414d]"
            >
              Dismiss
            </button>
            <button
              onClick={() => alert("Feedback sent!")}
              className="bg-[#9edd45] text-[#020e1e] px-16 rounded-md transition font-semibold py-2 text-lg"
            >
              Send Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
