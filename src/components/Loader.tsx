import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="inline-flex items-center mx-1 z-9999">
      <div className="h-4 w-4 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loader;