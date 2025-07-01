import React from "react";
import Lane from "./lane";
import PostPopup from "./postpopup";

function LaneContainer({ subreddits, removeSubreddit }) {
  const [currentPost, setCurrentPost] = React.useState(null);

  const numLanes = subreddits.length;

  const handlePostClick = (post) => {
    setCurrentPost(post);
  };

  return (
    <div className="h-screen flex overflow-x-auto bg-zinc-950 mr-[100px] gap-2 px-2 py-2">
      {subreddits.map((name) => (
        <div
          key={name}
          className="h-full border border-zinc-800 rounded-md overflow-hidden"
          style={{ width: `${100 / numLanes}%` }}
        >
          <Lane
            subreddit={name}
            onClose={removeSubreddit}
            onPostClick={handlePostClick}
          />
        </div>
      ))}
      {currentPost && <PostPopup post={currentPost} onClose={() => setCurrentPost(null)} />}
    </div>
  );
}

export default LaneContainer;
