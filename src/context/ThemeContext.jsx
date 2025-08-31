// src/context/ThemeContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Creamos el Contexto
// El valor por defecto (aquí 'light') se usa si un componente intenta leer el contexto
// sin un Provider que lo envuelva.
const ThemeContext = createContext('light');

// 2. Creamos un Custom Hook para consumir el contexto fácilmente
export const useTheme = () => {
    return useContext(ThemeContext);
};

// 3. Creamos un Provider que envolverá a nuestra aplicación
// Este Provider gestionará el estado del tema y lo proporcionará a sus hijos.
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        // Intentamos leer el tema del localStorage en el primer render
        const storedTheme = localStorage.getItem('app-theme');
        return storedTheme ? storedTheme : 'dark'; // 'dark' por defecto si no hay nada en localStorage
    });

    // Guardar el tema en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('app-theme', theme);
        document.body.className = theme; // Aplicar la clase al body para estilos globales
    }, [theme]);

    // Función para alternar el tema
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // El valor que se pasará a todos los componentes que usen `useTheme`
    const contextValue = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children} {/* Renderizamos los componentes hijos */}
        </ThemeContext.Provider>
    );
}