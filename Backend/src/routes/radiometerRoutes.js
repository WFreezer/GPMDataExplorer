// radiometerRoutes.js

const express = require('express');
const router = express.Router();
const radiometerController = require('../controllers/radiometerController');

// Ruta para obtener los satélites asociados a un radiómetro específico
router.get('/', radiometerController.getAllRadiometers);

module.exports = router;
