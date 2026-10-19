import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 15000
});

export const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
export const BACKDROP_BASE = 'https://image.tmdb.org/t/p/w1280';

export async function getMovies(type, page = 1) {
  const response = await api.get(`/movies/${type}?page=${page}`);
  return response.data;
}

export async function searchMovies(query, page = 1) {
  const response = await api.get('/movies/search', { params: { query, page } });
  return response.data;
}

export async function getMovieDetails(id) {
  const response = await api.get(`/movies/${id}`);
  return response.data;
}
