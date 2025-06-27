import React from "react";

function sidebar() {
  return (
    <div className="fixed right-0 top-0 w-[100px] h-screen bg-gray-200 ">
      <div className="flex items-center justify-center p-3">
        <button>
          <img
            className="w-12 h-12"
            src="/plus-circle-fill.svg"
            alt="plus-circle-fill"
          />
        </button>
      </div>
    </div>
  );
}

export default sidebar;
