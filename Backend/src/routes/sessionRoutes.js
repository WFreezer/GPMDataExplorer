// sessionRoutes.js

const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

// Ruta para obtener todas las sesiones
router.get('/', sessionController.getAllSessions);

// Ruta para crear una nueva sesión
router.post('/', sessionController.createSession); 

module.exports = router;
