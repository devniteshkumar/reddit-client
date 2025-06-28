import React from "react";
import Lane from "./lane";

function LaneContainer({ subreddits, removeSubreddit }) {
  const numLanes = subreddits.length;

  return (
    <div className="h-screen flex overflow-x-auto bg-zinc-950 mr-[100px] gap-2 px-2 py-2">
      {subreddits.map((name) => (
        <div
          key={name}
          className="h-full border border-zinc-800 rounded-md overflow-hidden"
          style={{ width: `${100 / numLanes}%` }}
        >
          <Lane subreddit={name} onClose={removeSubreddit} />
        </div>
      ))}
    </div>
  );
}

export default LaneContainer;
