"use client"

import React, { useState } from 'react'
import { ModUser, verificarUsuario } from '@/firebase/manejarUsuario';
import { useAlert } from '@/utils/AlertContext';

export const Modificarusuario = () => {
    const [idUser, setIDuser] = useState("");
    const [nick, setNick] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [idRoster, setIDroster] = useState("");
    const [experiencia, setExperiencia] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [rol, setRol] = useState("");
    const { mostrarAlerta } = useAlert();
    const [loading, setLoading] = useState(false);

    const HandleModUser = async () => {
        setLoading(true);
        if (!idUser || !nick || !nombre || !apellido || !idRoster || !experiencia || !descripcion || !rol) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Datos faltantes!",
                parrafo: "Debe llenar todos los campos"
            });
            setLoading(false);
            return;
        }
        try {
            const result = await verificarUsuario(idUser);
            if(!result){
                mostrarAlerta({
                    bien: false,
                    titulo: "¡Usuario incorrecto!",
                    parrafo: "No se encontro el Usuario ingresado"
                });
                setLoading(false);
                return;
            }
            await ModUser(idUser, nick, nombre, apellido, idRoster, experiencia, descripcion, rol);
            mostrarAlerta({
                bien: true,
                titulo: "¡Usuario modificado!",
                parrafo: "Se modifico al Usuario con exito"
            });
        } catch (err) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Error al modificar el Usuario!",
                parrafo: "Error al modificar el Usuario"
            });
            console.error("Error: ", err);
            setLoading(false);
        } finally {
            setIDuser("");
            setNick("");
            setNombre("");
            setApellido("");
            setIDroster("");
            setExperiencia("");
            setDescripcion("");
            setRol("");
            setLoading(false);
        }
    }

    return (
        <>
            <div className="ModificarUsuario">
                <div className="container">
                    <div className="form-box">
                        <div className="titulo-form">
                            <h1>Modificar Usuario</h1>
                        </div>
                        <form id="ModificarUsuario" className="group-posts active">
                            <input className="field-posts" type="number" value={idUser} placeholder="ID Usuario:" onChange={(e) => setIDuser(e.target.value)} />
                            <input className="field-posts" type="text" value={nick} placeholder="Nick:" onChange={(e) => setNick(e.target.value)} />
                            <input className="field-posts" type="text" value={nombre} placeholder="Nombre:" onChange={(e) => setNombre(e.target.value)} />
                            <input className="field-posts" type="text" value={apellido} placeholder="Apellido:" onChange={(e) => setApellido(e.target.value)} />
                            <input className="field-posts" type="number" value={idRoster} placeholder="ID Roster:" onChange={(e) => setIDroster(e.target.value)} />
                            <input className="field-posts" type="text" value={experiencia} placeholder="Experiencia ('\' Salto de Linea):" onChange={(e) => setExperiencia(e.target.value)} />
                            <input className="field-posts" type="text" value={descripcion} placeholder="Descripcion:" onChange={(e) => setDescripcion(e.target.value)} />
                            <input className="field-posts" type="text" value={rol} placeholder="Rol:" onChange={(e) => setRol(e.target.value)} />
                            <button type="button" className="submit-btn" onClick={() => HandleModUser()}>{loading ? "Modificando..." : "Modificar"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
