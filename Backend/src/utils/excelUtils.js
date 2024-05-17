const ExcelJS = require('exceljs');



// Función para calcular nlon1 y nlon2
async function calcularNlon(lon1, lon2) {
    const rutaArchivo = './utils/Coordenadas.xlsx'; // Ruta al archivo Excel

    let nlon1, nlon2; // Variables para almacenar nlon1 y nlon2
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(rutaArchivo);
  
        const worksheet = workbook.getWorksheet(1); // Obtener la primera hoja del libro de trabajo

        // Iterar sobre cada fila en la hoja de cálculo, comenzando desde la segunda fila
        worksheet.eachRow({ includeEmpty: true, firstRow: 2 }, (row, rowNumber) => {
            // Obtener los valores de las celdas en la fila como un arreglo
            const LONmax = parseFloat(row.getCell(1).text);
            const LONmin = parseFloat(row.getCell(2).text);
            const nlon = row.getCell(3).text;

            // Verificar si lon1 y lon2 están dentro del rango LONmax y LONmin
            if (lon1 >= LONmax && lon1 < LONmin) {
                nlon1 = nlon; // Asignar el valor de nlon a nlon1
            }
            if (lon2 >= LONmax && lon2 < LONmin) {
                nlon2 = nlon; // Asignar el valor de nlon a nlon2
            }


        });
    } catch (error) {
        console.error('Error al leer el archivo Excel:', error.message);
    }
    return `[${nlon1}:${nlon2}]`;
}

// Función para calcular nlat1 y nlat2
async function calcularNlat(lat1, lat2) {
    const rutaArchivo = './utils/Coordenadas.xlsx'; // Ruta al archivo Excel


    let nlat1, nlat2; // Variables para almacenar nlon1 y nlon2
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(rutaArchivo);

        const worksheet = workbook.getWorksheet(1); // Obtener la primera hoja del libro de trabajo

        // Iterar sobre cada fila en la hoja de cálculo, comenzando desde la segunda fila
        worksheet.eachRow({ includeEmpty: true, firstRow: 2 }, (row, rowNumber) => {
            // Obtener los valores de las celdas en la fila como un arreglo

            const LATmax = parseFloat(row.getCell(4).text);
            const LATmin = parseFloat(row.getCell(5).text);
            const nlat = row.getCell(6).text;

            // Verificar si lat1 y lat2 están dentro del rango LATmax y LATmin
            if (lat1 >= LATmax && lat1 < LATmin) {
                nlat1 = nlat;
            }
            if (lat2 >= LATmax && lat1 < LATmin) {
                nlat2 = nlat;
            }




        });
    } catch (error) {
        console.error('Error al leer el archivo Excel:', error.message);
    }
    return `[${nlat1}:${nlat2}]`;
}

// Función para calcular nlay1 y nlay2
async function calcularNlay(layer1) {
    const rutaArchivo = './utils/Coordenadas.xlsx'; // Ruta al archivo Excel
    let nlay1, nlay2; // Variables para almacenar nlon1 y nlon2
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(rutaArchivo);

        const worksheet = workbook.getWorksheet(1); // Obtener la primera hoja del libro de trabajo

        // Iterar sobre cada fila en la hoja de cálculo, comenzando desde la segunda fila
        worksheet.eachRow({ includeEmpty: true, firstRow: 2 }, (row, rowNumber) => {
            // Obtener los valores de las celdas en la fila como un arreglo

            const layer = row.getCell(7).text;
            const layerv = row.getCell(8).text;
            
            if (layer1.length == 1 && layer1 == layer) {
              
                nlay1 = layerv;
                nlay2 = layerv;
            }
            if (layer1.length >= 2 && layer1[0] == layer) {
         
                nlay1 = layerv;
            }

            if (layer1.length >= 2 && layer1[layer1.length - 1] == layer) {
               
                nlay2 = layerv;
            }
            if (layer1.length == 0 && layer1 == layer) {
                nlay1 = 0;
                nlay2 = 27;
            }

        });
    } catch (error) {
        console.error('Error al leer el archivo Excel:', error.message);
    }
    return `[${nlay1}:${nlay2}]`;
}

module.exports = { calcularNlon, calcularNlat, calcularNlay };
