// radiometerRoutes.js

const express = require('express');
const router = express.Router();
const radiometerController = require('../controllers/radiometerController');

// Ruta para obtener los satélites asociados a un radiómetro específico
router.get('/', radiometerController.getAllRadiometers);

// Ruta para obtener un radiómetro por su ID
router.get('/:radiometerId', radiometerController.getRadiometerById);

module.exports = router;
