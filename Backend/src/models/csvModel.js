// Importar el módulo de conexión a la base de datos
const db = require('../config/dbconnector');

const CsvModel = {
    // Función para insertar datos desde el archivo CSV a la base de datos
    insertCSVData: async (data) => {
        
        const query = `
            INSERT INTO meteorological_data (
                id_filter, day, nlat, nlon, nlayer, npix, npixPrecipitation, surfacePrecipitation,
                convectivePrecipitation, frozenPrecipitation, rainWaterPath, cloudWaterPath, iceWaterPath,
                rainWater, cloudWater, snow, graupel, latentHeating, surfaceTypeIndex, fractionQuality0,
                fractionQuality1, fractionQuality2, fractionQuality3
            ) VALUES ?`;
        // Transformar los datos a un formato compatible con la consulta SQL
        const values = data.map(item => [
            item.id_filter, item.day, item.nlat, item.nlon, item.nlayer, item.npix, item.npixPrecipitation,
            item.surfacePrecipitation, item.convectivePrecipitation, item.frozenPrecipitation, item.rainWaterPath,
            item.cloudWaterPath, item.iceWaterPath, item.rainWater, item.cloudWater, item.snow, item.graupel,
            item.latentHeating, item.surfaceTypeIndex, item.fractionQuality0, item.fractionQuality1,
            item.fractionQuality2, item.fractionQuality3
        ]);
        
        try {
            

            await db.query(query, [values]);
            console.log('Datos insertados correctamente en la base de datos');
        } catch (error) {
            throw new Error(`Error inserting CSV data: ${error.message}`);
        }
    }
};

module.exports = CsvModel;
