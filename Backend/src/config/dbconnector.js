// dbconnector.js
const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const dbConfig = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '54911f7d',
  database: 'gpmdataexplorer',  
};

// Crear un pool de conexiones
const pool = mysql.createPool(dbConfig);

// Función para ejecutar consultas a la base de datos
function query(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      connection.query(sql, values, (error, results) => {
        connection.release();

        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  });
}

module.exports = { query };
