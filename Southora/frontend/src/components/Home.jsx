import MovieListing from './MovieListing.jsx';

export default function Home({ onMovieClick }) {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">LIGHTS. CAMERA. SOUTHORA.</span>
          <h1>Every story<br /><span>starts here.</span></h1>
          <p>Explore popular movies, revisit top-rated favourites, and find the next film for your watchlist.</p>
          <a href="#popular-movies" className="hero-button">Explore movies <span>→</span></a>
        </div>
        <div className="hero-decoration" aria-hidden="true"><span> S </span><i>✦</i></div>
      </section>
      <div id="popular-movies"><MovieListing title="Popular Movies" type="popular" onMovieClick={onMovieClick} /></div>
    </>
  );
}
