// src/App.jsx

import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Search } from './components/Search.jsx';
import { MovieDetail } from './components/MovieDetail.jsx';
import { About } from './components/About.jsx';
import { useDebounce } from './hooks/useDebounce.js';
import './App.css';
import styles from './components/Movies.module.css'; // Asegurarse de importar los estilos aquí si los necesitas para mensajes
import React from 'react';
import { useTheme } from './context/ThemeContext.jsx';
import { MoviesList } from './components/MoviesList.jsx'; // <-- Nuevo import

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

// **¡IMPORTANTE! Elimina las definiciones de MovieCard y MoviesList de aquí.**
// Ya están en sus propios archivos.

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setError('Comienza una nueva búsqueda.');
      setMovies([]);
      setLoading(false);
    } else {
      setError(null);
    }
  }, [setMovies, setLoading, setError]);

  useEffect(() => {
    if (debouncedSearchQuery.length === 0) {
      setMovies([]);
      // También podemos asegurar que no haya error residual si el query se vacía
      setError(null);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${debouncedSearchQuery}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.Response === 'True') {
          const newMovies = data.Search.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            // Si el póster es 'N/A', usa un placeholder genérico
            poster: movie.Poster === 'N/A' ? 'https://via.placeholder.com/150x225?text=No+Poster' : movie.Poster
          }));
          setMovies(newMovies);
        } else {
          setMovies([]);
          // Mostrar el mensaje de error de la API si no encuentra resultados
          setError(data.Error || "No se encontraron películas.");
        }
      } catch (err) { // Cambié 'error' por 'err' para evitar colisión con el estado 'error'
        console.error("Error fetching movies:", err);
        setError("Hubo un error al buscar películas. Intenta de nuevo más tarde.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

  }, [debouncedSearchQuery]);

  const { theme, toggleTheme } = useTheme();

  const HomePage = () => (
    <>
      <Search onSearch={handleSearch} />
      {loading && <p>Cargando películas...</p>}
      {error && <p className="error-message">{error}</p>} {/* Mostrar error si existe */}

      {/* Si no estamos cargando, no hay error y hay películas, mostramos la lista */}
      {!loading && !error && movies.length > 0 && <MoviesList movies={movies} />}
      {/* Si no estamos cargando, no hay error, no hay películas Y hay un query, mostramos "no encontradas" */}
      {!loading && !error && movies.length === 0 && searchQuery.length > 0 && !error && <p className={styles.noMoviesMessage}>No se encontraron películas para "{searchQuery}".</p>}
      {/* Si no estamos cargando, no hay error, no hay películas Y el query está vacío, mostramos "Comienza una búsqueda" */}
      {!loading && !error && movies.length === 0 && searchQuery.length === 0 && !error && <p className={styles.noMoviesMessage}>Comienza una búsqueda de películas.</p>}
    </>
  );

  return (
    <div className="page">
      <header className="app-header">
        <h1>Buscador de Películas</h1>
        <nav className="main-nav">
          <Link to="/" className="nav-link">Buscador</Link>
          <Link to="/about" className="nav-link">Acerca de</Link>
          <button onClick={toggleTheme} className="theme-toggle-button">
            {theme === 'light' ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
          </button>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetail API_KEY={API_KEY} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<p>404 - Página no encontrada</p>} />
        </Routes>
      </main>
    </div>
  );
}

const MemoizedSearch = React.memo(Search); // Esto debería ser export default App, el MemoizedSearch se usa internamente

export default App;