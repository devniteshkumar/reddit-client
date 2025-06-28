import React, { useState, useRef, useEffect } from "react";

function SubredditPopup({ onSubmit }) {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim().toLowerCase());
      setName("");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-xl border border-zinc-700 w-80">
        <h2 className="text-lg font-bold mb-4 text-gray-100">
          Enter Subreddit Name
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded-md border border-zinc-600 bg-zinc-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Subreddit name"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-150"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubredditPopup;
