import React from 'react';
import Image from 'next/image';

export default function ChartPage() {
  return (
    <div className="bg-[#020e1e] h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-2xl font-bold mb-4 text-[#93d437]">Chart</h1>
      <div className="flex justify-center space-x-8">
        <div className="w-1/3">
          <Image
            src="/Performancecard1.png"
            alt="Companies Performance"
            width={400} // Specify actual image width
            height={300} // Specify actual image height
            className="rounded-lg shadow-lg border border-[#243447]"
            priority
          />
        </div>
        <div className="w-1/3">
          <Image
            src="/Performancecard2.png"
            alt="Users Performance"
            width={400} // Specify actual image width
            height={300} // Specify actual image height
            className="rounded-lg shadow-lg border border-[#243447]"
            priority
          />
        </div>
      </div>
    </div>
  );
}
