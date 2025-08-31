// src/components/Search.jsx

import { useState, useRef, useEffect } from 'react' // Importamos useRef y useEffect
import styles from './Search.module.css'

export function Search({ onSearch }) {
    const [query, setQuery] = useState('')
    const [error, setError] = useState(null);
    const inputRef = useRef(null); // 1. Creamos una ref

    const handleSubmit = (event) => {
        event.preventDefault()
        if (query.trim().length < 3) {
            setError('Por favor, ingresa al menos 3 caracteres para buscar.');
            return;
        }
        setError(null);
        onSearch(query)
    }

    const handleChange = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        if (newQuery.trim().length >= 3) {
            setError(null);
        }
    }

    const handleClear = () => {
        setQuery('');
        setError(null);
        onSearch('');
        inputRef.current.focus(); // 3. Enfocamos el input después de limpiar
    }

    // 4. Usamos useEffect para enfocar el input en el primer render
    useEffect(() => {
        inputRef.current.focus();
    }, []); // Array de dependencias vacío, se ejecuta solo una vez

    return (
        <form className={styles.searchForm} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Busca tu película: Interstellar, The Matrix..."
                value={query}
                onChange={handleChange}
                className={error ? styles.inputError : ''}
                ref={inputRef} // 2. Asignamos la ref al input
            />
            {query && (
                <button type="button" onClick={handleClear} className={styles.clearButton}>
                    X
                </button>
            )}
            <button type="submit">Buscar</button>
            {error && <p className={styles.errorMessage}>{error}</p>}
        </form>
    )
}