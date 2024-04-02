const Satellite = require('../models/satellite');

// Método para obtener los satélites asociados a un radiómetro específico
const getSatellitesByRadiometerId = async (req, res) => {
  try {
    const { radiometerId } = req.params;
    
    // Consulta a la base de datos para obtener los satélites asociados al radiómetro
    const satellites = await Satellite.getByRadiometerId(radiometerId); 
    
    res.status(200).json(satellites);
  } catch (error) {
    console.error('Error fetching satellites:', error);
    res.status(500).json({ message: 'Error fetching satellites' });
  }
};

module.exports = {getSatellitesByRadiometerId};
