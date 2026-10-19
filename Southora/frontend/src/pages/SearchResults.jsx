import MovieListing from '../components/MovieListing.jsx';
export default function SearchResults({ query, onMovieClick }) {
  return <MovieListing title={`Search results for “${query}”`} query={query} onMovieClick={onMovieClick} />;
}
