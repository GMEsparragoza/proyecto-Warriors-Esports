import React from 'react'
import { Formulario } from '@/components/Formularios/formulario'
import './form.css'

function page() {
    return (
        <>
            <div className="background-form">
                <section id="auth-section" className="auth-section">
                    <Formulario/>
                </section>
            </div>
        </>
    )
}

export default page