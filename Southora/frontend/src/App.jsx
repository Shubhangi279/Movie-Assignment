import { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import TopRated from './pages/TopRated.jsx';
import Upcoming from './pages/Upcoming.jsx';
import SearchResults from './pages/SearchResults.jsx';
import MovieDetails from './pages/MovieDetails.jsx';

export default function App() {
  const [page, setPage] = useState('home');
  const [searchText, setSearchText] = useState('');
  const [movieId, setMovieId] = useState(null);
  const [searchVersion, setSearchVersion] = useState(0);

  function handleSearch(value) {
    const query = value.trim();
    if (!query) return;
    setSearchText(query);
    setSearchVersion((number) => number + 1);
    setPage('search');
  }

  function openMovie(id) {
    setMovieId(id);
    setPage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="app-shell">
      <Header page={page} setPage={setPage} onSearch={handleSearch} />
      <main className="main-content">
        {page === 'home' && <Home onMovieClick={openMovie} />}
        {page === 'top-rated' && <TopRated onMovieClick={openMovie} />}
        {page === 'upcoming' && <Upcoming onMovieClick={openMovie} />}
        {page === 'search' && <SearchResults key={`${searchVersion}`} query={searchText} onMovieClick={openMovie} />}
        {page === 'details' && <MovieDetails movieId={movieId} onBack={() => setPage('home')} />}
      </main>
      <Footer />
    </div>
  );
}
