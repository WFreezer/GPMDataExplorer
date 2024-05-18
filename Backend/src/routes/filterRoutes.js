const express = require('express');
const router = express.Router();
const filterController = require('../controllers/filterController');

/**
 * @swagger
 * tags:
 *   name: Filters
 *   description: Endpoints relacionados con los filtros
 */

/**
 * @swagger
 * /api/filter/variables:
 *   get:
 *     summary: Obtiene los datos de la tabla variables_select
 *     tags: 
 *       - Filters
 *     responses:
 *       200:
 *         description: Lista de variables
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/variables', filterController.getVariables);

/**
 * @swagger
 * /api/filter/layers:
 *   get:
 *     summary: Obtiene los datos de la tabla layer_values
 *     tags: 
 *       - Filters
 *     responses:
 *       200:
 *         description: Lista de capas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/layers', filterController.getLayers);

/**
 * @swagger
 * /api/filter:
 *   post:
 *     summary: Crea un nuevo filtro
 *     tags: 
 *       - Filters
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filterData:
 *                 type: object
 *                 description: Datos del filtro
 *     responses:
 *       201:
 *         description: Filtro creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                 filter:
 *                   type: object
 *                   description: El filtro creado
 *       400:
 *         description: Los datos del filtro no son válidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 */
router.post('/', filterController.createFilter);

/**
 * @swagger
 * /api/filter/{id_filter}:
 *   get:
 *     summary: Obtiene un filtro por su ID
 *     tags: 
 *       - Filters
 *     parameters:
 *       - in: path
 *         name: id_filter
 *         required: true
 *         description: ID del filtro a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Filtro encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                 filter:
 *                   type: object
 *                   description: El filtro encontrado
 *       404:
 *         description: Filtro no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 */
router.get('/:id_filter', filterController.getFilterById);

/**
 * @swagger
 * /api/filter/product/{product_id}:
 *   get:
 *     summary: Obtiene los filtros por ID de producto
 *     tags: 
 *       - Filters
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         description: ID del producto para el cual obtener los filtros
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Filtros encontrados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                 filters:
 *                   type: array
 *                   items:
 *                     type: object
 *                   description: Lista de filtros encontrados
 *       404:
 *         description: No se encontraron filtros para el producto especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 */
router.get('/product/:product_id', filterController.getFilterByProductId);

/**
 * @swagger
 * /api/filter/product/{product_id}/available-dates:
 *   get:
 *     summary: Obtiene las fechas disponibles para un producto específico
 *     tags: 
 *       - Filters
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         description: ID del producto para el cual obtener las fechas disponibles
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fechas disponibles obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 format: date
 *       404:
 *         description: No se encontraron fechas disponibles para el producto especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 */
router.get('/product/:product_id/available-dates', filterController.getAvailableDatesForProduct);

module.exports = router;
