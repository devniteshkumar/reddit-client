import { ArrowBigUp, MessageSquare, Image as ImageIcon, Video, FileText, ExternalLink } from "lucide-react";
import type { RedditPost } from "@/types/reddit";

interface PostCardProps {
  post: RedditPost;
  onClick: () => void;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

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

  const hasExternalLink = post.url &&
    post.url !== `https://www.reddit.com${post.permalink}` &&
    !post.url.match(/\.(jpg|jpeg|png|gif|webp)$/i) &&
    !isVideo;

  const MediaIcon = isVideo ? Video : isGallery || hasImage || hasPreview ? ImageIcon : isSelfPost ? FileText : hasExternalLink ? ExternalLink : null;

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-gradient-card backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:shadow-hover hover:border-primary/50 hover:-translate-y-0.5 transition-all duration-300 group animate-scale-in"
    >
      <div className="flex gap-4 p-4">
        {hasThumbnail ? (
          <div className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden shadow-card">
            <img
              src={post.thumbnail}
              alt=""
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {MediaIcon && (
              <div className="absolute top-1.5 right-1.5 bg-black/70 backdrop-blur-sm rounded-md p-1.5">
                <MediaIcon className="h-3.5 w-3.5 text-white" />
              </div>
            )}
          </div>
        ) : MediaIcon ? (
          <div className="w-24 h-24 rounded-lg bg-gradient-glass backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-border/30 shadow-inner">
            <MediaIcon className="h-9 w-9 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        ) : null}

        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <h3 className="font-semibold text-foreground line-clamp-3 group-hover:text-transparent group-hover:bg-gradient-secondary group-hover:bg-clip-text transition-all duration-300 leading-snug text-[15px]">
            {post.title}
          </h3>

          {(post as any).selftext && (
            <p className="text-xs text-muted-foreground/70 line-clamp-2 leading-relaxed">
              {(post as any).selftext}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-glass backdrop-blur-sm rounded-full border border-primary/20">
              <ArrowBigUp className="h-3.5 w-3.5 text-primary" />
              <span className="font-bold bg-gradient-primary bg-clip-text text-transparent">{formatNumber(post.score)}</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-secondary/10 rounded-full text-secondary">
              <MessageSquare className="h-3.5 w-3.5" />
              <span className="font-semibold">{formatNumber(post.num_comments)}</span>
            </div>

            <span className="text-muted-foreground/70">u/{post.author}</span>
            <span className="text-muted-foreground/40">•</span>
            <span className="text-muted-foreground/60 text-[11px]">{timeSince(post.created_utc)}</span>
          </div>
        </div>
      </div>
    </button>
  );
};
