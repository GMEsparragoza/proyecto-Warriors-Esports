"use client"

import React, { useState } from 'react'
import { agregarPostPlayer, agregarPostStaff } from '@/firebase/manejarPost';
import { useAlert } from '@/utils/AlertContext';

export const Agregarpost = () => {
    const [idPost, setIDPost] = useState("");
    const [rango, setRango] = useState("");
    const [edadMinima, setEdadMinima] = useState("");
    const [exp, setExp] = useState("");
    const [rol, setRol] = useState("");
    const [horario, setHorario] = useState("");
    const [playerForm, setPlayerForm] = useState(true);
    const [selectedButton, setSelectedButton] = useState('Players');
    const {mostrarAlerta} = useAlert();
    const [loading, setLoading] = useState(false);

    const toggleForm = (button) => {
        if (selectedButton === button) {
            // Si el botón ya está activo, no hacer nada
            return;
        }
        setPlayerForm(!playerForm);
        setSelectedButton(button);
        setIDPost("");
        setRango("");
        setEdadMinima("");
        setExp("");
        setRol("");
        setHorario("");
    };

    const PostPlayer = async () => {
        setLoading(true);
        if(!idPost || !rango || !edadMinima || !rol || !horario || !exp){
            mostrarAlerta({
                bien: false,
                titulo: "¡Datos faltantes!",
                parrafo: "Debe llenar todos los campos"
            });
            setLoading(false);
            return;
        }
        if (exp !== '1' && exp !== '0') {
            mostrarAlerta({
                bien: false,
                titulo: "¡Experiencia no Valida!",
                parrafo: "Ingrese 1 para 'Requerida' o 0 para 'No Requerida'"
            });
            setLoading(false);
            return;
        }
        try {
            await agregarPostPlayer(idPost, rango, edadMinima, exp ? (true) : (false), rol, horario);
            mostrarAlerta({
                bien: true,
                titulo: "¡Postulacion creada!",
                parrafo: "Se agrego la postulacion con exito"
            });
        } catch (err) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Error al eliminar la postulcion!",
                parrafo: "Error al eliminar la postulacion"
            });
            console.error("Error: ", err);
        } finally {
            setIDPost("");
            setRango("");
            setEdadMinima("");
            setExp("");
            setRol("");
            setHorario("");
            setLoading(false);
        }
    }

    const PostStaff = async () => {
        setLoading(true);
        if(!idPost || !edadMinima || !rol || !horario || !exp){
            mostrarAlerta({
                bien: false,
                titulo: "¡Datos faltantes!",
                parrafo: "Debe llenar todos los campos"
            });
            setLoading(false);
            return;
        }
        if (exp !== '1' && exp !== '0') {
            mostrarAlerta({
                bien: false,
                titulo: "¡Experiencia no Valida!",
                parrafo: "Ingrese 1 para 'Requerida' o 0 para 'No Requerida'"
            });
            setLoading(false);
            return;
        }
        try {
            await agregarPostStaff(idPost, edadMinima, exp ? (true) : (false), rol, horario);
            mostrarAlerta({
                bien: true,
                titulo: "¡Postulacion creada!",
                parrafo: "Se agrego la postulacion con exito"
            });
        } catch (err) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Error al añadir la postulacion!",
                parrafo: "Error al añadir la postulacion"
            });
            console.error("Error: ", err);
            setLoading(false);
        } finally {
            setIDPost("");
            setEdadMinima("");
            setExp("");
            setRol("");
            setHorario("");
            toggleForm('Players');
            setLoading(false);
        }
    }

    return (
        <>
            <div className="agregarPostulaciones">
                <div className="container">
                    <div className="form-box">
                        <div className="titulo-form">
                            <h1>Agregar Postulaciones</h1>
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
                        <form id="ValidarPlayerPost" className={playerForm ? "group-posts active" : 'group-posts'}>
                            <input className="field-posts" type="number" value={idPost} placeholder="ID Postulacion:" onChange={(e) => setIDPost(e.target.value)} />
                            <input className="field-posts" type="text" value={rango} placeholder="Rango:"
                                onChange={(e) => setRango(e.target.value)} />
                            <input className="field-posts" type="number" value={edadMinima} placeholder="Edad Minima:" onChange={(e) => setEdadMinima(e.target.value)} />
                            <input className="field-posts" type="number" value={exp} placeholder="Experiencia (1-Requerida/0-No Requerida):" onChange={(e) => setExp(e.target.value)} />
                            <input className="field-posts" type="text" value={rol} placeholder="Rol:"
                                onChange={(e) => setRol(e.target.value)} />
                            <input className="field-posts" type="text" value={horario} placeholder="Horario:"
                                onChange={(e) => setHorario(e.target.value)} />
                            <button type="button" className="submit-btn" onClick={() => PostPlayer()}>{loading ? "Agregando..." : "Agregar"}</button>
                        </form>
                        <form id="ValidarStaffPost" className={playerForm ? 'group-posts' : 'group-posts active'}>
                            <input className="field-posts" type="number" value={idPost} placeholder="ID Postulacion:" onChange={(e) => setIDPost(e.target.value)} />
                            <input className="field-posts" type="number" value={edadMinima} placeholder="Edad Minima:" onChange={(e) => setEdadMinima(e.target.value)} />
                            <input className="field-posts" type="number" value={exp} placeholder="Experiencia (1-Requerida/0-No Requerida):" onChange={(e) => setExp(e.target.value)} />
                            <input className="field-posts" type="text" value={rol} placeholder="Rol:" onChange={(e) => setRol(e.target.value)} />
                            <input className="field-posts" type="text" value={horario} placeholder="Horario:" onChange={(e) => setHorario(e.target.value)} />
                            <button type="button" className="submit-btn" onClick={() => PostStaff()}>{loading ? "Agregando..." : "Agregar"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
