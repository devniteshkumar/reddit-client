import React from "react";
import SubredditPopup from "./subredditpopup.jsx";

function Sidebar({ onAddSubreddit }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = (name) => {
    setIsOpen(false);
    if (name) {
      onAddSubreddit(name.trim().toLowerCase());
    }
  };

  return (
    <div className="fixed right-0 top-0 w-[100px] h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 border-l border-zinc-700 shadow-xl z-50">
      <div className="flex items-center justify-center p-4">
        <button onClick={handleClick}>
          <img
            className="w-10 h-10 filter invert hover:scale-110 transition-transform duration-150"
            src="/plus-circle-fill.svg"
            alt="plus"
          />
        </button>
      </div>
      {isOpen && <SubredditPopup onSubmit={handleClose} />}
    </div>
  );
}

export default Sidebar;
