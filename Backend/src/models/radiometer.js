const db = require('../config/dbconnector');

const Radiometer = {
  getAll: async () => {
    try {
      const rows = await db.query('SELECT * FROM radiometer');
      return rows;
    } catch (error) {
      throw new Error(`Error fetching radiometers: ${error.message}`);
    }
  },
  getById: async (radiometerId) => {
    try {
      const row = await db.query('SELECT * FROM radiometer WHERE radiometer_id = ?', [radiometerId]);
      return row[0]; // Devuelve el primer radiómetro encontrado
    } catch (error) {
      throw new Error(`Error fetching radiometer by ID: ${error.message}`);
    }
  }
};

module.exports = Radiometer;
