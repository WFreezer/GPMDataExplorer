const db = require('../config/dbconnector');

const Product = {
  getAll: async () => {
    try {
      const rows = await db.query('SELECT * FROM product');
      return rows;
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  },
  getBySessionId: async (sessionId) => {
    try {
      const rows = await db.query('SELECT * FROM product WHERE session_id = ?', [sessionId]);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching products by session id: ${error.message}`);
    }
  },
  create: async (sessionId, radiometerId, satelliteId) => {
    try {
      console.log('Dentro de create');

      const sql = 'INSERT INTO product (session_id, radiometer_id, satellite_id) VALUES (?, ?, ?)';
      const result = await db.query(sql, [sessionId, radiometerId, satelliteId]);

      console.log('Nuevo producto creado:', { id: result.insertId, session_id: sessionId, radiometer_id: radiometerId, satellite_id: satelliteId });

      const newProduct = { 
        product_id: result.insertId, 
        session_id: sessionId, 
        radiometer_id: radiometerId, 
        satellite_id: satelliteId 
      };

      return newProduct;
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }
};

module.exports = Product;
