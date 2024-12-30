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
            <div className="background-login">
                <section id="auth-section" className="auth-section-login">
                    <div className="container">
                        <div className="form-box">
                            <div className="button-box">
                                <div id="btn-login"></div>
                                <input type="button" value="Iniciar Sesión" className="toggle-btn-login" />
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