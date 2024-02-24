import React from "react";

function EmptyState() {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center dark:bg-gray-800 bg-gray-100">
      <div className="text-center flex flex-col items-center">
        <h3>Select a Chat or Start a new conversation</h3>
      </div>
    </div>
  );
}

export default EmptyState;
