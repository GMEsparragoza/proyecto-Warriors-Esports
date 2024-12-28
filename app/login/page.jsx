import React from 'react'
import './login.css'
import { Form } from './form'

export const metadata = {
    title: "Login - Warrior Esports",
    description: "Pagina de Inicio de Warrior Esports",
};

function page() {
    return (
        <>
            <div className="background">
                <section id="auth-section" className="auth-section">
                    <div className="container">
                        <div className="form-box">
                            <div className="button-box">
                                <div id="btn"></div>
                                <input type="button" value="Iniciar Sesión" className="toggle-btn" />
                            </div>
                            <Form/>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default page