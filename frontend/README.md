# HomelyHub Frontend

Premium home rental platform frontend built with React and Vite.

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router v7** - Client-side routing
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## Prerequisites

- Node.js 16+ and npm

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and update the `VITE_API_URL` to point to your backend:
- For local development: `VITE_API_URL=/api/v1` (uses Vite proxy)
- For production: `VITE_API_URL=https://your-backend-domain.com/api/v1`

## Development

Start the development server:
```bash
npm run dev
```

The app will run on `http://localhost:3000`

## Build for Production

Build the app:
```bash
npm run build
```

The build output will be in the `dist` folder.

Preview production build locally:
```bash
npm run preview
```

## Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - `VITE_API_URL` - Your backend API URL

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the app:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod --dir=dist
```

4. Set environment variables in Netlify dashboard:
   - `VITE_API_URL` - Your backend API URL

### Deploy to Other Platforms

The frontend is a static React app. You can deploy the `dist` folder to:
- AWS S3 + CloudFront
- GitHub Pages
- Firebase Hosting
- Cloudflare Pages
- Any static hosting service

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `/api/v1` (dev) or `https://api.example.com/api/v1` (prod) |
| `VITE_MAPBOX_TOKEN` | Mapbox API token (optional) | `pk.eyJ1...` |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps API key (optional) | `AIza...` |

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components
│   ├── store/          # Redux store and slices
│   ├── services/       # API services
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── styles/         # Global styles
│   ├── App.jsx         # Main app component
│   └── index.jsx       # Entry point
├── public/             # Static assets
├── dist/               # Production build output
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies and scripts
```

## Features

- 🔐 MongoDB-based authentication with JWT
- 🏠 Property listing and search
- 📅 Booking management
- ⭐ Reviews and ratings
- 💬 Real-time messaging
- 💳 Payment integration
- 📱 Responsive design
- 🌙 Dark mode support
- 🗺️ Map integration
- 🤖 AI chat assistant

## Support

For issues and questions, please open an issue on GitHub.
