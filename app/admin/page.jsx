import React from 'react'
import { Authsection } from './components/authsection'
import './admin.css'

export const metadata = {
    title: "Administracion - Warrior Esports",
    description: "Pagina de Inicio de Warrior Esports",
};

const page = () => {
    return (
        <>
            <div className="background">
                <Authsection/>
            </div>
        </>
    )
}

export default page