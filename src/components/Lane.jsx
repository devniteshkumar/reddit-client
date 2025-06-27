import React, { useEffect, useState } from "react";

function Lane({ subreddit }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`https://www.reddit.com/r/${subreddit}/new.json`);
        const data = await res.json();
        const newPosts = data.data.children.map((child) => ({
          id: child.data.id,
          title: child.data.title,
          author: child.data.author,
        }));
        setPosts(newPosts);
        setError(null);
      } catch {
        setError(`Failed to load r/${subreddit}`);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [subreddit]);

  return (
    <div className="h-full p-4 flex flex-col bg-neutral-100 dark:bg-zinc-900">
      <h2 className="text-white bg-gray-800 px-3 py-2 rounded-md text-md font-bold mb-3 shadow">
        r/{subreddit}
      </h2>

      {loading && <p className="text-gray-500 text-sm">Loading...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex-1 overflow-y-auto pr-2">
        {posts.length === 0 && !loading && !error && (
          <p className="text-gray-500 text-sm">No recent posts found.</p>
        )}
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="border-b border-gray-300 dark:border-gray-700 pb-2">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">{post.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">by u/{post.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Lane;
