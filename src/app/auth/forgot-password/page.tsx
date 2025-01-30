import React from "react";

import ForgotPassword from "./components/Forgot.Password";
import isAuth from "@/helpers/higherOrderComponent/isAuthenticated";

const Page = () => {
  return (
    <div className="bg-[#020e1e] min-h-screen px-4 py-8 text-white">
      <ForgotPassword />
    </div>
  );
};

export default isAuth(Page);
