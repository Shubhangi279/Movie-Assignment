import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE = 'https://api.themoviedb.org/3';
const SOUTH_LANGUAGES = ['te', 'ta', 'ml', 'kn']; // Telugu, Tamil, Malayalam, Kannada
const MOVIES_PER_PAGE = 10; // Change to 10 if you want fewer movies

app.use(cors());
app.use(express.json());

async function tmdbRequest(path, params = {}) {
  if (!API_KEY) {
    const error = new Error('TMDB_API_KEY is missing. Add it to backend/.env');
    error.status = 500;
    throw error;
  }
  const url = new URL(`${TMDB_BASE}${path}`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', 'en-US');
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.status_message || 'Movie service request failed');
    error.status = response.status;
    throw error;
  }
  return data;
}

// All listing pages use the four South Indian film languages only.
async function getSouthIndianMovies(sortBy, page, extraParams = {}) {
  const data = await tmdbRequest('/discover/movie', {
    region: 'IN',
    with_original_language: SOUTH_LANGUAGES.join('|'),
    sort_by: sortBy,
    page,
    ...extraParams
  });
  return {
    ...data,
    results: (data.results || []).slice(0, MOVIES_PER_PAGE),
    total_pages: Math.min(data.total_pages || 1, 500)
  };
}

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Southora backend is running' });
});

app.get('/api/movies/popular', async (req, res, next) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    res.json(await getSouthIndianMovies('popularity.desc', page));
  } catch (error) { next(error); }
});

app.get('/api/movies/top-rated', async (req, res, next) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    res.json(await getSouthIndianMovies('vote_average.desc', page, { 'vote_count.gte': 50 }));
  } catch (error) { next(error); }
});

app.get('/api/movies/upcoming', async (req, res, next) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const today = new Date().toISOString().slice(0, 10);
    res.json(await getSouthIndianMovies('release_date.asc', page, { 'release_date.gte': today }));
  } catch (error) { next(error); }
});

app.get('/api/movies/search', async (req, res, next) => {
  try {
    const query = String(req.query.query || '').trim();
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    if (!query) return res.status(400).json({ message: 'Please provide a movie search query.' });

    // Search a few TMDB pages and keep South Indian language movies only.
    const results = [];
    let totalPages = 1;
    for (let searchPage = page; searchPage < page + 4 && results.length < MOVIES_PER_PAGE; searchPage += 1) {
      const data = await tmdbRequest('/search/movie', { query, page: searchPage, include_adult: false, region: 'IN' });
      totalPages = data.total_pages || 1;
      results.push(...(data.results || []).filter(movie => SOUTH_LANGUAGES.includes(movie.original_language)));
      if (searchPage >= totalPages) break;
    }
    res.json({ page, results: results.slice(0, MOVIES_PER_PAGE), total_pages: Math.max(1, Math.ceil(results.length / MOVIES_PER_PAGE)) });
  } catch (error) { next(error); }
});

app.get('/api/movies/:id', async (req, res, next) => {
  try {
    const movieId = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(movieId) || movieId < 1) {
      return res.status(400).json({ message: 'A valid movie ID is required.' });
    }
    const [movie, credits] = await Promise.all([
      tmdbRequest(`/movie/${movieId}`),
      tmdbRequest(`/movie/${movieId}/credits`)
    ]);
    if (!SOUTH_LANGUAGES.includes(movie.original_language)) {
      return res.status(404).json({ message: 'This movie is not a South Indian language movie.' });
    }
    res.json({ movie, cast: credits.cast || [], crew: credits.crew || [] });
  } catch (error) { next(error); }
});

app.use((error, _req, res, _next) => {
  console.error(error.message);
  res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
});

app.listen(PORT, () => console.log(`Southora backend running at http://localhost:${PORT}`));
