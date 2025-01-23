import React, { useState } from 'react';
import CustomCalendar from '@/components/CustomCalender';
import CustomTimePicker from '@/components/CustomTimePicker';
import { CiCirclePlus, CiTrash } from 'react-icons/ci';
import { combinedStateAndCategoryProps } from '../types/types';
import { SessionsProps } from '../page';

interface EventDetailsProps {
  handleTitleAndDescriptionAndAddress: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  categories: combinedStateAndCategoryProps[];
  states: combinedStateAndCategoryProps[];
  isMultipleSession: boolean;
  sessions: SessionsProps[];
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleEventTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLocationChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleStartDateChange: (date: Date | undefined, id: string) => void;
  handleSessionTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTimeChange: (
    time: string | undefined,
    id: string | undefined,
    type: string,
  ) => void;
  handleSessionEditName: (id: string, name: string) => void;
  handleAddSession: () => void;
  handleDeleteSession: (id: string) => void;
  eventDetails: {
    type: string;
  };
}

const EventDetails: React.FC<EventDetailsProps> = ({
  handleTitleAndDescriptionAndAddress,
  categories = [],
  states = [],
  isMultipleSession,
  sessions,
  handleCategoryChange,
  handleEventTypeChange,
  handleLocationChange,
  handleStartDateChange,
  handleSessionTypeChange,
  handleTimeChange,
  handleSessionEditName,
  handleAddSession,
  handleDeleteSession,
  eventDetails,
}) => {
  const [editingId, setEditingId] = useState<string>('');
  const [sessionName, setSessionName] = useState<string>('');

  const handleSessionNameEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSessionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionName(e.target.value);
  };

  const handleSaveSessionName = () => {
    if (!sessionName) return;

    handleSessionEditName(editingId, sessionName);
    setEditingId('');
    setSessionName('');
  };

  return (
    <>
      {/* Event Details */}
      <div className="flex flex-col px-4 md:px-8 lg:px-20 w-full space-y-4 bg-[#020e1e]">
        <div className='grid  pb-2  '>
          <div className='col-span-2'></div>
          <h3 className='font-[400] text-[20px] col-span-8 '>Event Details</h3>
        </div>
        {/* Event Title */}
        <div className='mb-4'>
          <label className='block text-[15px] font-medium'>
            Event Title <span className='text-red-500 ml-1'>*</span>
          </label>
          <input
  type='text'
  placeholder='Enter the name of your event'
  name='title'
  className='h-[44px] px-4 py-2 rounded-md text-[#fff] bg-[#1b2634] border border-[#2d3744] mt-2 w-full max-w-[500px] focus:outline-none focus:ring-2 focus:ring-[#2d3744]'
  onChange={handleTitleAndDescriptionAndAddress}
/>

        </div>

     {/* Event Category */}
<div className='mb-4'>
  <label className='block text-[15px] font-medium' htmlFor='category'>
    Event Category <span className='text-red-500 ml-1'>*</span>
  </label>
  <select
    id='category'
    className='h-[44px] px-4 py-2 rounded-md text-[#fff] bg-[#1b2634] border border-[#2d3744] appearance-none mt-2 w-full max-w-[500px] focus:outline-none focus:ring-2 focus:ring-[#2d3744]'
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='gray'%3E%3Cpath fill-rule='evenodd' d='M10 12l-5-5h10l-5 5z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 10px center',
      backgroundSize: '1em',
    }}
    onChange={handleCategoryChange}
    defaultValue=''
  >
    <option value='' disabled>
      Please select one
    </option>
    {categories?.map((eachCategory) => (
      <option
        value={JSON.stringify(eachCategory)}
        key={eachCategory.id}
        className='text-[#000]'
      >
        {eachCategory.name}
      </option>
    ))}
  </select>
</div>


        {/* Event Type */}

        <div className='mb-4'>
          <label className='block text-[15px] font-medium'>
            Event Type <span className='text-red-500 ml-1'>*</span>
          </label>
          <div className='flex items-center space-x-4 mt-2 text-sm sm:text-lg'>
            <label className='flex items-center text-[#fff]'>
              <input
                type='radio'
                name='eventType'
                value='one-time'
                className='mr-2 h-4 w-4 text-[#9edd45] border-[#2d3744] focus:ring-[#9edd45]'
                onChange={handleEventTypeChange}
                defaultChecked={eventDetails.type === 'one-time'}
              />
              Single Event
            </label>
            <label className='flex items-center text-[#fff]'>
              <input
                type='radio'
                name='eventType'
                value='recurring'
                className='mr-2 h-4 w-4 text-[#9edd45] border-[#2d3744] focus:ring-[#9edd45]'
                onChange={handleEventTypeChange}
                defaultChecked={eventDetails.type === 'recurring'}
              />
              Recurring Event
            </label>
          </div>
        </div>

       {/* SESSIONS */}
<div className='pb-6 pt-12'>
  {/* Border Line */}
  <div className='border-b border-gray-700 mb-6'></div>

  {/* Session Title */}
  <h3 className='font-semibold text-[24px] mb-6'>Session(s)</h3>

  {/* Session Type */}
  <div className='mb-8'>
    <label className='block text-sm text-gray-400 mb-2'>
      Session Type <span className='text-red-500'>*</span>
    </label>
    <div className='flex items-center space-x- mt-2 text-sm sm:text-lg'>
      {/* Single Session */}
      <label className='flex items-center text-[18px] text-white text-sm   sm:text-lg pr-2 whitespace-nowrap'>
        <input
          type='radio'
          name='sessionType'
          value='single'
          className='mr-2 h-4 w-4 text-[#9edd45] border-gray-600 focus:ring-[#9edd45]'
          onChange={handleSessionTypeChange}
          defaultChecked={!isMultipleSession}
        />
        Single Session
      </label>
      {/* Multiple Session */}
      <div className='w-[200px]'>
        <label className='flex items-center text-[18px] text-white text-sm sm:text-lg whitespace-nowrap'>
          <input
            type='radio'
            name='sessionType'
            value='multiple'
            className='mr-2 h-4 w-4 text-[#9edd45] border-gray-600 focus:ring-[#9edd45]'
            onChange={handleSessionTypeChange}
            defaultChecked={isMultipleSession}
          />
          Multiple Session
        </label>
      </div>
    </div>
  </div>

  {/* Session Input Fields */}
  <div className='space-y-6'>
    {sessions.map((session: SessionsProps, index) => (
      <div key={session.id} className='grid grid-cols-12 gap-4 items-center'>
        {/* Session Name (only for multiple sessions) */}
        {isMultipleSession && (
          <div className='col-span-12 mb-2 flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              {editingId !== session.id && (
                <>
                  <h2 className='text-lg text-white font-semibold'>
                    {session.name || `Session ${index + 1}`}
                  </h2>
                  <button
                    type='button'
                    className='text-[#9edd45] border border-[#9edd45] px-2 py-1 rounded text-sm hover:bg-[#76b434] hover:text-white transition'
                    onClick={() => handleSessionNameEdit(session.id)}
                  >
                    ✏️ edit name
                  </button>
                </>
              )}
              {editingId === session.id && (
                <>
                  <input
                    type='text'
                    placeholder='Enter session name'
                    className='h-[44px] px-4 py-2 rounded-md text-[#fff] bg-[#1b2634] border border-[#2d3744] mt-2 w-[250px] focus:outline-none focus:ring-2 focus:ring-[#2d3744]'
                    onChange={handleSessionNameChange}
                  />
                  <button
                    type='button'
                    className='text-[#9edd45] border border-[#9edd45] px-2 py-1 rounded text-sm hover:bg-[#76b434] hover:text-white transition'
                    onClick={handleSaveSessionName}
                  >
                    save name
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Start Date */}
        <div className='col-span-12 sm:col-span-4'>
          <label className='block text-sm text-gray-400 mb-2'>
            Start Date <span className='text-red-500'>*</span>
          </label>
          <div className='relative'>
            <CustomCalendar
              handleStartDateChange={handleStartDateChange}
              id={session.id}
            />
          </div>
        </div>

        {/* Start Time */}
        <div className='col-span-12 sm:col-span-3'>
          <label className='block text-sm text-gray-400 mb-2'>
            Start Time <span className='text-red-500'>*</span>
          </label>
          <div className='relative'>
            <CustomTimePicker
              handleTimeChange={handleTimeChange}
              id={session.id}
              type='startTime'
            />
          </div>
        </div>

        {/* End Time */}
        <div className='col-span-12 sm:col-span-3'>
          <label className='block text-sm text-gray-400 mb-2'>
            End Time
          </label>
          <div className='relative'>
            <CustomTimePicker
              handleTimeChange={handleTimeChange}
              id={session.id}
              type='endTime'
            />
          </div>
        </div>

        {/* Add Session Button */}
        {index < 1 && isMultipleSession && (
          <div className='col-span-12 sm:col-span-2 justify-end'>
            <button
              title={''}
              type='button'
              className='text-[#9edd45] text-[24px] hover:text-[#76b434] transition'
              onClick={handleAddSession}
            >
              <CiCirclePlus />
            </button>
          </div>
        )}
        {index >= 1 && (
          <div className='col-span-12 sm:col-span-2 justify-end'>
            <button
              title={''}
              type='button'
              className='text-[#f00] text-[24px] hover:text-[#f00] transition'
              onClick={() => handleDeleteSession(session.id)}
            >
              <CiTrash />
            </button>
          </div>
        )}
      </div>
    ))}
  </div>
</div>


        {/* LOCATION */}
        <div className='pb-6 pt-12'>
          {/* Border Line */}
          <div className='border-b border-gray-700 mb-6'></div>

          {/* Location Heading */}
          <h3 className='font-semibold text-[24px] mb-4'>Location</h3>

          <div className='grid grid-cols-12 gap-4 items-center'>
            <div className='col-span-10 relative'>
              {' '}
              <label
                htmlFor='address'
                className='absolute -top-3 left-4 bg-gray-900 text-[14px] text-gray-400 px-1'
              >
                Event Address <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='address'
                name='address'
                placeholder="Address of the event's location"
                className='w-full bg-gray-800 text-white px-4 py-3 border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#9edd45]'
                onChange={handleTitleAndDescriptionAndAddress}
              ></input>
            </div>
          </div>

          {/* Event Location */}
          <div className='grid grid-cols-12 gap-4 items-center my-8'>
            {/* Select Box with Inline Label */}
            <div className='col-span-8 relative'>
              <label
                htmlFor='location'
                className='absolute -top-3 left-4 bg-gray-900 text-[14px] text-gray-400 px-1'
              >
                Where will your event take place?{' '}
                <span className='text-red-500'>*</span>
              </label>
              <select
                id='location'
                className='w-full bg-gray-800 text-white px-4 py-3 pr-10 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#9edd45] appearance-none'
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='gray'%3E%3Cpath fill-rule='evenodd' d='M10 12l-5-5h10l-5 5z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1em',
                }}
                onChange={handleLocationChange}
                defaultValue=''
              >
                <option value='' disabled>
                  Please select one
                </option>
                {states?.map((eachState) => (
                  <option value={JSON.stringify(eachState)} key={eachState.id}>
                    {eachState.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Thin Separator Line */}
          <div className='border-t border-gray-700 mb-6'></div>

          {/* Additional Information */}
          <h3 className='font-semibold sm:text-[24px] mb-4 whitespace-nowrap'>
            Additional Information
          </h3>
          {/* Event Description */}
          <div className='grid grid-cols-12 gap-4 items-center'>
            {/* Textarea with Inline Label */}
            <div className='col-span-10 relative'>
              {' '}
              {/* Increased col-span from 8 to 10 */}
              <label
                htmlFor='description'
                className='absolute -top-3 left-4 bg-gray-900 text-[14px] text-gray-400 px-1'
              >
                Event Description <span className='text-red-500'>*</span>
              </label>
              <textarea
                id='description'
                name='description'
                rows={8} /* Increased Rows for Larger Box */
                placeholder="Describe what's special about your event & other important details."
                className='w-full bg-gray-800 text-white px-4 py-3 border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#9edd45]'
                onChange={handleTitleAndDescriptionAndAddress}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
