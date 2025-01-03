"use client"

import React, { useState, useEffect } from 'react'
import { ObtenerUsuario } from '@/firebase/Perfil';
import './perfil.css'

export const Perfil = ({ nick }) => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const data = await ObtenerUsuario(nick); // Llama a la función externa
                setUsuario(data);
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuario();
    }, []);

    if (loading) {
        return <p className="loading-message">Cargando perfil...</p>;
    }

    if (!usuario) {
        return <p className="error-message">Error: No se pudo cargar el perfil.</p>;
    }

    // Función para procesar la experiencia y añadir saltos de línea
    const formatExperience = (experience) => {
        return experience.split("\\").map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    // Función para procesar la Descripcion y añadir saltos de línea
    const formatDescription = (descripcion) => {
        return descripcion.split("\\").map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img
                    src="/Logo Warriors.jpeg"
                    alt={`Foto de perfil de ${usuario.nombre}`}
                    className="profile-image"
                />
                <div className="profile-info">
                    <h1 id="userName">{usuario.nombre} {usuario.apellido}</h1>
                    <p id="userNick">@{usuario.nick || "Sin nick"}</p>
                    <span className="profile-role" id="userRole">
                        {usuario.rol || "Sin rol asignado"}
                    </span>
                </div>
            </div>
            <div className="profile-section">
                <h2>Descripción</h2>
                <p id="userDescription">
                    {formatDescription(usuario.descripcion)}
                </p>
            </div>
            <div className="profile-section">
                <h2>Experiencia</h2>
                <div id="userExperience">
                    {formatExperience(usuario.experiencia)}
                </div>
            </div>
        </div>
    );
}
