// opendapController.js

// Importar utilidades de OpenDAP
const { generarURLBase, obtenerNombres, generarFechasURL, determinarSufijoVersion, obtenerValoresCapa } = require('../utils/opendapUtils');
const Filter = require('../models/filter');
const { calcularNlon, calcularNlat, calcularNlay } = require('../utils/excelUtils');



// Controlador para generar la URL de acceso a los datos OpenDAP
const generarURL = async (req, res) => {
  try {
    const { id_filter } = req.params;
    
    // Consultar filtro utilizando id_filter
    const filter = await Filter.getFilterById(id_filter);
 
    // Extraer datos de la tabla filtro
    const { product_id,date_from, date_to, layer_ids,longitud_max,longitud_min,latitud_max,latitud_min} = filter;

    // Generar las fechas URL entre date_from y date_to
    const fechasURL = await generarFechasURL(date_from, date_to);

    // Obtener los valores de capa correspondientes a los IDs almacenados en layer_ids
    const layerValues = await obtenerValoresCapa(layer_ids);

    // Calcular valores de coordenadas
    const nlon = await calcularNlon(longitud_min, longitud_max);
    console.log("opendapController.nlon: "+ nlon);
    const nlat = await calcularNlat(latitud_min, latitud_max);
    console.log("opendapController.nlat: "+ nlat);
    const nlay = await calcularNlay(layerValues);
    console.log("opendapController.nlay "+ nlay);
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
      const baseUrl = `${urlBase}/${year}/${month}/3A-DAY.${satelliteName}.${radiometerName}.GRID2021R1.${year}${month}${day}-S000000-E235959.${dayOfYear}.${versionSuffix}.HDF5.ascii`;

       // Construir la cadena de datos adicionales
       const datos = `latentHeating${nlay}${nlon}${nlat},fractionQuality2${nlon}${nlat},lat_bnds${nlat}[0:1],fractionQuality1${nlon}${nlat},iceWaterPath${nlon}${nlat},surfacePrecipitation${nlon}${nlat},frozenPrecipitation${nlon}${nlat},fractionQuality0${nlon}${nlat},npixTotal${nlon}${nlat},cloudWaterPath${nlon}${nlat},npixPrecipitation${nlon}${nlat},snow${nlay}${nlon}${nlat},rainWater${nlay}${nlon}${nlat},cloudWater${nlay}${nlon}${nlat},surfaceTypeIndex${nlon}${nlat},fractionQuality3${nlon}${nlat},rainWaterPath${nlon}${nlat},convectivePrecipitation${nlon}${nlat},lon_bnds${nlon}[0:1],graupel${nlay}${nlon}${nlat},layer_bnds${nlay}[0:1],layer${nlay},lon${nlon},lat${nlat},latv,lonv,layerv`;
      // Construir la URL completa con la fecha añadida
      return `${baseUrl}?${datos}`;
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
