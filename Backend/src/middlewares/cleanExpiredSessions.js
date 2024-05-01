const db = require('../config/dbconnector');

const cleanExpiredSessions = async (req, res, next) => {
    try {
        // Buscar las sesiones expiradas
        const findExpiredSessionsQuery = 'SELECT session_id FROM session WHERE expiration < NOW()';
        const expiredSessions = await db.query(findExpiredSessionsQuery);

        if (expiredSessions.length > 0) {
            // Obtener los IDs de las sesiones expiradas
            const expiredSessionIds = expiredSessions.map(session => session.session_id);

            // Eliminar productos asociados a las sesiones expiradas
            const deleteProductsQuery = `DELETE FROM product WHERE session_id IN (${expiredSessionIds.map(id => `'${id}'`).join(',')})`;
            await db.query(deleteProductsQuery);

            // Eliminar filtros asociados a los productos eliminados
            const deleteFiltersQuery = `DELETE FROM filter WHERE product_id IN (SELECT product_id FROM product WHERE session_id IN (${expiredSessionIds.map(id => `'${id}'`).join(',')}))`;
            await db.query(deleteFiltersQuery);

            // Eliminar datos meteorológicos asociados a los filtros eliminados
            const deleteMeteorologicalDataQuery = `DELETE FROM meteorological_data WHERE id_filter IN (SELECT id_filter FROM filter WHERE product_id IN (SELECT product_id FROM product WHERE session_id IN (${expiredSessionIds.map(id => `'${id}'`).join(',')})))`;
            await db.query(deleteMeteorologicalDataQuery);

            // Eliminar las sesiones expiradas de la tabla de sesiones
            const deleteSessionsQuery = `DELETE FROM session WHERE session_id IN (${expiredSessionIds.map(id => `'${id}'`).join(',')})`;
            await db.query(deleteSessionsQuery);
        }

        console.log("Realizando limpieza de sesiones expiradas");
        // Llama a next() para pasar al siguiente middleware en la cadena
        next();
    } catch (error) {
        // Manejo de errores si es necesario
        next(error);
    }
};

module.exports = cleanExpiredSessions;
