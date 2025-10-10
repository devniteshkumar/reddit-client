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

  const depthColors = [
    "border-l-primary/50",
    "border-l-secondary/50",
    "border-l-accent/50",
    "border-l-primary/30",
    "border-l-secondary/30",
  ];

  const borderColor = depthColors[depth % depthColors.length];

  return (
    <div className={`${depth > 0 ? `ml-4 pl-4 border-l-2 ${borderColor}` : ""}`}>
      <div className="group">
        <div className="flex items-start gap-3 mb-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex flex-col items-center gap-0.5 pt-1 hover:opacity-70 transition-opacity"
          >
            <ArrowBigUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              {comment.score}
            </span>
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-foreground">
                u/{comment.author}
              </span>
              <span className="text-xs text-muted-foreground">
                {timeSince(comment.created_utc)}
              </span>
              {hasReplies && (
                <button
                  onClick={() => setCollapsed(!collapsed)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {collapsed ? (
                    <ChevronRight className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                  {collapsed && `[${comment.replies.data.children.length} replies]`}
                </button>
              )}
            </div>

            {!collapsed && (
              <>
                <p className="text-sm text-foreground whitespace-pre-wrap mb-3 leading-relaxed">
                  {comment.body}
                </p>

                {hasReplies && (
                  <div className="space-y-3 mt-3">
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
