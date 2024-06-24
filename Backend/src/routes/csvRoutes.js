const express = require('express');
const router = express.Router();
const csvController = require('../controllers/csvController');

// Ruta para importar datos desde un archivo CSV
router.post('/import', csvController.importCSVToDatabase);

// Ruta para obtener datos de la tabla meteorological_data
router.get('/meteorological-data', csvController.getMeteorologicalData);

module.exports = router;
