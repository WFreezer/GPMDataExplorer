// models/session.js

const db = require('../config/dbconnector');

// Define el modelo de sesión
const Session = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    session_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    expiration: DataTypes.DATE
  });

  return Session;
};

module.exports = (sequelize, DataTypes) => Session(sequelize, DataTypes);
