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

// Método para obtener un satélite por su ID
const getSatelliteById = async (req, res) => {
  try {
    const { satelliteId } = req.params;
    
    // Consulta a la base de datos para obtener el satélite por su ID
    const satellite = await Satellite.getById(satelliteId); 
    
    // Verificar si se encontró el satélite
    if (!satellite) {
      return res.status(404).json({ message: 'Satellite not found' });
    }
      // Formatear las fechas antes de enviar la respuesta
      satellite.start_date = satellite.start_date.toLocaleDateString();
      satellite.end_date = satellite.end_date.toLocaleDateString();
      
    res.status(200).json(satellite);
  } catch (error) {
    console.error('Error fetching satellite:', error);
    res.status(500).json({ message: 'Error fetching satellite' });
  }
};

module.exports = {getSatellitesByRadiometerId,getSatelliteById};
