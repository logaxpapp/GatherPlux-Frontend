import React from 'react';

interface EventBannerProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
}

const EventBanner: React.FC<EventBannerProps> = ({
  fileInputRef,
  handleFileChange,
  selectedFile,
}) => {
  return (
    <div className=' sm:px-20 sm:w-6/12 mb-36 '>
      <h1 className='text-[32px] font-normal mb-4'>Upload Image</h1>

      {/* Input container */}
      <div
        className='w-full border rounded px-10 py-2 '
        style={{ backgroundColor: '#1b2634', borderColor: '#434b57' }}
      >
        <input
          type='file'
          title={''}
          placeholder={''}
          ref={fileInputRef}
          onChange={handleFileChange}
          accept='.jpg,.jpeg,.gif,.png'
          className='hidden'
          id='file-upload'
        />
        <div className='flex items-center gap-2'>
          {/* Choose file button */}
          <button
            type='button'
            onClick={() => fileInputRef.current?.click()}
            className='p-2 bg-[#9EDD45]   rounded text-sm font-normal text-[#000] hover:bg-[#9EDD45]'
          >
            Choose File
          </button>
          {/* Display selected file */}
          <span className='text-sm  text-gray-300'>
            {selectedFile ? selectedFile.name : 'No file chosen'}
          </span>
        </div>
      </div>

      {/* Information text */}
      <div className='mt-4 space-y-1'>
        <p className='text-sm text-gray-300'>
          Feature Image must be at least 1170 pixels wide by 504 pixels high.
        </p>
        <p className='text-sm text-gray-300'>
          Valid file formats: JPG, GIF, PNG.
        </p>
      </div>
    </div>
  );
};

export default EventBanner;
