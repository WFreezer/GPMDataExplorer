const express = require('express');
const router = express.Router();
const radiometerController = require('../controllers/radiometerController');

/**
 * @swagger
 * tags:
 *   name: Radiometers
 *   description: Endpoints relacionados con los radiómetros
 */

/**
 * @swagger
 * /api/radiometers:
 *   get:
 *     summary: Obtener todos los radiómetros
 *     tags: 
 *       - Radiometers
 *     responses:
 *       200:
 *         description: Lista de radiómetros obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *       500:
 *         description: Error al obtener los radiómetros
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/', radiometerController.getAllRadiometers);

/**
 * @swagger
 * /api/radiometers/{radiometerId}:
 *   get:
 *     summary: Obtener un radiómetro por su ID
 *     tags: 
 *       - Radiometers
 *     parameters:
 *       - in: path
 *         name: radiometerId
 *         required: true
 *         description: ID del radiómetro
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Radiómetro obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       500:
 *         description: Error al obtener el radiómetro por ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/:radiometerId', radiometerController.getRadiometerById);

module.exports = router;
