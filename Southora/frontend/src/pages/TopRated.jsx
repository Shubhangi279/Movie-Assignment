import MovieListing from '../components/MovieListing.jsx';
export default function TopRated({ onMovieClick }) {
  return <MovieListing title="Top Rated Movies" type="top-rated" onMovieClick={onMovieClick} />;
}
