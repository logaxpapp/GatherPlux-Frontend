import React, { Suspense } from 'react';

import ResetPassword from './components/Reset.Password';

const Page = () => {
  return (
    <div className='bg-[#020e1e] min-h-screen px-4 py-8 text-white'>
      <Suspense>
        <ResetPassword />
      </Suspense>
    </div>
  );
};

export default Page;
