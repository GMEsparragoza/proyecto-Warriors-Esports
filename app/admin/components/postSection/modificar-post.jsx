"use client"

import React, { useState } from 'react'
import { useAlert } from '@/utils/AlertContext';
import { modificarPostPlayer, modificarPostStaff, verificarPost } from '@/firebase/manejarPost';

export const Modificarpost = () => {
    const [idPost, setIDPost] = useState("");
    const [rango, setRango] = useState("");
    const [edadMinima, setEdadMinima] = useState("");
    const [exp, setExp] = useState("");
    const [rol, setRol] = useState("");
    const [horario, setHorario] = useState("");
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
        setRango("");
        setEdadMinima("");
        setExp("");
        setRol("");
        setHorario("");
    };

    const ModPostPlayer = async () => {
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
            await modificarPostPlayer(idPost, rango, edadMinima, exp == 1 ? (true) : (false), rol, horario);
            mostrarAlerta({
                bien: true,
                titulo: "¡Postulacion modificada!",
                parrafo: "Se modifico la postulacion con exito"
            });
        } catch (err) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Error al modificar la postulacion!",
                parrafo: "Error al modificar la postulacion"
            });
            console.error(err);
            setLoading(false);
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

    const ModPostStaff = async () => {
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
            const result = await verificarPost(idPost, "postStaff");
            if(!result){
                mostrarAlerta({
                    bien: false,
                    titulo: "¡Postulacion incorrecta!",
                    parrafo: "No se encontro la postulacion ingresada"
                });
                setLoading(false);
                return;
            }
            await modificarPostStaff(idPost, edadMinima, exp == 1 ? (true) : (false), rol, horario);
            mostrarAlerta({
                bien: true,
                titulo: "¡Postulacion modificada!",
                parrafo: "Se modifico la postulacion con exito"
            });
        } catch (err) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Error al modificar la postulacion!",
                parrafo: "Error al modificar la postulacion"
            });
            console.error(err);
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
            <div className="modificarPostulaciones">
                <div className="container">
                    <div className="form-box">
                        <div className="titulo-form">
                            <h1>Modificar Postulaciones</h1>
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
                        <form id="ModificarPlayerPost" className={playerForm ? "group-posts active" : 'group-posts'}>
                            <input className="field-posts" type="number" value={idPost} placeholder="ID Postulacion:" onChange={(e) => setIDPost(e.target.value)} />
                            <input className="field-posts" type="text" value={rango} placeholder="Rango:" onChange={(e) => setRango(e.target.value)} />
                            <input className="field-posts" type="number" value={edadMinima} placeholder="Edad Minima:" onChange={(e) => setEdadMinima(e.target.value)} />
                            <input className="field-posts" type="text" value={exp} placeholder="Experiencia (1-Si/0-No):" onChange={(e) => setExp(e.target.value)} />
                            <input className="field-posts" type="text" value={rol} placeholder="Rol:" onChange={(e) => setRol(e.target.value)} />
                            <input className="field-posts" type="text" value={horario} placeholder="Horario:" onChange={(e) => setHorario(e.target.value)} />
                            <button type='button' className="submit-btn" onClick={() => ModPostPlayer()}>{loading ? "Modificando..." : "Modificar"}</button>
                        </form>
                        <form id="ModificarStaffPost" className={playerForm ? "group-posts" : 'group-posts active'}>
                            <input className="field-posts" type="number" value={idPost} placeholder="ID Postulacion:" onChange={(e) => setIDPost(e.target.value)} />
                            <input className="field-posts" type="number" value={edadMinima} placeholder="Edad Minima:" onChange={(e) => setEdadMinima(e.target.value)} />
                            <input className="field-posts" type="text" value={exp} placeholder="Experiencia (1-Si/0-No):" onChange={(e) => setExp(e.target.value)} />
                            <input className="field-posts" type="text" value={rol} placeholder="Rol:" onChange={(e) => setRol(e.target.value)} />
                            <input className="field-posts" type="text" value={horario} placeholder="Horario:" onChange={(e) => setHorario(e.target.value)} />
                            <button type='button' className="submit-btn" onClick={() => ModPostStaff()}>{loading ? "Modificando..." : "Modificar"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
