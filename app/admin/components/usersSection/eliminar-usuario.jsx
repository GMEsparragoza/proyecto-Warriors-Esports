"use client"

import React, { useState } from 'react'
import { DelUser, verificarUsuario } from '@/firebase/manejarUsuario';
import { useAlert } from '@/utils/AlertContext';

export const Eliminarusuario = () => {
    const [idUser, setIDuser] = useState("");
    const { mostrarAlerta } = useAlert();
    const [loading, setLoading] = useState(false);

    const HandleDelUser = async () => {
        setLoading(true);
        if (!idUser) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Datos faltantes!",
                parrafo: "Ingrese el id del usuario  eliminar"
            });
            setLoading(false);
            return;
        }
        try {
            const result = await verificarUsuario(idUser);
            if (!result) {
                mostrarAlerta({
                    bien: false,
                    titulo: "¡Usuario incorrecto!",
                    parrafo: "No se encontro el Usuario ingresado"
                });
                setLoading(false);
                return;
            }
            await DelUser(idUser);
            mostrarAlerta({
                bien: true,
                titulo: "¡Usuario eliminado!",
                parrafo: "Se elimino al Usuario con exito"
            });
        } catch (err) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Error al eliminar el Usuario!",
                parrafo: "Error al eliminar el Usuario"
            });
            console.error("Error: ", err);
            setLoading(false);
        } finally {
            setIDuser("");
            setLoading(false);
        }
    }

    return (
        <>
            <div className="EliminarUsuario">
                <div className="container">
                    <div className="form-box">
                        <div className="titulo-form">
                            <h1>Eliminar Usuario</h1>
                        </div>
                        <form id="EliminarUsuario" className="group-posts active">
                            <input className="field-posts" type="number" value={idUser} placeholder="ID Usuario:" onChange={(e) => setIDuser(e.target.value)} />
                            <button type="button" className="submit-btn" onClick={() => HandleDelUser()}>{loading ? "Eliminando..." : "Eliminar"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
