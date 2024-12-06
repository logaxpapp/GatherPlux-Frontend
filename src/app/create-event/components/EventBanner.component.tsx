import React from 'react';

interface EventBannerProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
}

const EventBanner: React.FC<EventBannerProps> = ({ fileInputRef, handleFileChange, selectedFile }) => {
  return (
    <div className="px-20 w-6/12">
      <h1 className="text-[32px] font-normal mb-4">Upload Image</h1>

      <div className="w-full border border-gray-300 rounded px-4 py-2">
        <input
          type="file"
          title={''}
          placeholder={''}
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.gif,.png"
          className="hidden"
          id="file-upload"
        />
        <div className="flex items-center gap-2">
          <button
            type='button'
            onClick={() => fileInputRef.current?.click()}
            className="p-2 bg-gray-100 border border-gray-300 rounded text-sm font-normal text-[#000] hover:text-[#fff] hover:bg-[#9EDD45]"
          >
            Choose File
          </button>
          <span className="text-sm">
            {selectedFile ? selectedFile.name : 'No file chosen'}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-1 ">
        <p className="text-sm">
          Feature Image must be at least 1170 pixels wide by 504 pixels high.
        </p>
        <p className="text-sm">
          Valid file formats: JPG, GIF, PNG.
        </p>
      </div>
    </div>
  );
};

export default EventBanner;