import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent } from "./ui/dialog";
import { ArrowBigUp, MessageSquare, ExternalLink, Loader2 } from "lucide-react";
import type { RedditPost, RedditCommentsResponse } from "@/types/reddit";
import { ScrollArea } from "./ui/scroll-area";
import { Comment } from "./Comment";
import { Separator } from "./ui/separator";

interface PostDetailModalProps {
  post: RedditPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PostDetailModal = ({ post, open, onOpenChange }: PostDetailModalProps) => {
  const { data: commentsData, isLoading: commentsLoading } = useQuery({
    queryKey: ["comments", post?.permalink],
    queryFn: async () => {
      if (!post) return null;
      const response = await fetch(`https://www.reddit.com${post.permalink}.json`);
      const data = await response.json();
      return data as [any, RedditCommentsResponse];
    },
    enabled: !!post && open,
  });

  if (!post) return null;

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

  const renderMedia = () => {
    // Image posts
    if (post.url?.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      return (
        <img
          src={post.url}
          alt={post.title}
          className="w-full rounded-xl max-h-[600px] object-contain bg-black/20 shadow-inner"
        />
      );
    }

    // Reddit gallery
    if ((post as any).is_gallery && (post as any).media_metadata) {
      const metadata = (post as any).media_metadata;
      return (
        <div className="space-y-3">
          {Object.values(metadata).map((item: any, idx: number) => {
            const imageUrl = item.s?.u?.replace(/&amp;/g, "&");
            if (imageUrl) {
              return (
                <img
                  key={idx}
                  src={imageUrl}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full rounded-xl max-h-[600px] object-contain bg-black/20 shadow-inner"
                />
              );
            }
            return null;
          })}
        </div>
      );
    }

    // Video posts
    if ((post as any).is_video && (post as any).media?.reddit_video?.fallback_url) {
      return (
        <video
          controls
          className="w-full rounded-xl max-h-[600px] shadow-card"
          src={(post as any).media.reddit_video.fallback_url}
        >
          Your browser does not support video playback.
        </video>
      );
    }

    // Preview images
    if ((post as any).preview?.images?.[0]?.source?.url) {
      const imageUrl = (post as any).preview.images[0].source.url.replace(/&amp;/g, "&");
      return (
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full rounded-xl max-h-[600px] object-contain bg-black/20 shadow-inner"
        />
      );
    }

    // External link preview
    if (post.url && post.url !== `https://www.reddit.com${post.permalink}`) {
      return (
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-glass backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary hover:shadow-glow transition-all duration-300"
        >
          <div className="flex items-center gap-2 text-primary mb-3">
            <ExternalLink className="h-5 w-5" />
            <span className="font-semibold">Open external link</span>
          </div>
          <p className="text-sm text-muted-foreground break-all">{post.url}</p>
        </a>
      );
    }

    return null;
  };

  const selftext = (post as any).selftext;
  const comments = commentsData?.[1]?.data?.children || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] p-0 bg-gradient-card border-border/50 shadow-glow overflow-hidden">
        <ScrollArea className="max-h-[95vh]">
          <div className="p-8">
            {/* Post Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex flex-col items-center gap-1 bg-gradient-glass backdrop-blur-sm rounded-xl p-3 shadow-card">
                <ArrowBigUp className="h-6 w-6 text-primary" />
                <span className="text-sm font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {post.score.toLocaleString()}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-tight mb-4 text-foreground">
                  {post.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="px-3 py-1 bg-gradient-secondary rounded-full text-white font-medium shadow-card">
                    {post.subreddit_name_prefixed}
                  </span>
                  <span className="text-muted-foreground">u/{post.author}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{timeSince(post.created_utc)}</span>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.num_comments.toLocaleString()} comments</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Media Content */}
            {renderMedia()}

            {/* Self Text */}
            {selftext && (
              <div className="mt-6 p-6 bg-gradient-glass backdrop-blur-sm rounded-xl border border-border/50">
                <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {selftext}
                </p>
              </div>
            )}

            {/* Comments Section */}
            <Separator className="my-8" />

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-1 bg-gradient-secondary bg-clip-text text-transparent">
                Comments
              </h3>
              <p className="text-sm text-muted-foreground">
                {post.num_comments.toLocaleString()} comments
              </p>
            </div>

            {commentsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-6">
                {comments.map((comment) => {
                  if (comment.kind === "t1" && comment.data.body) {
                    return <Comment key={comment.data.id} comment={comment.data} />;
                  }
                  return null;
                })}
                {comments.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    No comments yet
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-border/50">
              <a
                href={`https://reddit.com${post.permalink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-secondary transition-colors group"
              >
                <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                View on Reddit
              </a>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
