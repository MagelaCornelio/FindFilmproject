// src/components/MoviesList.jsx
import React from 'react';
import { MovieCard } from './MovieCard.jsx'; // Importamos MovieCard desde su propio archivo
import styles from './Movies.module.css';

export const MoviesList = React.memo(function MoviesList({ movies }) {
    // console.log('Rendering MoviesList component');
    const hasMovies = movies?.length > 0;

    return (
        hasMovies
            ? (
                <ul className={styles.moviesList}>
                    {
                        movies.map(movie => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                year={movie.year}
                                poster={movie.poster}
                            />
                        ))
                    }
                </ul>
            )
            : (
                <p className={styles.noMoviesMessage}>No se encontraron películas para esta búsqueda.</p>
            )
    );
});