"use client"

import React, { useState, useEffect } from 'react';
import { ObtenerPost } from '@/firebase/postulaciones';
import './post.css'

const PostCortas = () => {
    const [playersPosts, setPlayersPosts] = useState([]);
    const [staffPosts, setStaffPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const players = await ObtenerPost("postPlayer");
                const staff = await ObtenerPost("postStaff");
                setPlayersPosts(players);
                setStaffPosts(staff);
            } catch (error) {
                console.error("Error al obtener las postulaciones:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderPlayerPosts = () => {
        return playersPosts.slice(0, 2).map((post, index) => (
            <div className="Post" key={`player-${index}`}>
                <img src="/Logo Warriors.jpeg" alt="Logo" />
                <h2>Player</h2>
                <div className="Requisitos">
                    <h3>Requisitos:</h3>
                    <p>Rango: {post.rango}</p>
                    <p>Edad mínima: {post.edadMinima}</p>
                    <p>Experiencia Previa: {post.experiencia ? 'Requerida' : 'No Requerida'}</p>
                    <p>Rol: {post.rol}</p>
                    <p>Disponibilidad Horaria:</p>
                    <p>{post.horario}</p>
                </div>
                <button type='button' className="btn-post">Postulate</button>
            </div>
        ));
    };

    const renderStaffPosts = () => {
        return staffPosts.slice(0, 1).map((post, index) => (
            <div className="Post" key={`staff-${index}`}>
                <img src="/Logo Warriors.jpeg" alt="Logo" />
                <h2>Staff Técnico</h2>
                <div className="Requisitos">
                    <h3>Requisitos:</h3>
                    <p>Edad mínima: {post.edadMinima}</p>
                    <p>Experiencia Previa: {post.experiencia ? 'Requerida' : 'No Requerida'}</p>
                    <p>Rol: {post.rol}</p>
                    {post.horario && (
                        <>
                            <p>Disponibilidad Horaria:</p>
                            <p>{post.horario}</p>
                        </>
                    )}
                </div>
                <button type='button' className="btn-post">Postulate</button>
            </div>
        ));
    };

    return (
        <section id='Postulaciones'>
            <div className="PostulacionesHTML">
                {loading ? (
                    <p className="loading">Cargando postulaciones...</p>
                ) : playersPosts.length === 0 && staffPosts.length === 0 ? (
                    <p className="no-postulaciones">No hay postulaciones disponibles en este momento.</p>
                ) : (
                    <>
                        {renderPlayerPosts()}
                        {renderStaffPosts()}
                    </>
                )}
            </div>
        </section>
    );
};

export default PostCortas;
