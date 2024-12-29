"use client"

import React, {useEffect} from 'react'
import { useRouter } from 'next/navigation'; // Importar useRouter
import { UserAuth } from '@/utils/AuthContext'
import { useAlert } from '@/utils/AlertContext';

export const Authsection = () => {
    const { user, logOut, initialLoading } = UserAuth();
    const { mostrarAlerta } = useAlert();
    const router = useRouter(); // Inicializar el enrutador

    useEffect(() => {
        if (!initialLoading && !user) {
            router.push("/login");
        }
    }, [user, initialLoading, router]);

    if (initialLoading) {
        return <p>Verificando autenticación...</p>; // Spinner o mensaje de carga
    }

    const CerrarSesion = async () => {
        try {
            await logOut(); // Asegúrate de que logOut sea una función asíncrona si realiza operaciones como cerrar sesión en Firebase
            mostrarAlerta({
                bien: true,
                titulo: "¡Logout!",
                parrafo: "Sesion cerrada correctamente"
            });
            router.push('/login'); // Redirigir al login después de cerrar sesión
        } catch (err) {
            mostrarAlerta({
                bien: true,
                titulo: "¡Algo salio mal!",
                parrafo: "No se pudo cerrar la sesion"
            });
        }
    };

    return (
        <>
            <section id="auth-section" className="auth-section">
                <div className="container">
                    <form id="loginForm" className="input-group">
                        <h1 className="admin">Bienvenido al Área de Administración</h1>
                        <div className="menuCerrar">
                            <h2>Usuario Conectado es:</h2><h2 id="nombre">{user?.username || "Invitado"}</h2>
                            <button type="button" className="submit-btn" id="logout" onClick={() => CerrarSesion()}>Cerrar Sesion</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
