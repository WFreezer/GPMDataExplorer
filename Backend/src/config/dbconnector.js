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

// Crear la conexión a la base de datos
const connection = mysql.createConnection(dbConfig);

// Verificar si la conexión fue exitosa
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa con la base de datos');
});

// Exportar la conexión para que pueda ser utilizada en otros módulos
module.exports = connection;
