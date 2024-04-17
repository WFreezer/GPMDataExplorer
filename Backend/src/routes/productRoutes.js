// productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


// Ruta para crear un producto seleccionado por usuario
router.post('/', productController.createProduct); 

// Ruta para obtener todos los productos
router.get('/', productController.getAllProducts);

// Ruta para obtener los productos asociados a una sesión específica
router.get('/session/:sessionId', productController.getProductsBySessionId);


module.exports = router;
