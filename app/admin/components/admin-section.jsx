"use client"

import React, { useState } from 'react'
import { UserAuth } from '@/utils/AuthContext';
import { useAlert } from '@/utils/AlertContext';

export const Adminsection = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const { handleSignUp, saveUserData, loading, error } = UserAuth();
    const { mostrarAlerta } = useAlert();

    const handleRegister = async () => {
        if (!email || !password || !username) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Error al registrar usuario!",
                parrafo: "Faltan datos en el formulario"
            });
            return;
        }

        console.log("Ejecutando handleRegister");
        try {
            const user = await handleSignUp(email, password);
            if (user) {
                await saveUserData(email, password, username);
                mostrarAlerta({
                    bien: true,
                    titulo: "¡Registro exitoso!",
                    parrafo: "Se registro al usuario correctamente"
                });
            }
        } catch (err) {
            mostrarAlerta({
                bien: false,
                titulo: "¡Error al registrar usuario!",
                parrafo: err
            });
        } finally{
            setEmail("");
            setPassword("");
            setUsername("");
        }
    };

    return (
        <>
            <section className="admins-section">
                <div className="registrarAdmin">
                    <div className="container">
                        <div className="form-box">
                            <div className="titulo-form">
                                <h1>Administradores</h1>
                            </div>
                            <div id="RegisterForm" className="group-posts active">
                                <input
                                    type="text"
                                    value={username}
                                    className="input-field"
                                    placeholder="Usuario:"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input
                                    type="email"
                                    value={email}
                                    className="input-field"
                                    placeholder="Email:"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    value={password}
                                    className="input-field"
                                    placeholder="Contraseña:"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button className="submit-btn" onClick={handleRegister}>
                                    {loading ? "Registrando..." : "Registrar"}
                                </button>
                            </div>
                            {error && <p style={{ color: "red" }}>{error}</p>}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
