

const express = require('express');
const router = express.Router();
const csvController = require('../controllers/csvController');

/**
 * @swagger
 * tags:
 *   name: CSV
 *   description: Endpoints relacionados con la gestión de archivos CSV
 */

/**
 * @swagger
 * /api/csv/import:
 *   post:
 *     summary: Importa datos desde un archivo CSV a la base de datos
 *     tags: 
 *       - CSV
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_filter:
 *                 type: integer
 *                 description: ID del filtro asociado a los datos importados
 *               day:
 *                 type: string
 *                 format: date
 *                 description: Día para el cual se importan los datos
 *     responses:
 *       200:
 *         description: Archivo CSV procesado y datos insertados en la base de datos
 *       400:
 *         description: Los parámetros requeridos no fueron proporcionados o son inválidos
 *       500:
 *         description: Error al procesar el archivo CSV
 */
router.post('/import', csvController.importCSVToDatabase);

/**
 * @swagger
 * /api/csv/meteorological-data:
 *   get:
 *     summary: Obtiene datos meteorológicos filtrados desde la base de datos
 *     tags: 
 *       - CSV
 *     parameters:
 *       - in: query
 *         name: id_filter
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID del filtro para el cual obtener los datos
 *       - in: query
 *         name: day
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           description: Día para el cual obtener los datos meteorológicos
 *     responses:
 *       200:
 *         description: Datos meteorológicos obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: No se encontraron datos para los filtros proporcionados
 *       500:
 *         description: Error al obtener datos meteorológicos
 */
router.get('/meteorological-data', csvController.getMeteorologicalData);

module.exports = router;


module.exports = router;
