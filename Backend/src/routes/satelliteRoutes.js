// sartelliteRoutes.js

const express = require('express');
const router = express.Router();
const satelliteController = require('../controllers/satelliteController');

// Ruta para obtener los satélites asociados a un radiómetro específico
router.get('/:radiometerId', satelliteController.getSatellitesByRadiometerId);

module.exports = router;
