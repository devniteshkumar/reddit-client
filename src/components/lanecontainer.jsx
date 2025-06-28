import React from "react";
import Lane from "./lane";

function LaneContainer({ subreddits, removeSubreddit }) {
  const numLanes = subreddits.length;
  return (
    <div className="h-screen flex overflow-x-auto dark:bg-zinc-900 mr-[100px]">
      {subreddits.map((name) => (
        <div
          key={name}
          className="h-full border-r border-gray-300 dark:border-gray-700"
          style={{ width: `${100 / numLanes}%` }}
        >
          <Lane subreddit={name} onClose={removeSubreddit} />
        </div>
      ))}
    </div>
  );
}

export default LaneContainer;
