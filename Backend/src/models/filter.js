// Importar el módulo de conexión a la base de datos
const db = require('../config/dbconnector');

const Filter = {
  getVariables: async () => {
    try {
      const rows = await db.query('SELECT * FROM variables_select');
      return rows;
    } catch (error) {
      throw new Error(`Error fetching variables: ${error.message}`);
    }
  },
  getLayers: async () => {
    try {
      const rows = await db.query('SELECT * FROM layer_values');
      return rows;
    } catch (error) {
      throw new Error(`Error fetching layers: ${error.message}`);
    }
  },
  // Función para crear un nuevo filtro en la base de datos
  createFilter: async (filterData) => {
    const { product_id, date_from, date_to, longitud_min, longitud_max, latitud_min, latitud_max, variable_ids, layer_ids } = filterData;
    const query = 'INSERT INTO filter (product_id, date_from, date_to, longitud_min, longitud_max, latitud_min, latitud_max, variable_ids, layer_ids) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [product_id, date_from, date_to, longitud_min, longitud_max, latitud_min, latitud_max, variable_ids, layer_ids];
    const result = await db.query(query, values);
    return result.insertId; // Retorna el ID del nuevo filtro creado
  },
  getFilterById: async (id_filter) => {
    // Implementa la lógica para obtener un filtro por id_filter
  },
  getFilterByProductId: async (product_id) => {
    // Implementa la lógica para obtener un filtro por product_id
  },
  getAvailableDatesForProduct: async (product_id) => {
    try {
      const sql = 'SELECT start_date, end_date FROM satellite WHERE satellite_id IN (SELECT satellite_id FROM product WHERE product_id = ?)';
      const availableDates = await db.query(sql, [product_id]);
      return availableDates;
    } catch (error) {
      throw new Error(`Error fetching available dates for product: ${error.message}`);
    }
  }
};


module.exports = Filter;
