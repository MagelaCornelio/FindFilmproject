// src/components/About.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './About.module.css'; // Crearemos este archivo de estilos

export function About() {
    const navigate = useNavigate();

    return (
        <div className={styles.aboutContainer}>
            <h2>Acerca de nuestro Buscador de Películas</h2>
            <p>
                Esta aplicación fue creada como parte de un curso para aprender React,
                demostrando cómo construir interfaces de usuario interactivas y dinámicas.
            </p>
            <p>
                Utilizamos la API de OMDB para obtener información de películas.
            </p>
            <button onClick={() => navigate('/')} className={styles.backButton}>
                ← Ir a la búsqueda
            </button>
        </div>
    );
}