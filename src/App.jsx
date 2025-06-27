import React, { useState } from "react";
import Sidebar from "./components/sidebar.jsx";
import LaneContainer from "./components/lanecontainer.jsx";

function App() {
  const [subreddits, setSubreddits] = useState([
    "programming",
    "reactjs",
    "javascript",
  ]);

  const addSubreddit = (name) => {
    if (name && !subreddits.includes(name)) {
      setSubreddits((prev) => [...prev, name]);
    }
  };

  return (
    <div className="flex text-palette">
      <LaneContainer subreddits={subreddits} />
      <Sidebar onAddSubreddit={addSubreddit} />
    </div>
  );
}

export default App;
