// Function to render different media types
export function renderMedia(post) {
    const { postHint, url, media, secureMedia, preview } = post;
    const maxHeight = 400;

    // Images
    if (postHint === "image" && url) {
        return (
            <img
                src={url}
                alt={post.title}
                className="w-full rounded-md my-2"
                style={{ maxHeight: `${maxHeight}px`, objectFit: 'contain' }}
            />
        );
    }

    // Reddit-hosted video
    if (postHint === "hosted:video" && media?.reddit_video?.fallback_url) {
        return (
            <video
                controls
                className="w-full rounded-md my-2"
                style={{ maxHeight: `${maxHeight}px`, objectFit: 'contain' }}
            >
                <source src={media.reddit_video.fallback_url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        );
    }

    // Gifs via preview
    if (preview?.images?.[0]?.variants?.gif?.source?.url) {
        return (
            <img
                src={preview.images[0].variants.gif.source.url.replace(/&amp;/g, "&")}
                alt={post.title}
                className="w-full rounded-md my-2"
                style={{ maxHeight: `${maxHeight}px`, objectFit: 'contain' }}
            />
        );
    }

    // YouTube embed
    if (secureMedia?.type === "youtube.com") {
        const ytMatch = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        const videoId = ytMatch?.[1];
        if (videoId) {
            return (
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    className="w-full rounded-md my-2"
                    style={{ height: `${maxHeight}px` }}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YouTube video"
                />
            );
        }
    }

    // RedGIFs with lightbox fallback
    if (
        postHint === "rich:video" &&
        (secureMedia?.type?.includes("redgifs.com") || url.includes("redgifs.com"))
    ) {
        const redgifFallback =
            secureMedia?.reddit_video?.fallback_url ??
            media?.reddit_video?.fallback_url ??
            null;

        const thumbnail =
            preview?.images?.[0]?.source?.url?.replace(/&amp;/g, "&") ??
            null;

        return (
            <button
                onClick={() => setLightboxVideoUrl(redgifFallback)}
                className="w-full my-2 relative rounded-md overflow-hidden focus:outline-none"
                disabled={!redgifFallback}
            >
                {thumbnail && (
                    <img
                        src={thumbnail}
                        alt={post.title}
                        className="w-full object-cover"
                        style={{ maxHeight: `${maxHeight}px` }}
                    />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <span className="text-white text-sm">
                        {redgifFallback ? "Play RedGIF" : "View on RedGIFs"}
                    </span>
                </div>
            </button>
        );
    }

    return null;
}