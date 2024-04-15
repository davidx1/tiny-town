import React from "react";

export const MobileUnsupported: React.FC = () => {
  return (
    <div className="bg-gray-800/80 absolute w-2/3 z-40 top-1/3 left-1/6 px-8 py-8 flex flex-col items-center text-center">
      <h1 className="text-white text-xl mb-4">Device Unsupported</h1>
      <p className="text-gray-200">
        Mobile devices are not supported yet. Please try again on a computer.
      </p>
    </div>
  );
};
