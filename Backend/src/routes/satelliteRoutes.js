const express = require('express');
const router = express.Router();
const satelliteController = require('../controllers/satelliteController');

/**
 * @swagger
 * tags:
 *   name: Satellites
 *   description: Endpoints relacionados con los satélites
 */

/**
 * @swagger
 * /api/satellites/radiometer/{radiometerId}:
 *   get:
 *     summary: Obtener satélites asociados a un radiómetro específico
 *     tags: 
 *       - Satellites
 *     parameters:
 *       - in: path
 *         name: radiometerId
 *         required: true
 *         description: ID del radiómetro
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de satélites obtenida exitosamente
 *       500:
 *         description: Error al obtener los satélites
 */
router.get('/radiometer/:radiometerId', satelliteController.getSatellitesByRadiometerId);

/**
 * @swagger
 * /api/satellites/{satelliteId}:
 *   get:
 *     summary: Obtener un satélite por su ID
 *     tags: 
 *       - Satellites
 *     parameters:
 *       - in: path
 *         name: satelliteId
 *         required: true
 *         description: ID del satélite
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Satélite obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       404:
 *         description: Satélite no encontrado
 *       500:
 *         description: Error al obtener el satélite por ID
 */
router.get('/:satelliteId', satelliteController.getSatelliteById);

module.exports = router;
