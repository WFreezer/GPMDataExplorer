// sessionController.js

const db = require('../config/dbconnector');

// Obtener todas las sesiones
const getAllSessions = async (req, res) => {
  try {
    // Realizar la consulta a la base de datos para obtener todas las sesiones
    const [rows] = await db.query('SELECT * FROM session');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener las sesiones:', error);
    res.status(500).json({ message: 'Error al obtener las sesiones' });
  }
};



// Crear una nueva sesión y eliminar las sesiones expiradas
const createSession = async (req, res) => {
  // try {
  //   console.log('Intentando crear una nueva sesión...');
  //   const { username } = req.body;
  //   console.log('Datos recibidos:', username);
    
     
  //   // Eliminar las sesiones expiradas
  //   const deleteQuery = 'DELETE FROM session WHERE expiration < NOW()';
  //   await db.query(deleteQuery);
  //   console.log('Sesiones expiradas eliminadas correctamente.');

  //   // Crear la nueva sesión con la fecha de expiración programada
  //   const expiration = new Date();
  //   expiration.setMinutes(expiration.getSeconds() + 120); // Sumar 120 minutos
  //   console.log('Fecha de expiración:', expiration);
    
  //   // Insertar la nueva sesión en la base de datos
    
  //   const sessionId = generateUniqueId(); // Puedes implementar tu lógica para generar un ID único
  //   const newSession = {
  //     session_id: sessionId,
  //     name: username,
  //     expiration: expiration
  //   };
  //   const insertQuery = 'INSERT INTO session (session_id,name,created_at, expiration) VALUES (?, ?)';
  //   console.log('Nueva sesión creada:', newSession);
   
    
  //   res.status(201).json(newSession);
  // } catch (error) {
  //   console.error('Error al intentar crear una nueva sesión:', error);
  //   res.status(500).json({ message: 'Error al crear la sesión' });
  // }
};

// Función para generar un ID único (puedes usar una biblioteca como `uuid` o generar uno personalizado)
function generateUniqueId() {
    const timestamp = new Date().getTime().toString(36);
    const randomPart = Math.random().toString(36).substr(2, 5); // Utiliza los primeros 5 caracteres
  
    return timestamp + randomPart;
  }

module.exports = { getAllSessions, createSession };
