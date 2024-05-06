// opendapUtils.js

// Importar modelos necesarios
const Filter = require('../models/filter');
const Product = require('../models/product');
const Satellite = require('../models/satellite');
const Radiometer = require('../models/radiometer'); // Importar el modelo de radiómetro
const OPENDAP_BASE_URL = "https://gpm1.gesdisc.eosdis.nasa.gov/opendap/GPM_L3/";


// Función para generar la URL base
const generarURLBase = async (product_id) => {
  try {
    // Buscar el producto que coincide con el product_id del filtro
    const products = await Product.getAll();
    const product = products.find(product => product.product_id === product_id);

    // Obtener el satellite_id del producto encontrado
    const { satellite_id } = product;

    // Consultar el shortname del satélite utilizando el satellite_id
    const satellite = await Satellite.getById(satellite_id);
    const shortname = satellite.shortname;

    // Construir la URL completa
    const url = `${OPENDAP_BASE_URL}${shortname}`; // Agregamos el shortname al URL base

    return url;
  } catch (error) {
    throw new Error('Error al generar la URL base');
  }
};

// Función para obtener el nombre del radiómetro y del satélite
const obtenerNombres = async (product_id) => {
  try {
    // Buscar el producto que coincide con el product_id del filtro
    const products = await Product.getAll();
    const product = products.find(product => product.product_id === product_id);

    // Obtener el radiometer_id y el satellite_id del producto
    const { radiometer_id, satellite_id } = product;

    // Consultar el nombre del radiómetro utilizando el radiometer_id
    const radiometer = await Radiometer.getById(radiometer_id);
    const radiometerName = radiometer.name;

    // Consultar el nombre del satélite utilizando el satellite_id
    const satellite = await Satellite.getById(satellite_id);
    const satelliteName = satellite.name;
    const satelliteShortname = satellite.shortname;

    return { radiometerName, satelliteName,satelliteShortname };
  } catch (error) {
    throw new Error('Error al obtener los nombres del radiómetro y del satélite');
  }
};

// Función para generar las fechas entre date_from y date_to en formato "YYYY/MM/DD"
const generarFechasURL = (dateFrom, dateTo) => {
  const fechaInicio = new Date(dateFrom);
  const fechaFin = new Date(dateTo);
  const fechasURL = [];

  // Iterar sobre cada día entre la fecha de inicio y la fecha de fin
  for (let fecha = fechaInicio; fecha <= fechaFin; fecha.setDate(fecha.getDate() + 1)) {
    // Extraer el año, mes y día de la fecha actual
    const year = fecha.getFullYear();
    // Añadir 1 al mes porque en JavaScript los meses van de 0 a 11
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');

    // Obtener el día del año con tres dígitos
    const dayOfYear = obtenerDiaDelAño(fecha);

    // Formatear la fecha en el formato "YYYY/MM/DD"
    const fechaFormateada = `${year}/${month}/${day}/${dayOfYear}`;

    // Agregar la fecha formateada a la lista de fechas URL
    fechasURL.push(`${fechaFormateada}`);
  }

  return fechasURL;
};

// Función para obtener el día del año para una fecha dada
const obtenerDiaDelAño = (fecha) => {
  const year = fecha.getFullYear();
  const mes = fecha.getMonth();
  const dia = fecha.getDate();

  // Crear una fecha para el 1 de enero del año actual
  const inicioDeAño = new Date(year, 0, 1);
  
  // Calcular la diferencia en milisegundos entre la fecha dada y el inicio del año
  const diferenciaEnMilisegundos = fecha - inicioDeAño;
  
  // Convertir la diferencia en días redondeando hacia abajo
  const diaDelAño = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24)) + 1;

  
  // Añadir ceros a la izquierda para obtener tres dígitos
  return diaDelAño.toString().padStart(3, '0');
};

const determinarSufijoVersion = (fechaHoy, satelliteShortname) => {
    // Definir fechas límite comunes para el sufijo de versión V07A, V07B y V07C
    const fechaLimiteV07A = '20230329';
    const fechaLimiteV07B = '20230531';
    const fechaLimiteV07CGPM = '20230729';
    const fechaLimiteV07A_else = '20230630';
    const fechaLimiteV07B_else = '20230831';
  
    // Comparar si el shortname termina en "DAY_CLIM.07"
    if (satelliteShortname.endsWith('DAY_CLIM.07')) {
  
      // Verificar si el shortname termina en "GPMGMI_DAY_CLIM.07"
      if (satelliteShortname.endsWith('GPMGMI_DAY_CLIM.07')) {
        if (fechaHoy <= fechaLimiteV07A) {
          return 'V07A';
        } else if (fechaHoy <= fechaLimiteV07B) {
          return 'V07B';
        } else if (fechaHoy <= fechaLimiteV07CGPM) {
          return 'V07C';
        } else {
          return 'V07D';
        }
      } else {
        if (fechaHoy <= fechaLimiteV07A) {
          return 'V07A';
        } else if (fechaHoy <= fechaLimiteV07B) {
          return 'V07B';
        } else {
          return 'V07C';
        }
      }
    } else {
     
      if (fechaHoy <= fechaLimiteV07A_else) {
        return 'V07A';
      } else if (fechaHoy <= fechaLimiteV07B_else) {
        return 'V07B';
      } else {
        return 'V07C';
      }
    }
  };



module.exports = { generarURLBase, obtenerNombres, generarFechasURL, determinarSufijoVersion };

