"use client";

import React from "react";

interface LoaderProps {
  height?: number;
  width?: number;
}

const Loader: React.FC<LoaderProps> = ({ height = 4, width = 4 }) => {
  return (
    <div className="inline-flex items-center mx-1 z-9999">
      <div
        className={`h-${height} w-${width} animate-spin rounded-full border-4 border-solid border-white border-t-transparent`}
      ></div>
    </div>
  );
};

export default Loader;
