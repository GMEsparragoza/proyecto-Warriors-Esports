import { firestore } from "./config";
import { getDocs, collection } from "firebase/firestore";

export const obtenerDatosFormularios = async () => {
    try {
        const FormplayersRef = collection(firestore, 'formPlayer');
        const dataPlayersSnapshot = await getDocs(FormplayersRef);
        const dataPlayers = dataPlayersSnapshot.docs.map(doc => doc.data());

        const FormStaffRef = collection(firestore, 'formStaff');
        const dataStaffSnapshot = await getDocs(FormStaffRef);
        const dataStaff = dataStaffSnapshot.docs.map(doc => doc.data());

        return { dataPlayers, dataStaff };
    } catch (err) {
        console.error("Error al obtener las postulaciones: ", err);
        return { dataPlayers: [], dataStaff: [] };
    }
};