import React, { useEffect, useState } from "react";
import { renderMedia } from "./renderutility.jsx";

function PostPopup({ post, onClose }) {
    // State for comments
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);
    const [error, setError] = useState(null);

    // Fetch comments when the post changes
    useEffect(() => {
        if (!post) return;

        // Fetch comments
        const fetchComments = async () => {
            try {
                setLoadingComments(true);
                const res = await fetch(
                    `https://www.reddit.com/r/${post.subreddit}/comments/${post.id}.json`
                );
                const data = await res.json();

                // Only take the top-level comments
                const commentData = data[1]?.data?.children
                    .filter((c) => c.kind === "t1")
                    .map((c) => ({
                        author: c.data.author,
                        body: c.data.body,
                        ups: c.data.ups,
                        id: c.data.id,
                    }));

                // Update the state
                setComments(commentData);
                setError(null);
            } catch (err) {
                setError("Failed to load comments.");
            } finally {
                setLoadingComments(false);
            }
        };

        // Fetch the comments
        fetchComments();
    }, [post]);

    // If no post, return null
    if (!post) return null;

    // Destructure the post object
    const { title, author, postHint, url } = post;

    // Render the popup
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-zinc-900 rounded-lg shadow-xl p-6 max-w-2xl w-full relative overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-end mb-4">
                    <button
                        onClick={onClose}
                        className="filter invert bg-transparent hover:bg-transparent rounded-full p-1 transition-colors duration-200"
                        aria-label="Close"
                    >
                        <img src="/x-circle-fill.svg" alt="Close" className="w-8 h-8" />
                    </button>
                </div>
                <h2 className="text-xl font-bold mb-2 text-zinc-300">{title}</h2>
                {renderMedia(post)}
                <p className="text-sm text-zinc-500 mb-4">Posted by u/{author}</p>

                <h3 className="text-lg font-semibold mb-2 text-zinc-300">Comments</h3>
                {loadingComments && <p className="text-zinc-500">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loadingComments && comments.length === 0 && (
                    <p className="text-zinc-500">No comments found.</p>
                )}
                <ul className="space-y-3">
                    {comments.map((comment) => (
                        <li
                            key={comment.id}
                            className="border border-zinc-700 rounded-md p-3 bg-zinc-800"
                        >
                            <p className="text-sm text-zinc-300">{comment.body}</p>
                            <div className="text-xs text-zinc-500 mt-1">
                                ↑ {comment.ups} by u/{comment.author}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PostPopup;

