import MovieListing from '../components/MovieListing.jsx';
export default function Upcoming({ onMovieClick }) {
  return <MovieListing title="Upcoming Movies" type="upcoming" onMovieClick={onMovieClick} />;
}
