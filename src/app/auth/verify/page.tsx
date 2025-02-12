"use strict";
"use client";

import React, { Suspense } from "react";

import EmailVerification from "./components/Verify";
import isAuth from "@/helpers/higherOrderComponent/isAuthenticated";

const Verify = () => {
  return (
    <Suspense>
      <EmailVerification />
    </Suspense>
  );
};

export default isAuth(Verify);
