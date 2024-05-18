const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints relacionados con los productos
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un producto seleccionado por el usuario
 *     tags: 
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               session_id:
 *                 type: integer
 *               radiometer_id:
 *                 type: integer
 *               satellite_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 session_id:
 *                   type: integer
 *                 radiometer_id:
 *                   type: integer
 *                 satellite_id:
 *                   type: integer
 *       404:
 *         description: La sesión no existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error al crear el producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/', productController.createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: 
 *       - Products
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   session_id:
 *                     type: integer
 *                   radiometer_id:
 *                     type: integer
 *                   satellite_id:
 *                     type: integer
 *       500:
 *         description: Error al obtener los productos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /api/products/session/{sessionId}:
 *   get:
 *     summary: Obtener productos asociados a una sesión específica
 *     tags: 
 *       - Products
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         description: ID de la sesión
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Productos asociados a la sesión obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   session_id:
 *                     type: integer
 *                   radiometer_id:
 *                     type: integer
 *                   satellite_id:
 *                     type: integer
 *       500:
 *         description: Error al buscar productos por session id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/session/:sessionId', productController.getProductsBySessionId);

module.exports = router;
