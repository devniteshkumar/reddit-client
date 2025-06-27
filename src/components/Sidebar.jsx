import React from "react";

function Sidebar({ onAddSubreddit }) {
  async function OnClickPlus() {
    const name = prompt("Enter subreddit name:");
    if (name) {
      onAddSubreddit(name.trim().toLowerCase());
    }
  }

  return (
    <div className="fixed right-0 top-0 w-[100px] h-screen bg-gray-800 ">
      <div className="flex items-center justify-center p-3">
        <button onClick={OnClickPlus}>
          <img
            className="w-12 h-12 filter invert"
            src="/plus-circle-fill.svg"
            alt="plus-circle-fill"
          />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
