import { firestore } from "./config";
import { collection, getDocs } from "firebase/firestore";

export const ObtenerRosters = async (type) => {
    try {
        // Crear referencia a la colección
        const colRef = collection(firestore, type);

        // Obtener los documentos de la colección
        const snapshot = await getDocs(colRef);

        if (!snapshot.empty) {
            // Mapear los datos de los documentos
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return data;
        } else {
            console.log(`No se encontraron documentos en la colección "${type}".`);
            return [];
        }
    } catch (err) {
        console.error(`Error al consultar la colección "${type}":`, err);
        return [];
    }
};