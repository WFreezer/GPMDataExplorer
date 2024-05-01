// opendapController.js

// Importar utilidades de OpenDAP
const { generarURLBase, obtenerNombres, generarFechasURL,determinarSufijoVersion, leerDatosDesdeExcel } = require('../utils/opendapUtils');
const Filter = require('../models/filter');



// Controlador para generar la URL de acceso a los datos OpenDAP
const generarURL = async (req, res) => {
  try {
    const { id_filter } = req.params;
    
    // Consultar filtro utilizando id_filter
    const filter = await Filter.getFilterById(id_filter);
 
    // Extraer product_id del filtro
    const { product_id } = filter;

    // Obtener las fechas de inicio y fin del filtro
    const { date_from, date_to } = filter;

    // Generar las fechas URL entre date_from y date_to
    const fechasURL = await generarFechasURL(date_from, date_to);

    // Obtener el URL base del satélite
    const urlBase = await generarURLBase(product_id);

    // Obtener el nombre del radiómetro y del satélite
    const { radiometerName, satelliteName, satelliteShortname } = await obtenerNombres(product_id);

    // Generar las URLs para cada fecha y almacenarlas en una lista
    const urlsCompletas = fechasURL.map(fecha => {
      // Obtener el año, mes y día de la fecha actual
      const year = fecha.slice(0, 4);
      const month = fecha.slice(5, 7);
      const day = fecha.slice(8, 10);
      const dayOfYear = fecha.slice(11,14);
      
      // Determinar el sufijo de versión según el shortname del satélite y la fecha actual
      const versionSuffix = determinarSufijoVersion(year + month + day, satelliteShortname);

      // Construir la URL completa con la fecha añadida
      return `${urlBase}/${year}/${month}/3A-DAY.${satelliteName}.${radiometerName}.GRID2021R1.${year}${month}${day}-S000000-E235959.${dayOfYear}.${versionSuffix}.HDF5.ascii?`;
    });

    // Enviar respuesta con la URL generada
    res.status(200).json({urls: urlsCompletas });
  } catch (error) {
    // Manejar errores
    console.error('Error al generar URL:', error);
    res.status(500).json({ message: 'Error al generar URL' });
  }
};

module.exports = { generarURL };
