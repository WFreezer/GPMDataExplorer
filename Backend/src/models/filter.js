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
  createFilter: async (filterData) => {
    // Implementa la lógica para crear un nuevo filtro
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
