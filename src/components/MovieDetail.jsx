// src/components/MovieDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './MovieDetail.module.css'; // Crearemos este archivo de estilos
import { useDebounce } from '../hooks/useDebounce'; // Asegurarnos de que el path sea correcto

const API_KEY = '2d554717'; // ¡Recuerda tu API Key!

export function MovieDetail() {
    const { id } = useParams(); // Obtiene el parámetro 'id' de la URL
    const navigate = useNavigate(); // Hook para navegación programática
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Puedes usar useDebounce si quisieras retrasar la carga de detalles,
    // pero para un ID directo no es tan crítico como una búsqueda de texto.
    // const debouncedId = useDebounce(id, 300);

    useEffect(() => {
        if (!id) {
            setError("ID de película no proporcionado.");
            setLoading(false);
            return;
        }

        const fetchMovieDetail = async () => {
            try {
                setLoading(true);
                setError(null);
                // Petición a la API por ID de IMDB
                const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                if (data.Response === 'True') {
                    setMovie(data); // OMDB devuelve el objeto de película directamente
                } else {
                    setError(data.Error || "No se pudo encontrar la película.");
                }
            } catch (err) {
                console.error("Error fetching movie detail:", err);
                setError("Error al cargar los detalles de la película.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetail();
    }, [id]); // El efecto se ejecuta cuando el 'id' de la URL cambia

    if (loading) return <p className={styles.loadingMessage}>Cargando detalles de la película...</p>;
    if (error) return <p className={styles.errorMessage}>{error}</p>;
    if (!movie) return <p className={styles.errorMessage}>No se encontraron datos para esta película.</p>;

    return (
        <div className={styles.movieDetailContainer}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
                ← Volver a la búsqueda
            </button>
            <div className={styles.detailCard}>
                <img
                    src={movie.Poster === 'N/A' ? 'https://via.placeholder.com/300x450' : movie.Poster}
                    alt={movie.Title}
                    className={styles.poster}
                />
                <div className={styles.info}>
                    <h2>{movie.Title} ({movie.Year})</h2>
                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Actores:</strong> {movie.Actors}</p>
                    <p><strong>Género:</strong> {movie.Genre}</p>
                    <p><strong>Lanzamiento:</strong> {movie.Released}</p>
                    <p><strong>Duración:</strong> {movie.Runtime}</p>
                    <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
                    <p className={styles.plot}>{movie.Plot}</p>
                </div>
            </div>
        </div>
    );
}