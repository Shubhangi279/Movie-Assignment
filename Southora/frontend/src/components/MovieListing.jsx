import { useEffect, useState } from 'react';
import { getMovies, searchMovies } from '../api.js';
import MovieCard from './MovieCard.jsx';
import Pagination from './Pagination.jsx';

export default function MovieListing({ title, type, query, onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function loadMovies() {
      setLoading(true);
      setError('');
      try {
        const data = query ? await searchMovies(query, page) : await getMovies(type, page);
        if (!cancelled) {
          setMovies(data.results || []);
          setTotalPages(data.total_pages || 1);
        }
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || 'Could not load movies. Check that the backend and API key are running.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadMovies();
    return () => { cancelled = true; };
  }, [type, query, page]);

  useEffect(() => { setPage(1); }, [type, query]);

  return (
    <section className="content-section">
      <div className="section-heading">
        <div><p className="eyebrow">YOUR MOVIE DESTINATION</p><h1>{title}</h1></div>
        {!loading && <span className="result-count">{movies.length} movies on this page</span>}
      </div>
      {loading && <p className="status-message">Loading movies...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && movies.length === 0 && <p className="status-message">No movies found.</p>}
      {!loading && !error && movies.length > 0 && (
        <>
          <div className="movie-grid">{movies.map((movie) => <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />)}</div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </section>
  );
}
