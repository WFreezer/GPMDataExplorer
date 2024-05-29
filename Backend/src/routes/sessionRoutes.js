const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

/**
 * @swagger
 * tags:
 *   - name: Sessions
 *     description: Endpoints relacionados con las sesiones
 */

/**
 * @swagger
 * /api/sessions:
 *   get:
 *     summary: Obtiene todas las sesiones
 *     tags: 
 *       - Sessions
 *     responses:
 *       200:
 *         description: Lista de sesiones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', sessionController.getAllSessions);

/**
 * @swagger
 * /api/sessions:
 *   post:
 *     summary: Crea una nueva sesión
 *     tags: 
 *       - Sessions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario para la sesión
 *                 example: "Amanda"
 *     responses:
 *       201:
 *         description: Sesión creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 session_id:
 *                   type: string
 *                   description: ID de la sesión creada
 *                 username:
 *                   type: string
 *                   description: Nombre de usuario de la sesión
 *                 expiration:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de expiración de la sesión
 *       500:
 *         description: Error al crear la sesión
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post('/', sessionController.createSession);

module.exports = router;
