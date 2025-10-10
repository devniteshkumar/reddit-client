export interface RedditPost {
  id: string;
  title: string;
  author: string;
  score: number;
  num_comments: number;
  created_utc: number;
  thumbnail: string;
  url: string;
  permalink: string;
  subreddit: string;
  subreddit_name_prefixed: string;
}

export interface RedditApiResponse {
  data: {
    children: Array<{
      data: RedditPost;
    }>;
  };
}

export interface RedditComment {
  id: string;
  author: string;
  body: string;
  score: number;
  created_utc: number;
  replies?: {
    data: {
      children: Array<{
        kind: string;
        data: RedditComment;
      }>;
    };
  };
  depth: number;
}

export interface RedditCommentsResponse {
  data: {
    children: Array<{
      kind: string;
      data: RedditComment | any;
    }>;
  };
}
