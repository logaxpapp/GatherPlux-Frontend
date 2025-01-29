import React, { useState } from 'react';
import { useCreateCountryMutation } from '@/services/slices/admin.slice';
import { toast } from 'react-toastify';

interface NewCountryFormProps {
  handleCloseModal: () => void;
}

const NewCountryForm: React.FC<NewCountryFormProps> = ({
  handleCloseModal,
}) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [currency, setCurrency] = useState('');
  const [currencyCode, setCurrencyCode] = useState('');
  const [currencySymbols, setCurrencySymbols] = useState('');

  const [createCountry] = useCreateCountryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await createCountry({
      name,
      code2: code,
      currency,
      currency_code: currencyCode,
      currency_symbol: currencySymbols,
    }).unwrap();

    if (
      response &&
      response.code === 200 &&
      response.message === 'SUCCESSFUL'
    ) {
      toast.success('Country added successfully', {
        position: 'top-right',
      });
      handleCloseModal();
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-gray-600'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold text-center text-gray-900'>
            New Country
          </h2>
          <button
            type='button'
            onClick={handleCloseModal}
            className='text-gray-500 hover:text-gray-700'
          >
            &#10005;
          </button>
        </div>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Name and Code */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700'>Name</label>
              <input
                type='text'
                title={''}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full p-2 border rounded-lg focus:ring-1 focus:ring-primary-500 focus:outline-none'
              />
            </div>
            <div>
              <label className='block text-gray-700'>Code</label>
              <input
                type='text'
                title={''}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className='w-full p-2 border rounded-lg focus:ring-1 focus:ring-primary-500 focus:outline-none'
              />
            </div>
          </div>
          {/* Currency and Currency Code */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700'>Currency</label>
              <input
                type='text'
                title={''}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className='w-full p-2 border rounded-lg focus:ring-1 focus:ring-primary-500 focus:outline-none'
              />
            </div>
            <div>
              <label className='block text-gray-700'>Currency Code</label>
              <input
                type='text'
                title={''}
                value={currencyCode}
                onChange={(e) => setCurrencyCode(e.target.value)}
                className='w-full p-2 border rounded-lg focus:ring-1 focus:ring-primary-500 focus:outline-none'
              />
            </div>
          </div>
          {/* Currency Symbols */}
          <div>
            <label className='block text-gray-700'>Currency Symbols</label>
            <input
              type='text'
              title={''}
              value={currencySymbols}
              onChange={(e) => setCurrencySymbols(e.target.value)}
              className='w-full p-2 border rounded-lg focus:ring-1 focus:ring-primary-500 focus:outline-none'
            />
          </div>
          {/* Save Button */}
          <button
            type='submit'
            className='w-full bg-[#9edd45] text-white p-3 rounded-lg font-semibold hover:bg-[#99CA54FF] transition'
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewCountryForm;
