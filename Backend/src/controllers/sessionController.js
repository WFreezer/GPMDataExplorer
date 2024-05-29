// sessionController.js

const Session = require('../models/session');

// Obtener todas las sesiones
const getAllSessions = async (req, res) => {
  try {
    // Obtener todas las sesiones desde el modelo
    const sessions = await Session.getAll();
    console.log("Sessions from database:", sessions); 
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
    expiration.setMinutes(expiration.getMinutes() + 120);
    
    // Insertar la nueva sesión en la base de datos
    const newSession = await Session.create(username, expiration);
    console.log('Nueva sesión creada:', newSession);
    
     // Establecer una cookie de sesión en la respuesta
     res.cookie('sessionId', newSession.session_id, { maxAge: 120 * 60 * 1000, httpOnly: true, secure: true });
     console.log('Cookie de sesión establecida:', newSession.session_id);

    res.status(201).json(newSession);
  } catch (error) {
    console.error('Error al intentar crear una nueva sesión:', error);
    res.status(500).json({ message: 'Error al crear la sesión' });
  }
};




module.exports = { getAllSessions, createSession };
