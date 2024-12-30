"use client"

import React, { useState } from 'react'
import { DelRoster, verificarRoster } from '@/firebase/manejarRoster';
import { useAlert } from '@/utils/AlertContext';

export const Eliminarroster = () => {
    const [idRoster, setIDRoster] = useState("");
    const { mostrarAlerta } = useAlert();
    const [loading, setLoading] = useState(false);

    const HandleDelRoster = async () => {
        setLoading(true);
        if (!idRoster) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Datos faltantes!",
                parrafo: "Ingrese el ID del roster a eliminar"
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
            await DelRoster(idRoster);
            mostrarAlerta({
                bien: true,
                titulo: "¡Roster eliminado!",
                parrafo: "Se elimino el Roster con exito"
            });
        } catch (err) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Error al eliminar el Roster!",
                parrafo: "Error al eliminar el Roster"
            });
            console.error("Error: ", err);
            setLoading(false);
        } finally {
            setIDRoster("");
            setLoading(false);
        }
    }

    return (
        <>
            <div className="EliminarRoster">
                <div className="container">
                    <div className="form-box">
                        <div className="titulo-form">
                            <h1>Eliminar Roster</h1>
                        </div>
                        <form id="EliminarRoster" className="group-posts active">
                            <input className="field-posts" type="number" value={idRoster} placeholder="ID Roster:" onChange={(e) => setIDRoster(e.target.value)} />
                            <button type="button" className="submit-btn" onClick={() => HandleDelRoster()}>{loading ? "Eliminando..." : "Eliminar"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
