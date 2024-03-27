const Product = require('../models/product');


// Controlador para crear un nuevo producto
const createProduct = async (req, res) => {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const { session_id, radiometer_id, satellite_id } = req.body;
    
        // Crear el nuevo producto en la base de datos
        const newProduct = await Product.create({
          session_id,
          radiometer_id,
          satellite_id
        });
    
        // Enviar respuesta con el nuevo producto creado
        res.status(201).json(newProduct);
      } catch (error) {
        // Manejar errores
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product' });
      }
  };
  
// Otros controladores para actualizar, eliminar, obtener productos, etc.

module.exports = {  createProduct };