import React, { useState } from "react";
import Sidebar from "./components/sidebar.jsx";
import LaneContainer from "./components/lanecontainer.jsx";

function App() {
  const [subreddits, setSubreddits] = useState([]);

  const addSubreddit = (name) => {
    if (name && !subreddits.includes(name)) {
      setSubreddits((prev) => [...prev, name]);
    }
  };

  const removeSubreddit = (sub) => {
    setSubreddits((prev) => prev.filter((s) => s !== sub));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      {subreddits.length === 0 && (
        <div className="m-auto text-center text-3xl font-semibold text-gray-300 px-4">
          Enter a subreddit to start!
        </div>
      )}
      <LaneContainer
        subreddits={subreddits}
        removeSubreddit={removeSubreddit}
      />
      <Sidebar onAddSubreddit={addSubreddit} />
    </div>
  );
}

export default App;
