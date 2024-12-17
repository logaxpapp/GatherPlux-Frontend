import React, { Suspense } from 'react';

import EmailVerification from './components/Verify';

const Page = () => {
  return (
    <Suspense>
      <EmailVerification />
    </Suspense>
  );
};

export default Page;
