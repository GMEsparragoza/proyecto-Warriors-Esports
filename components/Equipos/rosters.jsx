"use client";

import React, { useState, useEffect } from "react";
import { ObtenerRosters } from "@/firebase/rosters";
import "./rosters.css";

export const Rosters = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Aseguramos que el estado de carga se establezca
                const rosters = await ObtenerRosters("roster");
                const players = await ObtenerRosters("usuario");
                setUsuarios(players || []); // Evita errores si la respuesta es null o undefined
                setEquipos(rosters || []);
            } catch (error) {
                console.error("Error al obtener los Equipos y Usuarios:", error);
            } finally {
                setLoading(false); // Detenemos el estado de carga incluso si hay error
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p className="loading">Cargando...</p>; // Mensaje de carga
    }

    if (equipos.length === 0) {
        return <p className="no-data">No hay equipos disponibles.</p>; // Mensaje si no hay equipos
    }

    const equiposConUsuarios = equipos.filter((equipo) =>
        usuarios.some((usuario) => usuario.idRoster === equipo.id)
    );

    if (equiposConUsuarios.length === 0) {
        return <p className="no-data">No hay equipos con usuarios asignados.</p>; // Mensaje si no hay equipos con usuarios
    }

    return (
        <div className="RostersContainer">
            {equiposConUsuarios.map((equipo) => {
                const usuariosRoster = usuarios.filter(
                    (usuario) => usuario.idRoster === equipo.id
                );

                return (
                    <div className="Equipo" key={equipo.id}>
                        <h2 className="EquipoTitle">{equipo.nombre}</h2>
                        <div className="EquipoOverlay">
                            <h3>{equipo.nombre}</h3>
                            <p>{equipo.description}</p>
                        </div>
                        <div className="EquipoContent">
                            {usuariosRoster.map((usuario) => (
                                <a
                                    key={usuario.nick}
                                    href={`/perfil/${usuario.nick}`}
                                    className="User"
                                >
                                    <img
                                        src="/Logo Warriors.jpeg"
                                        alt={`Logo de ${usuario.nick}`}
                                    />
                                    <h2>{usuario.nick}</h2>
                                    <h4>{usuario.rol}</h4>
                                </a>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
