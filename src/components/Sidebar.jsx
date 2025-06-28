import React from "react";
import SubredditPopup from './subredditpopup.jsx';

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
    <div className="fixed right-0 top-0 w-[100px] h-screen bg-gray-800 ">
      <div className="flex items-center justify-center p-3">
        <button onClick={handleClick}>
          <img
            className="w-12 h-12 filter invert"
            src="/plus-circle-fill.svg"
            alt="plus-circle-fill"
          />
        </button>
      </div>
      {isOpen && <SubredditPopup onSubmit={handleClose} />}
    </div>
  );
}

export default Sidebar;

