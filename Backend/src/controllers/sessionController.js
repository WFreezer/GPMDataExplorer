// sessionController.js

const Session = require('../models/session');

// Obtener todas las sesiones
const getAllSessions = async (req, res) => {
  try {
    // Obtener todas las sesiones desde el modelo
    const sessions = await Session.getAll();
    res.json(sessions);
  } catch (error) {
    console.error('Error al obtener las sesiones:', error);
    res.status(500).json({ message: 'Error al obtener las sesiones' });
  }
};

// Crear una nueva sesión y eliminar las sesiones expiradas
const createSession = async (req, res) => {
  try {
    console.log('Intentando crear una nueva sesión...');
    const { username } = req.body;
    console.log('Datos recibidos:', username);
    
    // Crear la nueva sesión con la fecha de expiración programada
    const expiration = new Date();
    expiration.setMinutes(expiration.getSeconds() + 120); // Sumar 120 minutos
    console.log('Fecha de expiración:', expiration);
    
    // Insertar la nueva sesión en la base de datos
    console.log("Username: "+ username);
    console.log("Expiration :" + expiration);
    const newSession = await Session.create(username, expiration);
    console.log('Nueva sesión creada:', newSession);
    
    res.status(201).json(newSession);
  } catch (error) {
    console.error('Error al intentar crear una nueva sesión:', error);
    res.status(500).json({ message: 'Error al crear la sesión' });
  }
};

module.exports = { getAllSessions, createSession };
