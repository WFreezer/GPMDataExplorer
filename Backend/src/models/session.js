// models/session.js
const db = require('../config/dbconnector');

// Modelo de sesión
const Session = {
  // Método para obtener todas las sesiones
  getAll: async () => {
    try {
      // Realizar la consulta a la base de datos para obtener todas las sesiones
      const rows = await db.query('SELECT * FROM session');
      
      return rows;
    } catch (error) {
      throw new Error(`Error fetching sessions: ${error.message}`);
    }
  },

  // Método para crear una nueva sesión
  create: async (name, expiration) => {
    try {
      // Insertar la nueva sesión en la base de datos
      console.log("Dentro de create del model")
      const sessionId = generateUniqueId();
      console.log("SessionId: "+ sessionId);
      const insertQuery = 'INSERT INTO session (session_id, name, created_at, expiration) VALUES (?, ?, NOW(), ?)';
      await db.query(insertQuery, [sessionId, name, expiration]);
      const newSession = {
        session_id: sessionId,
        name: name,
        created_at: new Date().toLocaleString(),
        expiration: expiration.toLocaleString()
      };
      console.log("Session: "+ newSession.name);
      return newSession;
    } catch (error) {
      throw new Error(`Error creating session: ${error.message}`);
    }
  }
};

// Función para generar un ID único
function generateUniqueId() {
  const timestamp = new Date().getTime().toString(36);
  const randomPart = Math.random().toString(36).substr(2, 5);
  return timestamp + randomPart;
}

module.exports = Session;
