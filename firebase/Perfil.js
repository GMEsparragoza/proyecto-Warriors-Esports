import { firestore } from "./config";
import { collection, query, where, getDocs } from "firebase/firestore";

export const ObtenerUsuario = async (nick) => {
    try {
        // Referencia a la colección "usuario"
        const usuariosRef = collection(firestore, "usuario");

        // Crear consulta con filtro por "nick"
        const q = query(usuariosRef, where("nick", "==", nick));

        // Ejecutar la consulta
        const querySnapshot = await getDocs(q);

        // Verificar si se encontró algún documento
        if (!querySnapshot.empty) {
            // Retornar el primer documento encontrado
            const usuarioData = querySnapshot.docs[0].data();
            return usuarioData;
        } else {
            console.log(`No se encontró un usuario con el nick "${nick}"`);
            return null;
        }
    } catch (error) {
        console.error("Error al obtener el usuario por nick:", error);
        throw error;
    }
};