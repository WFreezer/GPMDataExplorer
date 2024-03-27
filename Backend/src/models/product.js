// models/Product.js
const db = require('../config/dbconnector');

const Product = {
  getAll: function () {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM product', (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  getBySessionId: function (sessionId) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM product WHERE session_id = ?', [sessionId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  create: function (sessionId, radiometerId, satelliteId) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO product (session_id, radiometer_id, satellite_id) VALUES (?, ?, ?)';
      db.query(sql, [sessionId, radiometerId, satelliteId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
};

module.exports = Product;
