import { useEffect, useState } from 'react';
import { BACKDROP_BASE, IMAGE_BASE, getMovieDetails } from '../api.js';

export default function MovieDetails({ movieId, onBack }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function loadDetails() {
      setLoading(true);
      setError('');
      try {
        const data = await getMovieDetails(movieId);
        if (!cancelled) setDetails(data);
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || 'Could not load movie details.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (movieId) loadDetails();
    return () => { cancelled = true; };
  }, [movieId]);

  if (loading) return <p className="status-message">Loading movie details...</p>;
  if (error) return <section className="content-section"><p className="error-message">{error}</p><button className="back-button" onClick={onBack}>← Back to movies</button></section>;
  if (!details?.movie) return null;

  const { movie, cast } = details;
  const backdrop = movie.backdrop_path ? `${BACKDROP_BASE}${movie.backdrop_path}` : '';
  const poster = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : '';
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'Year unavailable';

  return (
    <section className="details-page">
      <button className="back-button" onClick={onBack}>← Back to movies</button>
      <div className="details-hero" style={backdrop ? { backgroundImage: `linear-gradient(90deg, rgba(16,13,15,.98), rgba(16,13,15,.75), rgba(16,13,15,.45)), url(${backdrop})` } : {}}>
        {poster && <img src={poster} alt={`${movie.title} poster`} className="details-poster" />}
        <div className="details-copy">
          <p className="eyebrow">MOVIE DETAILS</p>
          <h1>{movie.title}</h1>
          <div className="details-meta"><span>{year}</span><span>★ {Number(movie.vote_average || 0).toFixed(1)} / 10</span><span>{movie.runtime ? `${movie.runtime} min` : 'Runtime unavailable'}</span></div>
          {movie.genres?.length > 0 && <div className="genre-list">{movie.genres.map((genre) => <span key={genre.id}>{genre.name}</span>)}</div>}
          <h3>Overview</h3><p className="overview">{movie.overview || 'No overview is available for this movie.'}</p>
          {movie.release_date && <p><strong>Release date:</strong> {movie.release_date}</p>}
        </div>
      </div>
      <section className="cast-section">
        <div className="section-heading"><div><p className="eyebrow">MEET THE PEOPLE</p><h2>Top Cast</h2></div></div>
        {cast?.length ? <div className="cast-grid">{cast.slice(0, 12).map((person) => <article className="cast-card" key={person.cast_id || person.credit_id}>
          {person.profile_path ? <img src={`${IMAGE_BASE}${person.profile_path}`} alt={person.name} loading="lazy" /> : <div className="cast-placeholder">{person.name?.charAt(0) || '?'}</div>}
          <strong>{person.name}</strong><span>{person.character || 'Cast member'}</span>
        </article>)}</div> : <p className="status-message">Cast details are not available.</p>}
      </section>
    </section>
  );
}
