"use client"

import React, { useState } from 'react'
import { ModRoster, verificarRoster } from '@/firebase/manejarRoster';
import { useAlert } from '@/utils/AlertContext';

export const Modificarroster = () => {
    const [idRoster, setIDRoster] = useState("");
    const [nombreRoster, setNombreRoster] = useState("");
    const [descRoster, setDescRoster] = useState("");
    const { mostrarAlerta } = useAlert();
    const [loading, setLoading] = useState(false);

    const HandleModRoster = async () => {
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
            const result = await verificarRoster(idRoster);
            if(!result){
                mostrarAlerta({
                    bien: false,
                    titulo: "¡Roster incorrecto!",
                    parrafo: "No se encontro el Roster ingresado"
                });
                setLoading(false);
                return;
            }
            await ModRoster(idRoster, nombreRoster, descRoster);
            mostrarAlerta({
                bien: true,
                titulo: "¡Roster modificado!",
                parrafo: "Se modifico el Roster con exito"
            });
        } catch (err) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Error al modificar el Roster!",
                parrafo: "Error al modificar el Roster"
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
            <div className="ModificarRoster">
                <div className="container">
                    <div className="form-box">
                        <div className="titulo-form">
                            <h1>Modificar Roster</h1>
                        </div>
                        <form id="ModificarRoster" className="group-posts active">
                            <input className="field-posts" type="number" value={idRoster} placeholder="ID Roster:" onChange={(e) => setIDRoster(e.target.value)} />
                            <input className="field-posts" type="text" value={nombreRoster} placeholder="Nombre:" onChange={(e) => setNombreRoster(e.target.value)} />
                            <input className="field-posts" type="text" value={descRoster} placeholder="Descripcion:" onChange={(e) => setDescRoster(e.target.value)} />
                            <button type="button" className="submit-btn" onClick={() => HandleModRoster()}>{loading ? "Modificando..." : "Modificar"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
