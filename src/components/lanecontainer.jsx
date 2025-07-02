import React from "react";
import Lane from "./lane";
import PostPopup from "./postpopup";

function LaneContainer({ subreddits, removeSubreddit }) {
  // State to track the currently selected post for the PostPopup
  const [currentPost, setCurrentPost] = React.useState(null);

  // Calculate the number of lanes based on the number of subreddits
  const numLanes = subreddits.length;

  // Handle post click to set the current post
  const handlePostClick = (post) => {
    setCurrentPost(post);
  };

  // Render the LaneContainer with Lanes for each subreddit and a PostPopup for the current post
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
