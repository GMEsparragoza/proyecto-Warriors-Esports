import { firestore } from "./config";
import { deleteDoc, updateDoc, getDoc, setDoc, doc } from "firebase/firestore";

const AddUser = async (idUser, nick, nombre, apellido, idRoster, exp, desc, rol) => {
    const formData = {
        nick,
        nombre,
        apellido,
        idRoster,
        experiencia: exp,
        descripcion: desc,
        rol
    }
    try {
        // Crear referencia al documento en la colección 'usuario' con el ID especificado
        const docRef = doc(firestore, "usuario", idUser);
        await setDoc(docRef, formData);
        console.log("Usuario registrado con éxito");
    } catch (err) {
        console.error("Error al registrar el Usuario: ", err);
    }
}

const ModUser = async (idUser, nick, nombre, apellido, idRoster, exp, desc, rol) => {
    const formData = {
        nick,
        nombre,
        apellido,
        idRoster,
        experiencia: exp,
        descripcion: desc,
        rol
    }
    try {
        // Crear referencia al documento en la colección 'usuario' con el ID especificado
        const docRef = doc(firestore, "usuario", idUser);
        await updateDoc(docRef, formData);
        console.log("Usuario modificado con éxito");
    } catch (err) {
        console.error("Error al modificar el Usuario: ", err);
    }
}

const DelUser = async (idUser) => {
    try {
        // Crear referencia al documento en la colección 'usuario' con el ID especificado
        const docRef = doc(firestore, "usuario", idUser);
        await deleteDoc(docRef);
        console.log("Usuario elimnado con éxito");
    } catch (err) {
        console.error("Error al eliminar el Usuario: ", err);
    }
}

const verificarUsuario = async (id) => {
    try {
        // Crear referencia al documento
        const docRef = doc(firestore, "usuario", id);

        // Obtener el documento
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return true;
        }
        else {
            return false;
        }
    } catch (err) {
        console.error("Error al consultar el Usuario: ", err);
    }
}


export { AddUser, ModUser, DelUser, verificarUsuario }