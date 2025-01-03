import { firestore } from "./config";
import { addDoc, collection } from "firebase/firestore";

const agregarFormPlayer = async (nombre, apellido, edad, nick, rangoActu, rangoPeak, roles, experiencia) => {
    const formData = {
        nombre,
        apellido,
        edad,
        nick,
        rangoActual: rangoActu,
        rangoPeak,
        roles,
        experiencia
    }
    try {
        // Crear un nuevo documento en la colección 'formularios' con un ID único
        await addDoc(collection(firestore, "formularioPlayer"), formData);
        console.log("Formulario registrado con éxito");
    } catch (err) {
        console.error("Error al registrar el Formulario: ", err);
    }
}

const agregarFormStaff = async (nombre, apellido, edad, nick, rol, experiencia) => {
    const formData = {
        nombre,
        apellido,
        edad,
        nick,
        rol,
        experiencia
    }
    try {
        // Crear un nuevo documento en la colección 'formularios' con un ID único
        await addDoc(collection(firestore, "formularioStaff"), formData);
        console.log("Formulario registrado con éxito");
    } catch (err) {
        console.error("Error al registrar el Formulario: ", err);
    }
}

export {agregarFormPlayer, agregarFormStaff}