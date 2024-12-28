"use client"

import { useContext, createContext, useState, useEffect } from "react";
import {signInWithPopup, signOut, onAuthStateChanged,
    signInWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { auth, firestore } from "@/firebase/config";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (email, password) => {
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const UserCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = UserCredential.user;
            if (!user.emailVerified) {
                setError("Verifique su cuenta antes de iniciar sesion");
                signOut(auth);
                return;
            }
            setMessage("Inicio de Sesion exitoso");
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
            window.location.href = '/admin';
        }
    }

    //Funcion para cerrar sesion en la cuenta activa
    const logOut = () => {
        signOut(auth);
    };

    //Estado useEffect para funciones que se ejecuten al recargo de los componentes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (user) {
                await user.reload();
                if (user.emailVerified) {
                    console.log("Usuario con correo verificado.");
                } else {
                    console.log("El usuario no ha verificado su correo.");
                }
            }
        });
        return () => unsubscribe();
    }, [user]);

    return (
        <AuthContext.Provider value ={{
            user,
            handleLogin,
            error,
            message,
            loading,
            logOut
        }}>
        { children }
        </AuthContext.Provider>
    );
};

//Exportar la variable UserAuth para ser utilizada en todas las paginas
export const UserAuth = () => {
    return useContext(AuthContext);
};