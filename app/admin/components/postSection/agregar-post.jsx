"use client"

import React, { useState } from 'react'

export const Agregarpost = () => {
    const [idPost, setIDPost] = useState("");
    const [rango, setRango] = useState("");
    const [edadMinima, setEdadMinima] = useState("");
    const [exp, setExp] = useState("");
    const [rol, setRol] = useState("");
    const [horario, setHorario] = useState("");
    const [playerForm, setPlayerForm] = useState(true);

    const toggleForm = () => {
        setPlayerForm(!playerForm);
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
                            <div id="btn-validar"></div>
                            <input type="button" value="Players" className="toggle-btn" id="butPlayerValidar" onClick={() => toggleForm()}/>
                            <input type="button" value="Staff" className="toggle-btn" id="butStaffValidar" onClick={() => toggleForm()}/>
                        </div>
                        <form id="ValidarPlayerPost" className={playerForm ? "group-posts active" : 'group-posts'}>
                            <input className="field-posts" type="number" value={idPost} placeholder="ID Postulacion:" onChange={(e) => setIDPost(e.target.value)} />
                            <input className="field-posts" type="text" value={rango} placeholder="Rango:"
                                onChange={(e) => setRango(e.target.value)} />
                            <input className="field-posts" type="number" value={edadMinima} placeholder="Edad Minima:" onChange={(e) => setEdadMinima(e.target.value)} />
                            <input className="field-posts" type="text" value={exp} placeholder="Experiencia (1-Si/0-No):" onChange={(e) => setExp(e.target.value)} />
                            <input className="field-posts" type="text" value={rol} placeholder="Rol:"
                                onChange={(e) => setRol(e.target.value)} />
                            <input className="field-posts" type="text" value={horario} placeholder="Horario:"
                                onChange={(e) => setHorario(e.target.value)} />
                            <button type="button" className="submit-btn">Agregar</button>
                        </form>
                        <form id="ValidarStaffPost" className={playerForm ? 'group-posts' : 'group-posts active'}>
                            <input className="field-posts" type="number" value={idPost} placeholder="ID Postulacion:" onChange={(e) => setIDPost(e.target.value)} />
                            <input className="field-posts" type="number" value={edadMinima} placeholder="Edad Minima:" onChange={(e) => setEdadMinima(e.target.value)} />
                            <input className="field-posts" type="text" value={exp} placeholder="Experiencia (1-Si/0-No):" onChange={(e) => setExp(e.target.value)} />
                            <input className="field-posts" type="text" value={rol} placeholder="Rol:" onChange={(e) => setRol(e.target.value)} />
                            <input className="field-posts" type="text" value={horario} placeholder="Horario:" onChange={(e) => setHorario(e.target.value)} />
                            <button type="button" className="submit-btn">Agregar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
