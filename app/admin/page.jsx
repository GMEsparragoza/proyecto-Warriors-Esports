import React from 'react'
import { Authsection } from './components/auth-section'
import { Agregarpost } from './components/postSection/agregar-post';
import { Modificarpost } from './components/postSection/modificar-post';
import { Eliminarpost } from './components/postSection/eliminar-post';
import { Agregarroster } from './components/rosterSection/agregar-roster';
import { Modificarroster } from './components/rosterSection/modificar-roster';
import { Eliminarroster } from './components/rosterSection/eliminar-roster';
import { Agregarusuario } from './components/usersSection/agregar-usuario';
import { Modificarusuario } from './components/usersSection/modificar-usuario';
import { Eliminarusuario } from './components/usersSection/eliminar-usuario';
import { Adminsection } from './components/admin-section';
import { Footer } from '@/components/Footer/footer';
import './admin.css'

export const metadata = {
    title: "Administracion - Warrior Esports",
    description: "Pagina de Inicio de Warrior Esports",
};

const page = () => {
    return (
        <>
            <div className="background">
                <Authsection />
                <section className="Post-section">
                    <Agregarpost/>
                    <Modificarpost/>
                    <Eliminarpost/>
                </section>
                <section className="Roster-section">
                    <Agregarroster/>
                    <Modificarroster/>
                    <Eliminarroster/>
                </section>
                <section className="Usuario-section">
                    <Agregarusuario/>
                    <Modificarusuario/>
                    <Eliminarusuario/>
                </section>
                <Adminsection />
            </div>
            <Footer />
        </>
    )
}

export default page