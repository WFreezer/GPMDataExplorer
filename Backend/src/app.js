// app.js
const express = require('express');
const cors = require('cors');
const db = require('./config/dbconnector');
const routes = require('./routes');
const cleanExpiredSessions = require('./middlewares/cleanExpiredSessions');
const cookieParser = require('cookie-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 3000;

// Para analizar solicitudes JSON
app.use(express.json());

// Para analizar solicitudes de URL codificadas
app.use(express.urlencoded({ extended: true }));

// Middleware para permitir solicitudes de otros dominios (CORS)
app.use(cors());

// Middleware para manejo de cookies
app.use(cookieParser());

// Usar cleanExpiredSessions(limpia sesiones expiradas)
app.use(cleanExpiredSessions);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'GPMDataExplorer',
      version: '1.0.0',
      description: 'Documentación de la API del proyecto GPMDataExplorer para el Trabajo de Fin de Grado de Ingeniería Informática de la Universidad Politécnica de Madrid'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo'
      }
    ],
    
  },
  apis: ['./routes/*.js'] // Ruta a los archivos de las rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Montar las rutas
app.use('/api', routes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});