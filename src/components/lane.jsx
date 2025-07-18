import React, { useEffect, useState } from "react";
import {renderMedia} from './renderutility.jsx'

function Lane({ subreddit, onClose, onPostClick }) {
  // State variables
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxVideoUrl, setLightboxVideoUrl] = useState(null);
  const [postClicked, setPostClicked] = useState(false);

  // Function to fetch posts from the subreddit
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://www.reddit.com/r/${subreddit}/new.json`);
      const data = await res.json();
      const newPosts = data.data.children.map((child) => {
        const post = child.data;
        return {
          id: post.id,
          title: post.title,
          author: post.author,
          postHint: post.post_hint,
          url: post.url,
          media: post.media,
          secureMedia: post.secure_media,
          preview: post.preview,
          ups: post.ups,
          downs: post.downs,
          subreddit: post.subreddit,
        };
      });
      setPosts(newPosts);
      setError(null);
    } catch {
      setError(`Failed to load r/${subreddit}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle post click
  const handlePostClick = (post) => {
    setPostClicked(true);
    onPostClick(post);
  };

  // useEffect to fetch posts on subreddit change
  useEffect(() => {
    fetchPosts();
  }, [subreddit]);

  // Function to toggle the menu
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Return the JSX for the Lane component
  return (
    <div className="h-full p-4 flex flex-col bg-zinc-950 text-gray-100 relative rounded-md shadow-inner">
      <div className="flex justify-between items-center bg-zinc-800 text-white shadow px-3 py-2 rounded-md mb-3 relative">
        <h2 className="text-md font-bold">r/{subreddit}</h2>
        <div className="relative">
          <button type="button" onClick={toggleMenu}>
            <img
              className="w-6 h-6 filter invert"
              src="three-dots.svg"
              alt="menu"
            />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-zinc-800 border border-zinc-700 shadow-md rounded-md z-10">
              <button
                onClick={() => {
                  fetchPosts();
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-zinc-700 rounded-t-md"
              >
                Refresh
              </button>
              <button
                onClick={() => {
                  if (onClose) onClose(subreddit);
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-700 rounded-b-md"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      {loading && <p className="text-gray-400 text-sm">Loading...</p>}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex-1 overflow-y-auto pr-2">
        {posts.length === 0 && !loading && !error && (
          <p className="text-gray-500 text-sm">No recent posts found.</p>
        )}
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border-b border-zinc-700 pb-2"
              onClick={() => handlePostClick(post)}
            >
              <h3 className="text-sm font-semibold text-gray-200">
                {post.title}
              </h3>
              {renderMedia(post)}
              <div className="flex items-center text-xs text-gray-500">
                <img
                  className="w-4 h-4 mr-1 filter invert"
                  src="caret-up-fill.svg"
                  alt="upvote"
                />
                <span>{post.ups}</span>
                <img
                  className="w-4 h-4 mx-1 filter invert"
                  src="caret-down-fill.svg"
                  alt="downvote"
                />
                <span>{post.downs}</span>
              </div>
              <p className="text-xs text-gray-500">by u/{post.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxVideoUrl && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
          onClick={() => setLightboxVideoUrl(null)}
        >
          <div
            className="relative bg-black rounded-md overflow-hidden w-[90%] max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              controls
              autoPlay
              className="w-full h-auto rounded-md"
            >
              <source src={lightboxVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={() => setLightboxVideoUrl(null)}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Lane;
