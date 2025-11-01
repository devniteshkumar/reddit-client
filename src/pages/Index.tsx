import { useState } from "react";
import { SubredditLane } from "@/components/SubredditLane";
import { AddLaneInput } from "@/components/AddLaneInput";
import { Layers } from "lucide-react";

const Index = () => {
  const [subreddits, setSubreddits] = useState<string[]>([]);

  const handleAddSubreddit = (subreddit: string) => {
    setSubreddits((prev) => [...prev, subreddit]);
  };

  const handleRemoveSubreddit = (subreddit: string) => {
    setSubreddits((prev) => prev.filter((s) => s !== subreddit));
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <header className="border-b border-border/30 bg-gradient-glass backdrop-blur-lg sticky top-0 z-10 shadow-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
              <Layers className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
                Reddit Lane Viewer
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Browse multiple subreddits in beautiful lanes
              </p>
            </div>
          </div>
          
          <AddLaneInput
            onAdd={handleAddSubreddit}
            existingSubreddits={subreddits}
          />
        </div>
      </header>

      {/* Lanes Container */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full px-6 py-6">
          <div className="flex gap-5 h-full overflow-x-auto scrollbar-thin pb-4">
            {subreddits.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center animate-fade-in bg-gradient-glass backdrop-blur-sm border border-border/50 rounded-2xl p-12 shadow-card">
                  <div className="mb-6 text-6xl">📱</div>
                  <h2 className="text-2xl font-bold mb-3 bg-gradient-secondary bg-clip-text text-transparent">
                    No lanes yet
                  </h2>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Add your first subreddit lane above to start browsing Reddit in style
                  </p>
                </div>
              </div>
            ) : (
              subreddits.map((subreddit) => (
                <SubredditLane
                  key={subreddit}
                  subreddit={subreddit}
                  onRemove={() => handleRemoveSubreddit(subreddit)}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
