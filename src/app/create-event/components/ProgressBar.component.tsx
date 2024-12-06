interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar = ({ currentStep }: ProgressBarProps) => {
  return (
    <div className="flex px-24 my-10">
      <div className="flex flex-col items-center w-full">
        <div className="relative w-full max-w-lg flex items-center">
          <div className={`w-full h-1 ${currentStep >= 1 ? 'bg-gray-400' : 'bg-[#2E353E]'} rounded-full`}></div>
          <div
            className="absolute left-1/2 -translate-x-1/2 h-5 w-5 bg-gray-200 border border-gray-400 rounded-full flex items-center justify-center top-[-8px]"
          >
            {/* Inner circle (optional for styling) */}
            <div className="h-3 w-3 bg-[#D7D5EA] rounded-full"></div>
          </div>
        </div>
        {/* Text below slider */}
        <div className="mt-4 text-white font-medium text-lg">Edit</div>
      </div>

      <div className="flex flex-col items-center w-full ml-[-4px]">
        <div className="relative w-full max-w-lg flex items-center">
          <div className={`w-full h-1 ${currentStep >= 2 ? 'bg-gray-400' : 'bg-[#2E353E]'} rounded-full`}></div>
          <div
            className={`absolute left-1/2 -translate-x-1/2 h-5 w-5  ${currentStep >= 2 ? 'bg-gray-200 border-gray-400' : 'border-gray-200 bg-gray-400'} border  rounded-full flex items-center justify-center top-[-8px]`}
          >
            {/* Inner circle (optional for styling) */}
            <div className="h-3 w-3 bg-[#D7D5EA] rounded-full"></div>
          </div>
        </div>
        {/* Text below slider */}
        <div className="mt-4 text-white font-medium text-lg">Banner</div>
      </div>

      <div className="flex flex-col items-center w-full ml-[-4px]">
        <div className="relative w-full max-w-lg flex items-center">
          <div className={`w-full h-1 ${currentStep >= 3 ? 'bg-gray-400' : 'bg-[#2E353E]'} rounded-full`}></div>
          <div
            className={`absolute left-1/2 -translate-x-1/2 h-5 w-5  ${currentStep >= 3 ? 'bg-gray-200 border-gray-400' : 'border-gray-200 bg-gray-400'} border  rounded-full flex items-center justify-center top-[-8px]`}
          >
            {/* Inner circle (optional for styling) */}
            <div className="h-3 w-3 bg-[#D7D5EA] rounded-full"></div>
          </div>
        </div>
        {/* Text below slider */}
        <div className="mt-4 text-white font-medium text-lg">Ticketing</div>
      </div>

      <div className="flex flex-col items-center w-full ml-[-4px]">
        <div className="relative w-full max-w-lg flex items-center">
          <div className={`w-full h-1 ${currentStep === 4 ? 'bg-gray-400' : 'bg-[#2E353E]'} rounded-full`}></div>
          <div
            className={`absolute left-1/2 -translate-x-1/2 h-5 w-5  ${currentStep === 4 ? 'bg-gray-200 border-gray-400' : 'border-gray-200 bg-gray-400'} border  rounded-full flex items-center justify-center top-[-8px]`}
          >
            {/* Inner circle (optional for styling) */}
            <div className="h-3 w-3 bg-[#D7D5EA] rounded-full"></div>
          </div>
        </div>
        {/* Text below slider */}
        <div className="mt-4 text-white font-medium text-lg">Review</div>
      </div>
    </div>
  );
};

export default ProgressBar;
