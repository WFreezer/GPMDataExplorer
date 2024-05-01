// opendapRoutes.js

const express = require('express');
const router = express.Router();
const opendapController = require('../controllers/opendapController');


// Ruta para obtener todos los productos
router.get('/generar-url/:id_filter', opendapController.generarURL);



module.exports = router;
