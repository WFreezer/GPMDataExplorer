// radiometerController.js

const Radiometer = require('../models/radiometer');

const getAllRadiometers = async (req, res) => {
  try {
    const radiometers = await Radiometer.getAll();
    res.status(200).json(radiometers);
  } catch (error) {
    console.error('Error fetching radiometers:', error);
    res.status(500).json({ message: 'Error fetching radiometers' });
  }
};

module.exports = {
  getAllRadiometers
};
