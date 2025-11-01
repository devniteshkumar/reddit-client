import { useState } from "react";
import { ArrowBigUp, ChevronDown, ChevronRight } from "lucide-react";
import type { RedditComment } from "@/types/reddit";

interface CommentProps {
  comment: RedditComment;
  depth?: number;
}

export const Comment = ({ comment, depth = 0 }: CommentProps) => {
  const [collapsed, setCollapsed] = useState(false);

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

  const hasReplies =
    comment.replies &&
    comment.replies.data &&
    comment.replies.data.children &&
    comment.replies.data.children.length > 0;

  const borderStyles = [
    { borderColor: 'hsl(16 100% 50% / 0.4)', bgColor: 'hsl(16 100% 50% / 0.05)' },
    { borderColor: 'hsl(250 70% 60% / 0.4)', bgColor: 'hsl(250 70% 60% / 0.05)' },
    { borderColor: 'hsl(280 60% 65% / 0.4)', bgColor: 'hsl(280 60% 65% / 0.05)' },
    { borderColor: 'hsl(16 100% 50% / 0.25)', bgColor: 'hsl(16 100% 50% / 0.03)' },
    { borderColor: 'hsl(250 70% 60% / 0.25)', bgColor: 'hsl(250 70% 60% / 0.03)' },
  ];

  const currentStyle = borderStyles[depth % borderStyles.length];

  return (
    <div 
      className={`${depth > 0 ? 'ml-3 pl-4 border-l-2' : ''} transition-all duration-200 rounded-lg`}
      style={{ 
        borderColor: depth > 0 ? currentStyle.borderColor : undefined,
        backgroundColor: depth > 0 ? currentStyle.bgColor : undefined
      }}
    >
      <div className="group py-2">
        <div className="flex items-start gap-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex flex-col items-center gap-1 pt-0.5 px-2 py-1.5 rounded-lg hover:bg-gradient-glass transition-all"
          >
            <ArrowBigUp className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold bg-gradient-primary bg-clip-text text-transparent">
              {comment.score}
            </span>
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-primary hover:underline cursor-pointer">
                u/{comment.author}
              </span>
              <span className="text-muted-foreground/50">•</span>
              <span className="text-xs text-muted-foreground">
                {timeSince(comment.created_utc)}
              </span>
              {hasReplies && (
                <button
                  onClick={() => setCollapsed(!collapsed)}
                  className="flex items-center gap-1 text-xs text-secondary hover:text-secondary/80 transition-colors font-medium"
                >
                  {collapsed ? (
                    <>
                      <ChevronRight className="h-3.5 w-3.5" />
                      <span>[{comment.replies.data.children.length} {comment.replies.data.children.length === 1 ? 'reply' : 'replies'}]</span>
                    </>
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5" />
                  )}
                </button>
              )}
            </div>

            {!collapsed && (
              <div className="animate-fade-in">
                <p className="text-sm text-foreground/90 whitespace-pre-wrap mb-3 leading-relaxed">
                  {comment.body}
                </p>

                {hasReplies && (
                  <div className="space-y-2 mt-3">
                    {comment.replies.data.children.map((reply) => {
                      if (reply.kind === "t1" && reply.data.body) {
                        return (
                          <Comment
                            key={reply.data.id}
                            comment={reply.data}
                            depth={depth + 1}
                          />
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
