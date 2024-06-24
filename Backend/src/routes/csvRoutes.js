const express = require('express');
const router = express.Router();
const csvController = require('../controllers/csvController');

// Ruta para importar datos desde un archivo CSV
router.post('/import', csvController.importCSVToDatabase);


module.exports = router;
