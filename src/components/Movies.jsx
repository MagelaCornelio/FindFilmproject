import React from 'react'; // ¡Añade o confirma esta línea!
import styles from './Movies.module.css'

// Envolvemos el componente Movie en React.memo
const Movie = React.memo(function Movie({ title, year, poster }) {
    console.log('Rendering Movie:', title); // Añadimos un console.log para ver el efecto
    return (
        <li className={styles.movieItem}>
            <h3>{title}</h3>
            <p>{year}</p>
            <img src={poster} alt={title} />
        </li>
    )
});

// También envolvemos Movies en React.memo
export const Movies = React.memo(function Movies({ movies }) {
    console.log('Rendering Movies component'); // Añadimos un console.log
    const hasMovies = movies?.length > 0

    return (
        hasMovies
            ? (
                <ul className={styles.moviesList}>
                    {
                        movies.map(movie => (
                            <Movie
                                key={movie.id}
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
    )
});