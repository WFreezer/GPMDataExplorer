// opendapRoutes.js

const express = require('express');
const router = express.Router();
const opendapController = require('../controllers/opendapController'); // Asegúrate de tener un controlador para manejar las solicitudes relacionadas con OpenDAP

// Ruta para generar la URL de acceso a los datos OpenDAP
router.get('/generar-url/:id_filter', opendapController.generarURL); 

module.exports = router;
