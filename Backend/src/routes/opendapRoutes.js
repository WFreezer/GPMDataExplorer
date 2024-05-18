const express = require('express');
const router = express.Router();
const opendapController = require('../controllers/opendapController');

/**
 * @swagger
 * tags:
 *   name: OpenDAP
 *   description: Endpoints relacionados con OpenDAP
 */

/**
 * @swagger
 * /api/opendap/generar-url/{id_filter}:
 *   get:
 *     summary: Genera la URL de acceso a los datos OpenDAP
 *     tags: 
 *       - OpenDAP
 *     parameters:
 *       - in: path
 *         name: id_filter
 *         required: true
 *         description: ID del filtro
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: URL generada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 urls:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Error al generar la URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/generar-url/:id_filter', opendapController.generarURL);

module.exports = router;
