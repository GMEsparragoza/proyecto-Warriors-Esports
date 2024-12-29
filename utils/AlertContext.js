"use client";

import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const AlertContext = createContext();

// Proveedor del contexto
export const AlertProvider = ({ children }) => {
    const [alerta, setAlerta] = useState({
        activa: false,
        bien: false,
        titulo: "",
        parrafo: ""
    });

    // Función para mostrar la alerta
    const mostrarAlerta = ({ bien, titulo, parrafo }) => {
        setAlerta({
            activa: true,
            bien,
            titulo,
            parrafo
        });
    };

    // Función para ocultar la alerta y vaciar los datos
    const ocultarAlerta = () => {
        setAlerta({
            activa: false,
            bien: false,
            titulo: "",
            parrafo: ""
        });
    };

    return (
        <AlertContext.Provider value={{ alerta, mostrarAlerta, ocultarAlerta }}>
            {children}
        </AlertContext.Provider>
    );
};

// Hook para usar el contexto
export const useAlert = () => {
    return useContext(AlertContext);
};