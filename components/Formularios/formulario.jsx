"use client"

import React, { useState } from 'react'
import { agregarFormPlayer, agregarFormStaff } from '@/firebase/manejarFormulario'
import { useAlert } from '@/utils/AlertContext'
import './form.css'

export const Formulario = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [nick, setNick] = useState("");
    const [edad, setEdad] = useState("");
    const [twitter, setTwitter] = useState("");
    const [rangoActual, setRangoActual] = useState("");
    const [rangoPeak, setRangoPeak] = useState("");
    const [roles, setRoles] = useState("");
    const [rolStaff, setRolStaff] = useState(0);
    const [exp, setExp] = useState("");
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
        setNombre("");
        setApellido("");
        setEdad("");
        setNick("");
        setTwitter("");
        setRangoActual("");
        setRangoPeak("");
        setRoles("");
        setRolStaff("");
        setExp("");
    };

    const HandleFormPlayer = async () => {
        setLoading(true);
        if (!nombre || !apellido || !edad || !nick || !twitter || !rangoActual || !rangoPeak || !roles || !exp) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Datos faltantes!",
                parrafo: "Debe llenar todos los campos"
            });
            setLoading(false);
            return;
        }
        try {
            await agregarFormPlayer(nombre, apellido, edad, nick, rangoActual, rangoPeak, roles, exp);
            mostrarAlerta({
                bien: true,
                titulo: "¡Formulario enviado!",
                parrafo: "Se envio el formulario con exito"
            });
        } catch (err) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Error al enviar el formulario!",
                parrafo: "Error al enviar el formulario"
            });
            console.error("Error: ", err);
            setLoading(false);
        } finally {
            setNombre("");
            setApellido("");
            setEdad("");
            setNick("");
            setTwitter("");
            setRangoActual("");
            setRangoPeak("");
            setRoles("");
            setExp("");
        }
    }

    const HandleFormStaff = async () => {
        setLoading(true);
        if (!nombre || !apellido || !edadMinima || !nick || !twitter || !rolStaff || !exp) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Datos faltantes!",
                parrafo: "Debe llenar todos los campos"
            });
            setLoading(false);
            return;
        }
        try {
            await agregarFormStaff(nombre, apellido, edad, nick, rolStaff, exp);
            mostrarAlerta({
                bien: true,
                titulo: "¡Formulario enviado!",
                parrafo: "Se envio el formulario con exito"
            });
        } catch (err) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Error al enviar el formulario!",
                parrafo: "Error al enviar el formulario"
            });
            console.error("Error: ", err);
            setLoading(false);
        } finally {
            setNombre("");
            setApellido("");
            setEdad("");
            setNick("");
            setTwitter("");
            setRolStaff("");
            setExp("");
        }
    }

    return (
        <>
            <div className="container">
                <div className="form-box">
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
                    <form id="PlayerForm" className={playerForm ? 'input-group active' : 'input-group'}>
                        <input className="input-field" type="text" value={nombre} placeholder="Nombre" onChange={(e) => setNombre(e.target.value)} />
                        <input className="input-field" type="text" value={apellido} placeholder="Apellido" onChange={(e) => setApellido(e.target.value)} />
                        <input className="input-field" type="number" value={edad} placeholder="Edad" onChange={(e) => setEdad(e.target.value)} />
                        <input className="input-field" type="text" value={nick} placeholder="Nick" onChange={(e) => setNick(e.target.value)} />
                        <input className="input-field" type="url" value={twitter} placeholder="Twitter" onChange={(e) => setTwitter(e.target.value)} />
                        <input className="input-field" type="text" value={rangoActual} placeholder="Rango Actual" onChange={(e) => setRangoActual(e.target.value)} />
                        <input className="input-field" type="text" value={rangoPeak} placeholder="Rango Maximo" onChange={(e) => setRangoPeak(e.target.value)} />
                        <input className="input-field" type="text" value={roles} placeholder="Roles" onChange={(e) => setRoles(e.target.value)} />
                        <input className="input-field" type="text" value={exp} placeholder="Experiencia" onChange={(e) => setExp(e.target.value)} />
                        <button type="button" className="submit-btn" onClick={() => HandleFormPlayer()}>{loading ? "Enviando..." : "Enviar"}</button>
                    </form>
                    <form id="StaffForm" className={playerForm ? 'input-group' : 'input-group active'}>
                        <input className="input-field" type="text" value={nombre} placeholder="Nombre" onChange={(e) => setNombre(e.target.value)} />
                        <input className="input-field" type="text" value={apellido} placeholder="Apellido" onChange={(e) => setApellido(e.target.value)} />
                        <input className="input-field" type="number" value={edad} placeholder="Edad" onChange={(e) => setEdad(e.target.value)} />
                        <input className="input-field" type="text" value={nick} placeholder="Nick" onChange={(e) => setNick(e.target.value)} />
                        <input className="input-field" type="url" value={twitter} placeholder="Twitter" onChange={(e) => setTwitter(e.target.value)} />
                        <select value={rolStaff} onChange={(e) => setRolStaff(e.target.value)} className="RolStaff" id="RolStaff">
                            <option value="0">Selecciona</option>
                            <option value="1">Co-Ceo</option>
                            <option value="2">Director Deportivo</option>
                            <option value="3">Manager</option>
                            <option value="4">Psicologo Deportivo</option>
                            <option value="5">Proyect Manager</option>
                            <option value="6">Community Manager</option>
                            <option value="7">Head Coach</option>
                            <option value="8">Assistant Coach</option>
                            <option value="9">Performance Coach</option>
                            <option value="10">Analista</option>
                        </select>
                        <input className="input-field" type="text" value={exp} placeholder="Experiencia" onChange={(e) => setExp(e.target.value)} />
                        <button type="button" className="submit-btn" onClick={() => HandleFormStaff()}>{loading ? "Enviando..." : "Enviar"}</button>
                    </form>
                </div>
            </div>
        </>
    )
}
