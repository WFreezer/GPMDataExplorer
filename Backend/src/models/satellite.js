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
  }
};

module.exports = Satellite;
