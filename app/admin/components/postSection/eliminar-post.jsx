"use client"

import React, { useState } from 'react'
import { useAlert } from '@/utils/AlertContext';
import { eliminarPostPlayer, eliminarPostStaff, verificarPost } from '@/firebase/manejarPost';

export const Eliminarpost = () => {
    const [idPost, setIDPost] = useState("");
    const [playerForm, setPlayerForm] = useState(true);
    const [selectedButton, setSelectedButton] = useState('Players');
    const { mostrarAlerta } = useAlert();
    const [loading, setLoading] = useState(false);

    const toggleForm = (button) => {
        if (selectedButton === button) {
            // Si el botón ya está activo, no hacer nada
            return;
        }
        setPlayerForm(!playerForm);
        setSelectedButton(button);
        setIDPost("");
    };

    const DelPostPlayer = async () => {
        setLoading(true);
        if(!idPost){
            mostrarAlerta({
                bien: false,
                titulo: "¡Falta el ID!",
                parrafo: "Debe ingresar el ID del formulario"
            });
            setLoading(false);
            return;
        }
        try {
            const result = await verificarPost(idPost, "postPlayer");
            if(!result){
                mostrarAlerta({
                    bien: false,
                    titulo: "¡Postulacion incorrecta!",
                    parrafo: "No se encontro la postulacion ingresada"
                });
                setLoading(false);
                return;
            }
            await eliminarPostPlayer(idPost);
            mostrarAlerta({
                bien: true,
                titulo: "¡Postulacion Eliminada!",
                parrafo: "Se elimino la postulacion con exito"
            });
        } catch (err) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Error al eliminar la postulacion!",
                parrafo: "Error al eliminar la postulacion"
            });
            console.error("Error: ", err);
            setLoading(false);
        } finally {
            setIDPost("");
            setLoading(false);
        }
    }

    const DelPostStaff = async () => {
        setLoading(true);
        if(!idPost){
            mostrarAlerta({
                bien: false,
                titulo: "¡Falta el ID!",
                parrafo: "Debe ingresar el ID del formulario"
            });
            setLoading(false);
            return;
        }
        try {
            const result = await verificarPost(idPost, "postStaff");
            console.log(result);
            if(!result){
                mostrarAlerta({
                    bien: false,
                    titulo: "¡Postulacion incorrecta!",
                    parrafo: "No se encontro la postulacion ingresada"
                });
                setLoading(false);
                return;
            }
            await eliminarPostStaff(idPost);
            mostrarAlerta({
                bien: true,
                titulo: "¡Postulacion eliminada!",
                parrafo: "Se elimino la postulacion con exito"
            });
        } catch (err) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Error al eliminar la postulacion!",
                parrafo: "Error al eliminar la postulacion"
            });
            console.error("Error: ", err);
            setLoading(false);
        } finally {
            setIDPost("");
            toggleForm('Players');
            setLoading(false);
        }
    }

    return (
        <>
            <div className="eliminarPostulaciones">
                <div className="container">
                    <div className="form-box">
                        <div className="titulo-form">
                            <h1>Eliminar Postulaciones</h1>
                        </div>
                        <div className="button-box">
                            <div
                                id="btn-validar"
                                style={{
                                    left: selectedButton === 'Players' ? '0' : '110px',
                                }}
                            ></div>
                            <input
                                type="button"
                                value="Players"
                                className={`toggle-btn ${selectedButton === 'Players' ? 'active' : ''}`}
                                id="butPlayerValidar"
                                onClick={() => toggleForm('Players')}
                            />
                            <input
                                type="button"
                                value="Staff"
                                className={`toggle-btn ${selectedButton === 'Staff' ? 'active' : ''}`}
                                id="butStaffValidar"
                                onClick={() => toggleForm('Staff')}
                            />
                        </div>
                        <form id="EliminarPlayerPost" className={playerForm ? "group-posts active" : 'group-posts'}>
                            <input className="field-posts" type="number" value={idPost} placeholder="ID Postulacion:" onChange={(e) => setIDPost(e.target.value)} />
                            <button type="button" className="submit-btn" onClick={() => DelPostPlayer()}>{loading ? "Eliminando..." : "Eliminar"}</button>
                        </form>
                        <form id="EliminarStaffPost" className={playerForm ? "group-posts" : 'group-posts active'}>
                            <input className="field-posts" type="number" value={idPost} placeholder="ID Postulacion:" onChange={(e) => setIDPost(e.target.value)} />
                            <button type="button" className="submit-btn" onClick={() => DelPostStaff()}>{loading ? "Eliminando..." : "Eliminar"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
