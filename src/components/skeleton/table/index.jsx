import React from "react";

const TableSkeleton = () => {
  return (
    <div className="container px-4 mx-auto">
      <div className="animate-pulse">
        <div className="flex items-center justify-between mb-4 space-x-4">
          <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
          <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
          <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between space-x-4">
            <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
