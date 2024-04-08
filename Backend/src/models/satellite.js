const db = require('../config/dbconnector');

const Satellite = {
  getByRadiometerId: async (radiometerId) => {
    try {
      const query = 'SELECT * FROM satellite WHERE radiometer_id = ?';
      const satellites = await db.query(query, [radiometerId]);
      return satellites;
    } catch (error) {
      throw new Error(`Error fetching satellites by radiometer id: ${error.message}`);
    }
  },
  getById: async (satelliteId) => {
    try {
      const query = 'SELECT * FROM satellite WHERE satellite_id = ?';
      const [satellite] = await db.query(query, [satelliteId]);
      return satellite;
    } catch (error) {
      throw new Error(`Error fetching satellite by id: ${error.message}`);
    }
  }
};


module.exports = Satellite;
