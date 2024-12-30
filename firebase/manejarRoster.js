import { firestore } from "./config";
import { deleteDoc, updateDoc, getDoc, setDoc, doc } from "firebase/firestore";

const AddRoster = async (id, nombre, desc) => {
    const formData = {
        nombre,
        description: desc
    }
    try {
        // Crear referencia al documento en la colección 'roster' con el ID especificado
        const docRef = doc(firestore, "roster", id);
        await setDoc(docRef, formData);
        console.log("Roster registrado con éxito");
    } catch (err) {
        console.error("Error al registrar el Roster: ", err);
    }
}

const ModRoster = async (id, nombre, desc) => {
    const formData = {
        nombre,
        description: desc
    }
    try {
        // Crear referencia al documento en la colección 'roster' con el ID especificado
        const docRef = doc(firestore, "roster", id);

        //Actualizar con los valores ingresados
        await updateDoc(docRef, formData);
    } catch (err) {
        console.error("Error al modificar el Roster: ", err);
    }
}

const DelRoster = async (id) => {
    try {
        // Crear referencia al documento en la colección 'roster' con el ID especificado
        const docRef = doc(firestore, "roster", id);

        //Actualizar con los valores ingresados
        await deleteDoc(docRef);
    } catch (err) {
        console.error("Error al eliminar el Roster: ", err);
    }
}

const verificarRoster = async (id) => {
    try {
        // Crear referencia al documento
        const docRef = doc(firestore, "roster", id);

        // Obtener el documento
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return true;
        }
        else {
            return false;
        }
    } catch (err) {
        console.error("Error al consultar el Roster: ", err);
    }
}


export { AddRoster, ModRoster, DelRoster, verificarRoster }