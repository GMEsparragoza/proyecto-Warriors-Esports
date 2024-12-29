import React from 'react'
import { Authsection } from './components/auth-section'
import { Agregarpost } from './components/postSection/agregar-post';
import { Modificarpost } from './components/postSection/modificar-post';
import { Eliminarpost } from './components/postSection/eliminar-post';
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
                <Adminsection />
                <Footer />
            </div>
        </>
    )
}

export default page