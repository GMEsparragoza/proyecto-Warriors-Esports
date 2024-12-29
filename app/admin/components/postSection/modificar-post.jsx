"use client"

import React, {useState} from 'react'

export const Modificarpost = () => {
    const [idPost, setIDPost] = useState("");
    const [rango, setRango] = useState("");
    const [edadMinima, setEdadMinima] = useState("");
    const [exp, setExp] = useState("");
    const [rol, setRol] = useState("");
    const [horario, setHorario] = useState("");

    return (
        <>
            <div className="modificarPostulaciones">
                <div className="container">
                    <div className="form-box">
                        <div className="titulo-form">
                            <h1>Modificar Postulaciones</h1>
                        </div>
                        <div className="button-box">
                            <div id="btn-Modificar"></div>
                            <input type="button" value="Players" className="toggle-btn" id="butPlayerModificar" />
                            <input type="button" value="Staff" className="toggle-btn" id="butStaffModificar" />
                        </div>
                        <form id="ModificarPlayerPost" className="group-posts active">
                            <input className="field-posts" type="number" value={idPost} placeholder="ID Postulacion:" onChange={(e) => setIDPost(e.target.value)} />
                            <input className="field-posts" type="text" value={rango} placeholder="Rango:"
                                onChange={(e) => setRango(e.target.value)} />
                            <input className="field-posts" type="number" value={edadMinima} placeholder="Edad Minima:" onChange={(e) => setEdadMinima(e.target.value)} />
                            <input className="field-posts" type="text" value={exp} placeholder="Experiencia (1-Si/0-No):" onChange={(e) => setExp(e.target.value)} />
                            <input className="field-posts" type="text" value={rol} placeholder="Rol:"
                                onChange={(e) => setRol(e.target.value)} />
                            <input className="field-posts" type="text" value={horario} placeholder="Horario:"
                                onChange={(e) => setHorario(e.target.value)} />
                            <button type="submit" className="submit-btn">Modificar</button>
                        </form>
                        <form id="ModificarStaffPost" className="group-posts">
                            <input className="field-posts" type="number" name="idPost" placeholder="ID Postulacion:" />
                            <input className="field-posts" type="number" name="edadMinima" placeholder="Edad Minima:" />
                            <input className="field-posts" type="text" name="experiencia" placeholder="Experiencia (1-Si/0-No):" />
                            <input className="field-posts" type="text" name="rol" placeholder="Rol:" />
                            <input className="field-posts" type="text" name="horario" placeholder="Horario:" />
                            <input type="submit" className="submit-btn" value="Modificar" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
