"use client"

import { useEffect, useState } from 'react';
import { obtenerDatosFormularios } from '@/firebase/forms';
import { UserAuth } from '@/utils/AuthContext';
import { useRouter } from 'next/navigation';
import './forms.css'

export function Forms() {
    const [dataPlayers, setDataPlayers] = useState([]);
    const [dataStaff, setDataStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, initialLoading } = UserAuth();
    const router = useRouter(); // Inicializar el enrutador

    useEffect(() => {
        if (!initialLoading && !user) {
            localStorage.setItem('previousPath', window.location.pathname);
            router.push('/login');
        }
        const previousPath = localStorage.getItem('previousPath');
        if (previousPath === '/login') {
            localStorage.removeItem('previousPath');
        }

        const fetchData = async () => {
            const { dataPlayers, dataStaff } = await obtenerDatosFormularios();
            setDataPlayers(dataPlayers);
            setDataStaff(dataStaff);
            setLoading(false);
        };

        fetchData();
    }, [user, initialLoading, router]);

    if (initialLoading) {
        return <p className='verificando'>Verificando autenticación...</p>; // Spinner o mensaje de carga
    }

    if (loading) {
        return <p className="loading">Cargando...</p>; // Mensaje de carga
    }

    return (
        <div>
            <h1 className='titulo-tablas'>Postulaciones de Jugadores</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Edad</th>
                        <th>Nick</th>
                        <th>Twitter</th>
                        <th>Rango Actual</th>
                        <th>Rango Peak</th>
                        <th>Roles</th>
                        <th>Experiencia</th>
                    </tr>
                </thead>
                <tbody>
                    {dataPlayers.map((player, index) => (
                        <tr key={index}>
                            <td>{player.nombre}</td>
                            <td>{player.apellido}</td>
                            <td>{player.edad}</td>
                            <td>{player.nick}</td>
                            <td>{player.twitter}</td>
                            <td>{player.rangoActual}</td>
                            <td>{player.rangoPeak}</td>
                            <td>{player.roles}</td>
                            <td>{player.experiencia}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1 className='titulo-tablas'>Postulaciones de Staff</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Edad</th>
                        <th>Nick</th>
                        <th>Twitter</th>
                        <th>Rol</th>
                        <th>Experiencia</th>
                    </tr>
                </thead>
                <tbody>
                    {dataStaff.map((staff, index) => (
                        <tr key={index}>
                            <td>{staff.nombre}</td>
                            <td>{staff.apellido}</td>
                            <td>{staff.edad}</td>
                            <td>{staff.nick}</td>
                            <td>{staff.twitter}</td>
                            <td>{staff.rol}</td>
                            <td>{staff.experiencia}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
