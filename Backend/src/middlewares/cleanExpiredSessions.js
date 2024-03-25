const db = require('../config/dbconnector');

const cleanExpiredSessions = async (req, res, next) => {
    try {
        // Eliminar sesiones expiradas
        const deleteQuery = 'DELETE FROM session WHERE expiration < NOW()';
        await db.query(deleteQuery);
        
        // Llama a next() para pasar al siguiente middleware en la cadena
        next();
    } catch (error) {
        // Manejo de errores si es necesario
        next(error);
    }
};

module.exports = cleanExpiredSessions;
