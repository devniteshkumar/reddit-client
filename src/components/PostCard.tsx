import { ArrowBigUp, MessageSquare, Image as ImageIcon, Video, FileText } from "lucide-react";
import type { RedditPost } from "@/types/reddit";

interface PostCardProps {
  post: RedditPost;
  onClick: () => void;
}

export const PostCard = ({ post, onClick }: PostCardProps) => {
  const timeSince = (timestamp: number) => {
    const seconds = Math.floor(Date.now() / 1000 - timestamp);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval !== 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  };

  const hasThumbnail =
    post.thumbnail &&
    post.thumbnail !== "self" &&
    post.thumbnail !== "default" &&
    post.thumbnail !== "nsfw" &&
    post.thumbnail !== "spoiler" &&
    post.thumbnail.startsWith("http");

  const isVideo = (post as any).is_video;
  const isGallery = (post as any).is_gallery;
  const hasImage = post.url?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  const hasPreview = (post as any).preview?.images?.[0];
  const isSelfPost = post.url === `https://www.reddit.com${post.permalink}`;

  const MediaIcon = isVideo ? Video : isGallery || hasImage || hasPreview ? ImageIcon : isSelfPost ? FileText : null;

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-gradient-card backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:shadow-hover hover:border-secondary/50 hover:scale-[1.01] transition-all duration-300 group"
    >
      <div className="flex gap-4">
        {hasThumbnail ? (
          <div className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden shadow-card">
            <img
              src={post.thumbnail}
              alt=""
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {MediaIcon && (
              <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-sm rounded p-1">
                <MediaIcon className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
        ) : MediaIcon ? (
          <div className="w-20 h-20 rounded-lg bg-gradient-glass backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-border/30 shadow-inner">
            <MediaIcon className="h-8 w-8 text-muted-foreground" />
          </div>
        ) : null}

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground line-clamp-3 group-hover:text-transparent group-hover:bg-gradient-secondary group-hover:bg-clip-text transition-all duration-300 mb-2 leading-snug">
            {post.title}
          </h3>
          
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 rounded-full">
              <ArrowBigUp className="h-3.5 w-3.5 text-primary" />
              <span className="font-semibold text-primary">{post.score.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>{post.num_comments.toLocaleString()}</span>
            </div>
            
            <span>u/{post.author}</span>
            <span>•</span>
            <span>{timeSince(post.created_utc)}</span>
          </div>
        </div>
      </div>
    </button>
  );
};
