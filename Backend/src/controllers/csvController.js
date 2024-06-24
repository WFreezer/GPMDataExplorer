const path = require('path');
const ExcelJS = require('exceljs');
const CsvModel = require('../models/csvModel'); // Importar el modelo para interactuar con la base de datos

// Función para convertir valores no válidos a -9999.9
const parseOrDefault = (value) => {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) || value === '--' ? -9999.9 : parsedValue;
};

// Función para importar datos desde un archivo CSV a la base de datos
const importCSVToDatabase = async (req, res) => {
    const csvFilePath = path.join(__dirname, '../data/VarsToImport.csv');

    const { id_filter, day } = req.body;

    if (!id_filter || !day) {
        return res.status(400).json({ message: 'id_filter y day son requeridos' });
    }

    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.csv.readFile(csvFilePath);
        const worksheet = workbook.getWorksheet(1);

        const dataToInsert = [];

        worksheet.eachRow((row, rowNumber) => {
            const rowData = {
                id_filter,
                day,
                nlat: parseOrDefault(row.getCell(1).value),
                nlon: parseOrDefault(row.getCell(2).value),
                nlayer: parseOrDefault(row.getCell(3).value),
                npix: parseOrDefault(row.getCell(4).value),
                npixPrecipitation: parseOrDefault(row.getCell(5).value),
                surfacePrecipitation: parseOrDefault(row.getCell(6).value),
                convectivePrecipitation: parseOrDefault(row.getCell(7).value),
                frozenPrecipitation: parseOrDefault(row.getCell(8).value),
                rainWaterPath: parseOrDefault(row.getCell(9).value),
                cloudWaterPath: parseOrDefault(row.getCell(10).value),
                iceWaterPath: parseOrDefault(row.getCell(11).value),
                rainWater: parseOrDefault(row.getCell(12).value),
                cloudWater: parseOrDefault(row.getCell(13).value),
                snow: parseOrDefault(row.getCell(14).value),
                graupel: parseOrDefault(row.getCell(15).value),
                latentHeating: parseOrDefault(row.getCell(16).value),
                surfaceTypeIndex: parseOrDefault(row.getCell(17).value),
                fractionQuality0: parseOrDefault(row.getCell(18).value),
                fractionQuality1: parseOrDefault(row.getCell(19).value),
                fractionQuality2: parseOrDefault(row.getCell(20).value),
                fractionQuality3: parseOrDefault(row.getCell(21).value),
            };


            // Verificar si ya existe un registro con la misma combinación de id_filter, day, nlat, nlon y nlayer
            // Antes de agregar a dataToInsert
            const exists = dataToInsert.some(data => (
                data.id_filter === rowData.id_filter &&
                data.day === rowData.day &&
                data.nlat === rowData.nlat &&
                data.nlon === rowData.nlon &&
                data.nlayer === rowData.nlayer
            ));

            if (!exists) {
                dataToInsert.push(rowData);
            } else {
                console.log(`Fila ${rowNumber}: Datos duplicados omitidos.`);
            }
        });

        // Insertar datos en la base de datos
        await CsvModel.insertCSVData(dataToInsert);

        res.status(200).json({ message: 'Archivo CSV procesado y datos insertados en la base de datos.' });
    } catch (error) {
        console.error('Error al leer el archivo CSV:', error);
        res.status(500).json({ message: 'Error al leer el archivo CSV' });
    }
};


const getMeteorologicalData = async (req, res) => {
    const { id_filter, day } = req.query;

    try {
        // Llama a la función del modelo para obtener los datos filtrados
        const meteorologicalData = await CsvModel.getMeteorologicalData(id_filter, day);
        
        if (meteorologicalData.length === 0) {
            return res.status(404).json({ error: 'No se encontraron datos para los filtros proporcionados' });
        }

        res.status(200).json(meteorologicalData);
    } catch (error) {
        console.error('Error al obtener datos meteorológicos:', error);
        res.status(500).json({ error: 'Error al obtener datos meteorológicos' });
    }
};

module.exports = {
    importCSVToDatabase,
    getMeteorologicalData
};
