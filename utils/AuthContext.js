"use client"

import { useContext, createContext, useState, useEffect } from "react";
import {
    signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword
} from "firebase/auth";
import { auth, firestore } from "@/firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore"

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [initialLoading, setInitialLoading] = useState(true); // Nuevo estado

    //Funcion para Registrar un usuario por mail y contraseña
    const handleSignUp = async (email, password) => {
        setLoading(true);
        setError("");
        setMessage("");

        if (password.length <= 5) {
            setError("La contraseña debe tener al menos 6 caracteres");
            setLoading(false);
            return false; // Retornamos false si la validación falla
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setMessage("Registro Exitoso");
            return user; // Retornamos el usuario creado
        } catch (err) {
            setError(err.message);
            return false; // Retornamos false si hay un error
        } finally {
            setLoading(false);
        }
    };

    //Funcion para guardar los datos de los usuarios en la base de datos
    const saveUserData = async (email, password, username) => {
        setError("");
        setLoading(true);

        try {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                console.log("No hay un usuario autenticado.");
                return;
            }

            const formData = {
                email,
                password,
                username
            };

            // Guarda los datos en Firestore usando el UID como clave
            await setDoc(doc(firestore, "admins", currentUser.uid), formData);
            console.log("Datos del usuario guardados correctamente en Firestore");
        } catch (error) {
            console.error("Error al guardar los datos:", error);
            setError("Error al guardar los datos del usuario");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (email, password) => {
        setLoading(true);
        setError("");

        try {
            const UserCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = UserCredential.user;
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    //Funcion para cerrar sesion en la cuenta activa
    const logOut = async () => {
        await signOut(auth);
    };

    //Estado useEffect para funciones que se ejecuten al recargo de los componentes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setInitialLoading(false);
            if (currentUser) {
                try {
                    const userDocRef = doc(firestore, "admins", currentUser.uid);
                    const userSnap = await getDoc(userDocRef);
                    if (userSnap.exists()) {
                        setUser({ id: userSnap.id, ...userSnap.data() }); // Asegúrate de formatear correctamente el usuario
                    } else {
                        console.log("No se encontró el documento del usuario");
                        setUser(null);
                    }
                } catch (err) {
                    console.error("Error al cargar Usuario:", err);
                }
                setInitialLoading(false);
            } else {
                setUser(null); // Limpia el usuario si no hay nadie autenticado
            }
            console.log("Estado actual del usuario:", currentUser);
        });

        return () => unsubscribe(); // Limpia el listener al desmontar
    }, []); // Dependencia vacía para evitar reejecuciones innecesarias

    return (
        <AuthContext.Provider value={{
            user,
            initialLoading,
            handleLogin,
            handleSignUp,
            saveUserData,
            error,
            message,
            loading,
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    );
};

//Exportar la variable UserAuth para ser utilizada en todas las paginas
export const UserAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("UserAuth debe ser usado dentro de un AuthContextProvider");
    }
    return context;
};