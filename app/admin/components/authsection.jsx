"use client"

import React from 'react'
import { UserAuth } from '@/utils/AuthContext'

export const Authsection = () => {
    const {user, logOut} = UserAuth();

    const CerrarSesion = () => {
        logOut();
        window.location.href = '/login';
    }

    return (
        <>
            <section id="auth-section" class="auth-section">
                <div class="container">
                    <form id="loginForm" class="input-group">
                        <h1 class="admin">Bienvenido al Area de Administracion</h1>
                        <div class="menuCerrar">
                            <h2>Usuario Conectado es:</h2><h2 id="nombre"></h2>
                            <button className="submit-btn" id="logout" onClick={() => CerrarSesion()}>Cerrar Sesion</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
