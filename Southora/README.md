# Southora — React + Express Movie App

A simple full-stack movie discovery website built for the Movie DB React assignment.

## Features
- Home / popular movies
- Top-rated movies
- Upcoming movies
- Global movie search
- Movie details and cast
- Pagination
- Responsive design
- Express backend that securely calls TMDB (API key is not placed in frontend code)
- No language selector or language filter in the UI

## Requirements
- Node.js 18 or newer
- A TMDB API key (the assignment PDF provides one, or create your own at https://www.themoviedb.org/)

## 1. Configure the backend
Open a terminal in the `backend` folder:

```bash
npm install
```

Copy `.env.example` to a new file named `.env`, then replace the value with your TMDB key:

```env
TMDB_API_KEY=your_actual_tmdb_key
PORT=5000
```

Start the backend:

```bash
npm run dev
```

Test it by opening `http://localhost:5000/api/health` in a browser. It should show that the backend is running.

## 2. Start the frontend
Open a **second terminal** in the `frontend` folder:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## API routes
- `GET /api/health`
- `GET /api/movies/popular?page=1`
- `GET /api/movies/top-rated?page=1`
- `GET /api/movies/upcoming?page=1`
- `GET /api/movies/search?query=avatar&page=1`
- `GET /api/movies/:id` (movie details and cast)

## Main frontend files
- `frontend/src/components/Header.jsx`
- `frontend/src/components/Footer.jsx`
- `frontend/src/components/Home.jsx`
- `frontend/src/components/MovieCard.jsx`
- `frontend/src/components/MovieListing.jsx`
- `frontend/src/components/Pagination.jsx`
- `frontend/src/pages/TopRated.jsx`
- `frontend/src/pages/Upcoming.jsx`
- `frontend/src/pages/SearchResults.jsx`
- `frontend/src/pages/MovieDetails.jsx`

## Notes
- The API key belongs in `backend/.env` only. Do not commit that file to a public repository.
- The frontend uses the backend at `http://localhost:5000/api`.
- For Codesandbox submission, configure the backend and environment variables as well; a frontend-only sandbox will not run the Express API by itself.
