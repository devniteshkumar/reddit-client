# Reddit Client

A modern, responsive Reddit client built with React and Vite that allows you to view multiple subreddit feeds simultaneously in a column-based layout.

## Features

- **Multi-column Layout**: View multiple subreddit feeds side by side
- **Real-time Content**: Fetches the latest posts from any subreddit
- **Rich Media Support**: 
  - Images
  - Videos (Reddit-hosted)
  - GIFs
  - Rich embeds (YouTube, etc.)
- **Interactive UI**:
  - Add/remove subreddit columns
  - Refresh individual feeds
  - Upvote/downvote display
  - Author information
- **Modern Design**: Dark theme with gradient backgrounds using Tailwind CSS
- **Responsive**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd reddit-client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check code quality

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and formatting

## How to Use

1. **Adding Subreddits**: Use the sidebar to add subreddit names (without the "r/" prefix)
2. **Viewing Posts**: Each subreddit appears as a column showing recent posts with media content
3. **Managing Columns**: Use the three-dot menu on each column to refresh or close it
4. **Media Content**: Images, videos, and GIFs are displayed inline within posts

## Project Structure

```
reddit-client/
├── public/           # Static assets (SVG icons)
├── src/
│   ├── components/   # React components
│   │   ├── Lane.jsx            # Individual subreddit column
│   │   ├── Sidebar.jsx         # Sidebar for adding subreddits
│   │   ├── lanecontainer.jsx   # Container for all columns
│   │   └── subredditpopup.jsx  # Popup for adding subreddits
│   ├── App.jsx       # Main application component
│   ├── main.jsx      # Application entry point
│   └── index.css     # Global styles
├── package.json      # Dependencies and scripts
└── vite.config.js    # Vite configuration
```

## Configuration

The project uses:
- **Vite** for fast development and building
- **Tailwind CSS** for styling with automatic purging
- **ESLint** for code quality with React-specific rules

## API Usage

This application uses Reddit's public JSON API endpoints:
- `https://www.reddit.com/r/{subreddit}/new.json` - Fetches new posts from a subreddit


## Known Issues
- Some rich embeds may not display properly due to iframe restrictions

## Future Enhancements

- User authentication for personalized feeds
- Comment viewing
- Post search and filtering
- Subreddit suggestions
- Keyboard shortcuts
- Offline support with caching
