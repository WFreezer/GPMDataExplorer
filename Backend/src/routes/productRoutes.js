// productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


// Ruta para crear un producto seleccionado por usuario
router.post('/', productController.createProduct); 

module.exports = router;
