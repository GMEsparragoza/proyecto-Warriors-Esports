"use client"

import Link from 'next/link'
import React, {useState} from 'react'
import { UserAuth } from '@/utils/AuthContext'
import './navbar.css'

export const Navbar = () => {
    const [sideBar, setSideBar] = useState(false);
    const { user } = UserAuth();

    function showSidebar() {
        setSideBar(true);
    }
    function hideSidebar() {
        setSideBar(false);
    }
    return (
        <>
            <nav id="navbar">
                <ul className={sideBar ? 'sidebar' : 'vanish'}>
                    <li className="logo">
                        <img src="/Logo Warriors.jpeg" alt="Logo-Warriors" />
                        <h2 className="side-nav-titulo">Warriors Esports</h2>
                    </li>
                    <li onClick={() => hideSidebar()}><button className="x-button"></button></li>
                    <li><Link className="side-nav-titulo" href="/">Inicio</Link></li>
                    <li><Link className="side-nav-titulo" href="/equipos">Equipos</Link></li>
                    <li><Link className="side-nav-titulo" href="/postulaciones">Postulaciones</Link></li>
                    <li>
                        <Link className="side-nav-titulo botonSide" href={user ? '/admin':'/login'}>{user ? 'Admin':'Iniciar Sesion'}</Link>
                    </li>
                </ul>
                <div className="navbar">
                    <div className="logo">
                        <img src="/Logo Warriors.jpeg" alt="Logo-Warriors" />
                        <h2 className="nav-titulo">Warriors Esports</h2>
                    </div>
                    <ul>
                        <li className="hideOnmobile"><Link className="nav-titulo" href="/">Inicio</Link></li>
                        <li className="hideOnmobile"><Link className="nav-titulo" href="/equipos">Equipos</Link></li>
                        <li className="hideOnmobile"><Link className="nav-titulo" href="/postulaciones">Postulaciones</Link></li>
                        <li className="hideOnmobile">
                            <Link className="nav-titulo botonNav" href={user ? '/admin':'/login'}>{user ? 'Admin':'Iniciar Sesion'}</Link>
                        </li>
                        <li className="Boton-SideBar" onClick={() => showSidebar()}>
                            <div className="menu-icon">
                                <div className="bar"></div>
                                <div className="bar"></div>
                                <div className="bar"></div>
                            </div>
                        </li>
                    </ul>
                </div >
            </nav >
        </>
    )
}
