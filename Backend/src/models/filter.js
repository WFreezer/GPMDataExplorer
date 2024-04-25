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

  // Función para obtener un filtro por id_filter
  getFilterById: async (id_filter) => {
    const query = 'SELECT * FROM filter WHERE id_filter = ?';
    const values = [id_filter];
    try {
        const rows = await db.query(query, values);
        if (rows.length === 0) {
            throw new Error(`Filter with id ${id_filter} not found`);
        }
        return rows[0]; // Retorna el primer filtro encontrado con el ID especificado
    } catch (error) {
        throw new Error(`Error fetching filter by id: ${error.message}`);
    }
},
getFilterByProductId: async (product_id) => {
  const query = 'SELECT * FROM filter WHERE product_id = ?';
  const values = [product_id];
  try {
      const rows = await db.query(query, values);
      console.log('Filters retrieved:', rows); // Agregar log para los filtros recuperados
      if (rows.length === 0) {
          throw new Error(`Filters with product_id ${product_id} not found`);
      }
      return rows; // Retorna los filtros encontrados con el ID especificado
  } catch (error) {
      throw new Error(`Error fetching filters by product_id: ${error.message}`);
  }
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
