import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { X, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { PostCard } from "./PostCard";
import { PostDetailModal } from "./PostDetailModal";
import type { RedditApiResponse, RedditPost } from "@/types/reddit";

interface SubredditLaneProps {
  subreddit: string;
  onRemove: () => void;
}

export const SubredditLane = ({ subreddit, onRemove }: SubredditLaneProps) => {
  const [selectedPost, setSelectedPost] = useState<RedditPost | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handlePostClick = (post: RedditPost) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["subreddit", subreddit],
    queryFn: async () => {
      const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
      if (!response.ok) {
        throw new Error("Subreddit not found");
      }
      const data: RedditApiResponse = await response.json();
      return data;
    },
    retry: false,
  });

  return (
    <div className="flex-shrink-0 w-[400px] h-full flex flex-col animate-slide-in">
      {/* Lane Header */}
      <div className="bg-gradient-card backdrop-blur-sm border border-border/50 rounded-xl p-4 mb-4 flex items-center justify-between shadow-card hover:shadow-hover transition-shadow duration-300">
        <h2 className="text-lg font-bold bg-gradient-secondary bg-clip-text text-transparent">
          r/{subreddit}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => refetch()}
            className="h-8 w-8 hover:bg-secondary/20 hover:text-secondary transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive transition-colors"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Posts Container */}
      <div className="flex-1 overflow-y-auto space-y-3 scrollbar-thin pr-2">
        {isLoading && (
          <div className="flex items-center justify-center h-40">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-primary"></div>
              <div className="absolute top-0 left-0 animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-secondary" style={{ animationDirection: "reverse", animationDuration: "1s" }}></div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 backdrop-blur-sm border border-destructive/50 rounded-xl p-6 text-center animate-scale-in">
            <div className="text-3xl mb-3">⚠️</div>
            <p className="text-destructive font-semibold">Subreddit not found</p>
          </div>
        )}

        {data?.data.children.map((post) => (
          <PostCard 
            key={post.data.id} 
            post={post.data}
            onClick={() => handlePostClick(post.data)}
          />
        ))}
      </div>

      <PostDetailModal
        post={selectedPost}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};
