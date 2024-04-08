// sartelliteRoutes.js

const express = require('express');
const router = express.Router();
const satelliteController = require('../controllers/satelliteController');

// Ruta para obtener los satélites asociados a un radiómetro específico
router.get('/radiometer/:radiometerId', satelliteController.getSatellitesByRadiometerId);

// Ruta para obtener un satélite por su ID
router.get('/:satelliteId', satelliteController.getSatelliteById);

module.exports = router;
