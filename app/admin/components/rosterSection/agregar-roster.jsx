"use client"

import React, { useState } from 'react'
import { AddRoster } from '@/firebase/manejarRoster';
import { useAlert } from '@/utils/AlertContext';

export const Agregarroster = () => {
    const [idRoster, setIDRoster] = useState("");
    const [nombreRoster, setNombreRoster] = useState("");
    const [descRoster, setDescRoster] = useState("");
    const {mostrarAlerta} = useAlert();
    const [loading, setLoading] = useState(false);

    const HandleAddRoster = async () => {
        setLoading(true);
        if (!idRoster || !nombreRoster || !descRoster) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Datos faltantes!",
                parrafo: "Debe llenar todos los campos"
            });
            setLoading(false);
            return;
        }
        try {
            await AddRoster(idRoster, nombreRoster, descRoster);
            mostrarAlerta({
                bien: true,
                titulo: "¡Roster creado!",
                parrafo: "Se agrego el Roster con exito"
            });
        } catch (err) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Error al añadir el Roster!",
                parrafo: "Error al añadir el Roster"
            });
            console.error("Error: ", err);
            setLoading(false);
        } finally {
            setIDRoster("");
            setNombreRoster("");
            setDescRoster("");
            setLoading(false);
        }
    }

    return (
        <>
            <div className="AgregarRoster">
                <div className="container">
                    <div className="form-box">
                        <div className="titulo-form">
                            <h1>Agregar Roster</h1>
                        </div>
                        <form id="ValidarRoster" className="group-posts active">
                            <input className="field-posts" type="number" value={idRoster} placeholder="ID Roster:" onChange={(e) => setIDRoster(e.target.value)} />
                            <input className="field-posts" type="text" value={nombreRoster} placeholder="Nombre:" onChange={(e) => setNombreRoster(e.target.value)} />
                            <input className="field-posts" type="text" value={descRoster} placeholder="Descripcion:" onChange={(e) => setDescRoster(e.target.value)} />
                            <button type="button" className="submit-btn" onClick={() => HandleAddRoster()}>{loading ? "Agregando..." : "Agregar"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
