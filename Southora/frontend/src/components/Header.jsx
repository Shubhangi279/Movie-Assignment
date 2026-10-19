import { useState } from 'react';

export default function Header({ page, setPage, onSearch }) {
  const [query, setQuery] = useState('');

  function submitSearch(event) {
    event.preventDefault();
    onSearch(query);
  }

  const links = [
    { label: 'Home', value: 'home' },
    { label: 'Top Rated', value: 'top-rated' },
    { label: 'Upcoming', value: 'upcoming' }
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand" onClick={() => setPage('home')} aria-label="Southora home">
          <span className="brand-mark">S</span><span>SOUTHORA</span>
        </button>
        <nav className="nav-links" aria-label="Main navigation">
          {links.map((link) => (
            <button key={link.value} className={page === link.value ? 'nav-link active' : 'nav-link'} onClick={() => setPage(link.value)}>
              {link.label}
            </button>
          ))}
        </nav>
        <form className="search-form" onSubmit={submitSearch}>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search movies..." aria-label="Search movies" />
          <button type="submit" aria-label="Submit search">⌕</button>
        </form>
      </div>
    </header>
  );
}
