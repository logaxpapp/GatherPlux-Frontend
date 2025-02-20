import { useState } from "react";
import { FaLock } from "react-icons/fa"; // Import the padlock icon
import FeedbackModal from "./feedbackModal"; // Import the modal component
import Image from "next/image";

const OrderSummary: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  return (
    <>
      {/* Order Summary Section */}
      <div className="max-w-md mx-auto bg-[#1b2634] text-white rounded-lg shadow-lg border border-[#89E101] p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b border-[#474e58] pb-2">
          <h2 className="text-lg font-semibold">Order Summary</h2>
        </div>

        {/* Ticket Images */}
        <div className="space-y-2 bg-[#020e1e] -mx-4 px-4 py-2">
          <Image
            src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/hcq7v4hy6hlztcq7wkcj"
            alt="Standard Ticket"
            width={400}
            height={150}
            className="rounded-md mx-auto"
          />
          <Image
            src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/hcq7v4hy6hlztcq7wkcj"
            alt="VIP Ticket"
            width={400}
            height={150}
            className="rounded-md mx-auto"
          />
          <Image
            src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/hcq7v4hy6hlztcq7wkcj"
            alt="VIP Ticket"
            width={400}
            height={150}
            className="rounded-md mx-auto"
          />
        </div>

        {/* Total Section */}
        <div className="mt-4 px-4 text-sm">
          <div className="flex justify-between pb-2">
            <span>Sub Total:</span>
            <span>₦2,000,300.00</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-[#474e58]">
            <span>Tax:</span>
            <span>₦201,211.80</span>
          </div>
          <div className="flex justify-between font-semibold text-base mt-2">
            <span>Order Total:</span>
            <span className="text-[#89E101]">₦2,201,511.80</span>
          </div>
        </div>

        {/* Pay Now Button */}
        <button
          onClick={() => setIsModalOpen(true)} // Open the modal
          className="w-full mt-4 bg-[#9edd45] text-black font-semibold py-2 rounded-md text-center hover:bg-[#7AC801] inline-flex items-center justify-center gap-2"
        >
          <FaLock /> {/* Padlock Icon */}
          Pay Now
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="max-w-md w-full bg-[#1b2634] text-white rounded-lg shadow-lg border border-[#89E101] p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b border-[#474e58] pb-2">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <button
                onClick={() => setIsModalOpen(false)} // Close the modal
                className="text-2xl text-[#89E101] hover:text-red-500"
              >
                &times;
              </button>
            </div>

            {/* Ticket Images */}
            <div className="space-y-2 bg-[#020e1e] -mx-4 px-4 py-2">
              <Image
                src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/hcq7v4hy6hlztcq7wkcj"
                alt="Standard Ticket"
                width={400}
                height={150}
                className="rounded-md mx-auto"
              />
              <Image
                src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/hcq7v4hy6hlztcq7wkcj"
                alt="VIP Ticket"
                width={400}
                height={150}
                className="rounded-md mx-auto"
              />
              <Image
                src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/hcq7v4hy6hlztcq7wkcj"
                alt="VIP Ticket"
                width={400}
                height={150}
                className="rounded-md mx-auto"
              />
            </div>

            {/* Total Section */}
            <div className="mt-4 px-4 text-sm">
              <div className="flex justify-between pb-2">
                <span>Sub Total:</span>
                <span>₦2,000,300.00</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#474e58]">
                <span>Tax:</span>
                <span>₦201,211.80</span>
              </div>
              <div className="flex justify-between font-semibold text-base mt-2">
                <span>Order Total:</span>
                <span className="text-[#89E101]">₦2,201,511.80</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default OrderSummary;
