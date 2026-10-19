import { IMAGE_BASE } from '../api.js';

export default function MovieCard({ movie, onClick }) {
  const poster = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : '';
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'Year unavailable';

  return (
    <button className="movie-card" onClick={() => onClick(movie.id)}>
      {poster ? <img className="movie-poster" src={poster} alt={`${movie.title} poster`} loading="lazy" /> : <div className="poster-placeholder">No poster</div>}
      <span className="movie-card-info">
        <strong>{movie.title || movie.name}</strong>
        <span className="movie-meta"><span>{year}</span><span className="rating">★ {Number(movie.vote_average || 0).toFixed(1)}</span></span>
      </span>
    </button>
  );
}
