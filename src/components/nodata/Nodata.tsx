import React from "react";

const Nodata = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="border border-gray-500 h-48 flex justify-center items-center rounded w-full shadow-lg">
        <div className="text-xl">No mutual funds are available</div>
      </div>
    </div>
  );
};

export default Nodata;
