const db = require('../config/dbconnector');

const Radiometer = {
  getAll: async () => {
    try {
      const rows = await db.query('SELECT * FROM radiometer');
      return rows;
    } catch (error) {
      throw new Error(`Error fetching radiometers: ${error.message}`);
    }
  }
};

module.exports = Radiometer;
