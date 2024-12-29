"use client"

import React, {useState} from 'react'

export const Eliminarpost = () => {
    const [idPost, setIDPost] = useState("");

    return (
        <>
            <div className="eliminarPostulaciones">
                <div className="container">
                    <div className="form-box">
                        <div className="titulo-form">
                            <h1>Eliminar Postulaciones</h1>
                        </div>
                        <div className="button-box">
                            <div id="btn-Eliminar"></div>
                            <input type="button" value="Players" className="toggle-btn" id="butPlayerEliminar" />
                            <input type="button" value="Staff" className="toggle-btn" id="butStaffEliminar" />
                        </div>
                        <form id="EliminarPlayerPost" className="group-posts active">
                            <input className="field-posts" type="number" value={idPost} placeholder="ID Postulacion:" onChange={(e) => setIDPost(e.target.value)}/>
                            <button type="submit" className="submit-btn">Eliminar</button>
                        </form>
                        <form id="EliminarStaffPost" className="group-posts">
                            <input className="field-posts" type="number" value={idPost} placeholder="ID Postulacion:" onChange={(e) => setIDPost(e.target.value)}/>
                            <button type="submit" className="submit-btn">Eliminar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
