"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'; // Importar useRouter
import { UserAuth } from '@/utils/AuthContext'
import { useAlert } from '@/utils/AlertContext';
import { handleDownload } from './download-excel';

export const Authsection = () => {
    const [excelData, setExcelData] = useState(false);
    const { user, logOut, initialLoading } = UserAuth();
    const { mostrarAlerta } = useAlert();
    const router = useRouter(); // Inicializar el enrutador

    useEffect(() => {
        const previousPath = localStorage.getItem('previousPath');
        if (previousPath === '/forms') {
            localStorage.removeItem('previousPath');
            router.push("/forms");
        }

        if (!initialLoading && !user) {
            router.push("/login");
        }
    }, [user, initialLoading, router]);

    if (initialLoading) {
        return <p className='verificando'>Verificando autenticación...</p>; // Spinner o mensaje de carga
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

    const HandleExcelData = async () => {
        if (!excelData) {
            setExcelData(true);
            await handleDownload();
            mostrarAlerta({
                bien: true,
                titulo: "¡Excel Descargado!",
                parrafo: "Se descargo el Excel correctamente"
            });
        }
        setExcelData(false);
    }

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
                <div className="container">
                    <form id="Formularios" className="input-group">
                        <h1 className="admin">Ver todos los formularios recibidos</h1>
                        <div className="menuCerrar">
                            <button type="button" className="submit-btn" id="Forms" onClick={() => router.push('/forms')}>Ver formularios</button>
                            <button type="button" className="submit-btn" id="FormsDesc" onClick={() => HandleExcelData()}>Descargar formularios</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
