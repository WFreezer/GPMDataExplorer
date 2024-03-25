// app.js
const express = require('express');
const cors = require('cors');
const db = require('./config/dbconnector');
const routes = require('./routes');
const cleanExpiredSessions = require('./middlewares/cleanExpiredSessions');

const app = express();
const port = process.env.PORT || 3000;

// Para analizar solicitudes JSON
app.use(express.json());

// Para analizar solicitudes de URL codificadas
app.use(express.urlencoded({ extended: true }));

// Middleware para permitir solicitudes de otros dominios (CORS)
app.use(cors());

// Usar cleanExpiredSessions(limpia sesiones expiradas)
app.use(cleanExpiredSessions);

// Montar las rutas
app.use('/api', routes);

// Iniciar el servidor
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });