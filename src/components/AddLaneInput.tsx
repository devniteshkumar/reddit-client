import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface AddLaneInputProps {
  onAdd: (subreddit: string) => void;
  existingSubreddits: string[];
}

export const AddLaneInput = ({ onAdd, existingSubreddits }: AddLaneInputProps) => {
  const [input, setInput] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const subreddit = input.trim().toLowerCase().replace(/^r\//, "");
    
    if (!subreddit) {
      toast.error("Please enter a subreddit name");
      return;
    }

    if (existingSubreddits.includes(subreddit)) {
      toast.error("This subreddit is already added");
      return;
    }

    setIsValidating(true);
    
    try {
      const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
      if (!response.ok) {
        throw new Error("Subreddit not found");
      }
      
      onAdd(subreddit);
      setInput("");
      toast.success(`Added r/${subreddit}`, {
        description: "Lane created successfully",
      });
    } catch (error) {
      toast.error("Subreddit not found", {
        description: "Please check the name and try again",
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter subreddit name (e.g., askreddit)..."
        className="flex-1 bg-gradient-glass backdrop-blur-sm border-border/50 focus:border-secondary focus:ring-secondary h-12 px-4 rounded-xl transition-all duration-300"
        disabled={isValidating}
      />
      <Button
        type="submit"
        disabled={isValidating}
        className="bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-300 h-12 px-6 rounded-xl font-semibold"
      >
        {isValidating ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <Plus className="h-5 w-5 mr-2" />
            Add Lane
          </>
        )}
      </Button>
    </form>
  );
};
