const express = require('express');
const router = express.Router();
const filterController = require('../controllers/filterController');

// Ruta para obtener los datos de la tabla variables_select
router.get('/variables', filterController.getVariables);

// Ruta para obtener los datos de la tabla layer_values
router.get('/layers', filterController.getLayers);

// Ruta para crear un nuevo filtro
router.post('/', filterController.createFilter);

// Ruta para obtener un filtro por id_filter
router.get('/:id_filter', filterController.getFilterById);

// Ruta para obtener un filtro por product_id
router.get('/product/:product_id', filterController.getFilterByProductId);

// Obtener las fechas disponibles para un producto específico
router.get('/product/:product_id/available-dates', filterController.getAvailableDatesForProduct);


module.exports = router;
