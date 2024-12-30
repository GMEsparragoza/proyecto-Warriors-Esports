"use client"

import React, { useState, useEffect } from 'react'
import { UserAuth } from '@/utils/AuthContext';
import { useAlert } from '@/utils/AlertContext';
import { useRouter } from 'next/navigation'; // Importar useRouter

export const Form = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {handleLogin, loading, error, user, initialLoading} = UserAuth();
    const {mostrarAlerta} = useAlert();
    const router = useRouter(); // Inicializar el enrutador

    useEffect(() => {
        if (!initialLoading && user) {
            router.push("/admin");
        }
    }, [user, initialLoading, router]);

    if (initialLoading) {
        return <p className='verificando'>Verificando autenticación...</p>; // Spinner o mensaje de carga
    }

    const submitAuth = async (e) => {
        e.preventDefault();
        if(!email || !password){
            mostrarAlerta({
                bien: false,
                titulo: "¡Error al iniciar sesion!",
                parrafo: "Datos faltantes en el formulario."
            });
            return;
        }
        try {
            await handleLogin(email, password);
            mostrarAlerta({
                bien: true,
                titulo: "¡Sesion Iniciada!",
                parrafo: "Inicio de sesion realizado correctamente"
            });
            router.push('/admin');
        } catch (err) {
            console.error("Error en handleRegister:", err);
        }
    }

    return (
        <>
            <form id="loginForm" className="input-group">
                <input
                    type="email"
                    value={email}
                    className="input-field"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    value={password} 
                    className="input-field" 
                    placeholder="Contraseña" 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' onClick={(e) => submitAuth(e)} className="submit-btn">
                    {loading ? "Iniciando Sesion..." : "Iniciar Sesion"}
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </>
    )
}
