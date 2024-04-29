// opendapController.js

// Importar modelos necesarios
const Filter = require('../models/filter');
const Product = require('../models/product');
const Satellite = require('../models/satellite');
const Radiometer = require('../models/radiometer'); // Importar el modelo de radiómetro
const OPENDAP_BASE_URL = "https://gpm1.gesdisc.eosdis.nasa.gov/opendap/GPM_L3/";

// Controlador para generar la URL de acceso a los datos OpenDAP
const generarURL = async (req, res) => {
  try {
    const { id_filter } = req.params;
    console.log("ID_filter: " + id_filter);
    
    // Consultar filtro utilizando id_filter
    const filter = await Filter.getFilterById(id_filter);
    console.log("filter: ", filter);

     // Extraemos product_id del filtro
     const { product_id } = filter;
     console.log("ID_product: " + product_id);

    // Obtener las fechas de inicio y fin del filtro
    const { date_from, date_to } = filter;
    console.log("date_from:", date_from, "date_to:", date_to);

    // Generar las fechas URL entre date_from y date_to
    const fechasURL = generarFechasURL(date_from, date_to);
    console.log("fechasURL:", fechasURL);

    // Obtener el URL base del satélite
    const urlBase = await generarURLBase(product_id);

    // Obtener el nombre del radiómetro y del satélite
    const { radiometerName, satelliteName } = await obtenerNombres(product_id);

    // Generar las URLs para cada fecha y almacenarlas en una lista
    const urlsCompletas = fechasURL.map(fecha => {
    // Obtener el año, mes y día de la fecha actual
    const year = fecha.slice(0, 4);
    const month = fecha.slice(5, 7);
    const day = fecha.slice(8, 10);
    const dayOfYear = fecha.slice(11,14);
    // Construir la URL completa con la fecha añadida
    return `${urlBase}/${year}/${month}/3A-DAY.${satelliteName}.${radiometerName}.GRID2021R1.${year}${month}${day}-S000000-E235959.${dayOfYear}.V07D.HDF5.ascii?`;
    });
    console.log("urlsCompletas:", urlsCompletas); 

    // Enviar respuesta con la URL generada
    res.status(200).json({urls: urlsCompletas });
  } catch (error) {
    // Manejar errores
    console.error('Error al generar URL:', error);
    res.status(500).json({ message: 'Error al generar URL' });
  }
};

// Función privada para generar la URL base
const generarURLBase = async (product_id) => {
  try {
    
    // Buscar el producto que coincide con el product_id del filtro
    const products = await Product.getAll();
    const product = products.find(product => product.product_id === product_id);
    console.log("Product: ", product);
    
    // Obtener el satellite_id del producto encontrado
    const { satellite_id } = product;
    console.log("satellite_id: " + satellite_id);

    // Consultar el shortname del satélite utilizando el satellite_id
    const satellite = await Satellite.getById(satellite_id);
    const shortname = satellite.shortname;

    // Construir la URL completa
    const url = `${OPENDAP_BASE_URL}${shortname}`; // Agregamos el shortname al URL base

    console.log('URL generada:', url);
    return url;
  } catch (error) {
    throw new Error('Error al generar la URL base');
  }
};

// Función privada para obtener el nombre del radiómetro y del satélite
const obtenerNombres = async (product_id) => {
  try {
    // Buscar el producto que coincide con el product_id del filtro
    const products = await Product.getAll();
    const product = products.find(product => product.product_id === product_id);
    console.log("Product: ", product);

    // Obtener el radiometer_id y el satellite_id del producto
    const { radiometer_id, satellite_id } = product;

    // Consultar el nombre del radiómetro utilizando el radiometer_id
    const radiometer = await Radiometer.getById(radiometer_id);
    const radiometerName = radiometer.name;

    // Consultar el nombre del satélite utilizando el satellite_id
    const satellite = await Satellite.getById(satellite_id);
    const satelliteName = satellite.name;

    return { radiometerName, satelliteName };
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


const obtenerDiaDelAño = (fecha) => {
  const year = fecha.getFullYear();
  const inicioDeAño = new Date(year, 0, 0);
  const diff = fecha - inicioDeAño;
  const unDia = 1000 * 60 * 60 * 24;
  const diaDelAño = Math.floor(diff / unDia);

  // Verificar si el año actual es bisiesto
  const esBisiesto = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  
  // Si el año es bisiesto y el día es mayor que 58 (29 de febrero),
  // se suma 1 al día del año para compensar el día extra de febrero
  if (esBisiesto && diaDelAño >= 58) {
    return (diaDelAño + 1).toString().padStart(3, '0');
  }
  
  // Añadir ceros a la izquierda para obtener tres dígitos
  return diaDelAño.toString().padStart(3, '0');
};

module.exports = { generarURL };
