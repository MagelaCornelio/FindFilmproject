// src/components/MovieCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Movies.module.css'; // Asumiendo que Movies.module.css tiene los estilos de MovieCard

export const MovieCard = React.memo(function MovieCard({ id, title, year, poster }) {
    // console.log('Rendering MovieCard:', title);
    return (
        <li className={styles.movieItem}>
            <Link to={`/movie/${id}`}>
                <h3>{title}</h3>
                <p>{year}</p>
                <img src={poster} alt={title} />
            </Link>
        </li>
    )
});