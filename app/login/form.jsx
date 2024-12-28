"use client"

import React, { useState } from 'react'
import { UserAuth } from '@/utils/AuthContext';

export const Form = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {HandleLogin, loading, message, error} = UserAuth();

    const submitAuth = async (e) => {
        e.preventDefault();
        await HandleLogin(email, password);
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
                <button type='submit' onClick={() => submitAuth()} className="submit-btn">
                    {loading ? "Iniciando Sesion..." : "Iniciar Sesion"}
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {message && <p style={{ color: "green" }}>{message}</p>}
            </form>
        </>
    )
}
