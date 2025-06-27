import React, { useEffect, useState } from "react";

function Lane({ subreddit, onClose }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://www.reddit.com/r/${subreddit}/new.json`);
      const data = await res.json();
      const newPosts = data.data.children.map((child) => ({
        id: child.data.id,
        title: child.data.title,
        author: child.data.author,
        image: child.data.preview
          ? child.data.preview.images[0].source.url.replace(/&amp;/g, "&")
          : null,
      }));
      setPosts(newPosts);
      setError(null);
    } catch {
      setError(`Failed to load r/${subreddit}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [subreddit]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className="h-full p-4 flex flex-col bg-neutral-100 dark:bg-zinc-900 relative">
      <div className="flex justify-between items-center text-white bg-gray-800 shadow px-3 py-2 rounded-md mb-3 relative">
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
            <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-700 shadow-md rounded-md z-10">
              <button
                onClick={() => {
                  fetchPosts();
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Refresh
              </button>
              <button
                onClick={() => {
                  if (onClose) onClose(subreddit);
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      {loading && <p className="text-gray-500 text-sm">Loading...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex-1 overflow-y-auto pr-2">
        {posts.length === 0 && !loading && !error && (
          <p className="text-gray-500 text-sm">No recent posts found.</p>
        )}
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border-b border-gray-300 dark:border-gray-700 pb-2"
            >
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {post.title}
              </h3>
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto my-2"
                />
              )}
              <p className="text-xs text-gray-600 dark:text-gray-400">
                by u/{post.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Lane;
