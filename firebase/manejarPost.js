import { firestore } from "./config";
import { deleteDoc, updateDoc, getDoc, setDoc, doc } from "firebase/firestore";

const agregarPostPlayer = async (id, rango, edad, experiencia, rol, horario) => {
    const formData = {
        rango,
        edadMinima: edad,
        experiencia,
        rol,
        horario
    }
    try {
        // Crear referencia al documento en la colección 'postPlayer' con el ID especificado
        const docRef = doc(firestore, "postPlayer", id);
        await setDoc(docRef, formData);
        console.log("Postulación registrada con éxito");
    } catch (err) {
        console.error("Error al registrar la postulacion: ", err);
    }
}

const agregarPostStaff = async (id, edad, experiencia, rol, horario) => {
    const formData = {
        edadMinima: edad,
        experiencia,
        rol,
        horario
    }
    try {
        // Crear referencia al documento en la colección 'postStaff' con el ID especificado
        const docRef = doc(firestore, "postStaff", id);
        await setDoc(docRef, formData);
        console.log("Postulación registrada con éxito");
    } catch (err) {
        console.error("Error al registrar la postulacion: ", err);
    }
}

const modificarPostPlayer = async (id, rango, edad, experiencia, rol, horario) => {
    const formData = {
        rango,
        edadMinima: edad,
        experiencia,
        rol,
        horario
    }
    try {
        // Crear referencia al documento
        const docRef = doc(firestore, "postPlayer", id);

        // Actualizar los datos del documento
        await updateDoc(docRef, formData);
    } catch (err) {
        console.error("Error al Modificar la postulacion: ", err);
    }
}

const modificarPostStaff = async (id, edad, experiencia, rol, horario) => {
    const formData = {
        edadMinima: edad,
        experiencia,
        rol,
        horario
    }
    try {
        // Crear referencia al documento
        const docRef = doc(firestore, "postStaff", id);

        // Actualizar los datos del documento
        await updateDoc(docRef, formData);
    } catch (err) {
        console.error("Error al Modificar la postulacion: ", err);
    }
}

const eliminarPostPlayer = async (id) => {
    try {
        // Crear referencia al documento
        const docRef = doc(firestore, "postPlayer", id);

        // Eliminar el documento
        await deleteDoc(docRef);

    } catch (err) {
        console.error("Error al eliminar la postulacion: ", err);
    }
}

const eliminarPostStaff = async (id) => {
    try {
        // Crear referencia al documento
        const docRef = doc(firestore, "postStaff", id);

        // Eliminar el documento
        await deleteDoc(docRef);
    } catch (err) {
        console.error("Error al eliminar la postulacion: ", err);
    }

}

const verificarPost = async (id, typePost) => {
    try {
        // Crear referencia al documento
        const docRef = doc(firestore, typePost, id);

        // Obtener el documento
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return true;
        }
        else {
            console.log("No se encontro la postulacion ingresada");
            return false;
        }
    } catch (err) {
        console.error("Error al consultar la postulacion: ", err);
    }
}

export { agregarPostPlayer, agregarPostStaff, modificarPostPlayer, modificarPostStaff, eliminarPostPlayer, eliminarPostStaff, verificarPost }