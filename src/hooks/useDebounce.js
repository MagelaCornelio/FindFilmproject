// src/hooks/useDebounce.js

import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
    // Estado para almacenar el valor "debounceado"
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Establecer un temporizador que actualiza debouncedValue después del delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Función de limpieza:
        // Si 'value' o 'delay' cambian (o el componente se desmonta)
        // limpia el temporizador anterior para evitar que se ejecute con un valor obsoleto.
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Solo re-ejecuta el efecto si 'value' o 'delay' cambian

    return debouncedValue;
}
