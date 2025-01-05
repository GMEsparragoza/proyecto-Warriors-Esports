import ExcelJS from 'exceljs';
import { obtenerDatosFormularios } from '@/firebase/forms';

export async function GET() {
    try {
        // Crear un nuevo libro de trabajo de Excel
        const workbook = new ExcelJS.Workbook();

        // Agregar la hoja para los jugadores
        const worksheetPlayers = workbook.addWorksheet('Formulario Players');
        worksheetPlayers.columns = [
            { header: 'Nombre', key: 'nombre', width: 20 },
            { header: 'Apellido', key: 'apellido', width: 20 },
            { header: 'Edad', key: 'edad', width: 10 },
            { header: 'Nick', key: 'nick', width: 20 },
            { header: 'Twitter', key: 'twitter', width: 50 },
            { header: 'Rango Actual', key: 'rangoActual', width: 30 },
            { header: 'Rango Maximo', key: 'rangoPeak', width: 30 },
            { header: 'Roles', key: 'roles', width: 20 },
            { header: 'Experiencia', key: 'experiencia', width: 40 },
        ];

        // Agregar la hoja para el Staff
        const worksheetStaff = workbook.addWorksheet('Formulario Staff');
        worksheetStaff.columns = [
            { header: 'Nombre', key: 'nombre', width: 20 },
            { header: 'Apellido', key: 'apellido', width: 20 },
            { header: 'Edad', key: 'edad', width: 10 },
            { header: 'Nick', key: 'nick', width: 20 },
            { header: 'Twitter', key: 'twitter', width: 50 },
            { header: 'Rol', key: 'rol', width: 30 },
            { header: 'Experiencia', key: 'experiencia', width: 40 },
        ];

        const { dataPlayers, dataStaff } = await obtenerDatosFormularios();

        // Añadir filas a la hoja de jugadores
        dataPlayers.forEach((form) => worksheetPlayers.addRow(form));

        // Añadir filas a la hoja de Staff
        dataStaff.forEach((form) => worksheetStaff.addRow(form));

        // Generar el archivo Excel en memoria
        const buffer = await workbook.xlsx.writeBuffer();

        // Establecer las cabeceras para forzar la descarga del archivo
        return new Response(buffer, {
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename="formularios.xlsx"',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error al generar el archivo Excel' }), { status: 500 });
    }
}