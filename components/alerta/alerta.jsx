"use client"

import React from 'react'
import { useAlert } from '@/utils/AlertContext'
import './alerta.css'

export const Alerta = () => {
    const { alerta, ocultarAlerta } = useAlert();

    return (
        <>
            <div id="alertaContainer" className={alerta.activa ? 'alerta' : 'vanish'}>
                <div className="alerta-interna">
                    <i className={alerta.bien ? 'bx bxs-check-circle alerta-imagen' : 'vanish'} style={{color: '#f1af5d'}}></i>
                    <i className={!alerta.bien ? 'bx bxs-error alerta-imagen' : 'vanish'} style={{color: '#f1af5d'}} ></i>
                    <h2 id="titulo-alerta">{alerta.titulo}</h2>
                    <p id="p-alerta">{alerta.parrafo}</p>
                    <button id="button-alerta" onClick={() => ocultarAlerta()}>Aceptar</button>
                </div>
            </div>
        </>
    )
}
