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
    <div
      className={`flex text-palette ${
        subreddits.length === 0 ? "bg-black" : ""
      }`}
    >
      <LaneContainer
        subreddits={subreddits}
        removeSubreddit={removeSubreddit}
      />

      <Sidebar onAddSubreddit={addSubreddit} />
    </div>
  );
}

export default App;
