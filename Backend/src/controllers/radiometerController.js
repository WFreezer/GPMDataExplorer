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

const getRadiometerById = async (req, res) => {
  try {
    const { radiometerId } = req.params;
    const radiometer = await Radiometer.getById(radiometerId);
    res.status(200).json(radiometer);
  } catch (error) {
    console.error('Error fetching radiometer by ID:', error);
    res.status(500).json({ message: 'Error fetching radiometer by ID' });
  }
};
module.exports = {
  getAllRadiometers,
  getRadiometerById
};
