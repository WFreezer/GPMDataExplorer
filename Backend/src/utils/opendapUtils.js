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

const obtenerDiaDelAño = (fecha) => {
  const year = fecha.getFullYear();
  const mes = fecha.getMonth();
  const dia = fecha.getDate();

  // Función para verificar si el año es bisiesto
  const esBisiesto = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  // Número de días en cada mes
  const diasPorMes = [
    31, // Enero
    esBisiesto(year) ? 29 : 28, // Febrero (ajustado para años bisiestos)
    31, // Marzo
    30, // Abril
    31, // Mayo
    30, // Junio
    31, // Julio
    31, // Agosto
    30, // Septiembre
    31, // Octubre
    30, // Noviembre
    31  // Diciembre
  ];

  // Calcular el día del año sumando los días de los meses anteriores
  let diaDelAño = 0;
  for (let i = 0; i < mes; i++) {
    diaDelAño += diasPorMes[i];
  }
  diaDelAño += dia;

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
    console.log(satelliteShortname);
    // Comparar si el shortname termina en "DAY_CLIM.07"
    if (satelliteShortname.endsWith('DAY_CLIM.07')) {
  console.log("Dentro de if");
      // Verificar si el shortname termina en "GPMGMI_DAY_CLIM.07"
      if (satelliteShortname.endsWith('GPMGMI_DAY_CLIM.07')  ) {
        if (fechaHoy <= fechaLimiteV07A) {
          console.log("Aqui1");
          return 'V07A';
        } else if (fechaHoy <= fechaLimiteV07B) {
          console.log("Aqui2");
          return 'V07B';
        } else if (fechaHoy <= fechaLimiteV07CGPM) {
          console.log("Aqui3");
          return 'V07C';
        } else {
          console.log("Aqui4");
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
      if (satelliteShortname.endsWith('GPMGMI_DAY.07')  ) {
        if (fechaHoy <= fechaLimiteV07A) {
          console.log("Aqui1");
          return 'V07A';
        } else if (fechaHoy <= fechaLimiteV07B) {
          console.log("Aqui2");
          return 'V07B';
        } else if (fechaHoy <= fechaLimiteV07CGPM) {
          console.log("Aqui3");
          return 'V07C';
        } else {
          console.log("Aqui4");
          return 'V07D';
        }
      } else{
      if (fechaHoy <= fechaLimiteV07A_else) {
        return 'V07A';
      } else if (fechaHoy <= fechaLimiteV07B_else) {
        return 'V07B';
      } else {
        return 'V07C';
      }
    }
    }
  };

 // Función para obtener los valores de capa correspondientes a los IDs dados
const obtenerValoresCapa = async (layerIds) => {
  try {
    // Convertir la cadena de IDs en un arreglo si no lo está
    const layerIdsArray = Array.isArray(layerIds) ? layerIds : layerIds.split(',').map(id => parseInt(id.trim(), 10)); // Convertir a números

    // Obtener todos los datos de la tabla layer_values llamando a la función
    const layers = await Filter.getLayers();

    // Filtrar los valores correspondientes a los IDs de capa dados
    const layerValues = layers
      .filter(layer => layerIdsArray.includes(parseInt(layer.id))) // Convertir a número
      .map(layer => layer.value); // Extraer solo los valores

    return layerValues;
  } catch (error) {
    throw new Error('Error al obtener los valores de capa:', error);
  }
};


module.exports = { generarURLBase, obtenerNombres, generarFechasURL, determinarSufijoVersion,obtenerValoresCapa };

