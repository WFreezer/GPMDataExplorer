const Product = require('../models/product');
const Session = require('../models/session');


// Controlador para crear un nuevo producto
const createProduct = async (req, res) => {
  try {
      // Obtener los datos del cuerpo de la solicitud
      const { session_id, radiometer_id, satellite_id } = req.body;
  
      console.log('Datos recibidos:', { session_id, radiometer_id, satellite_id });
      
      // Verificar si el session_id existe en la tabla session
    const sessionExists = await Session.exists(session_id);
    
    if (!sessionExists) {
      return res.status(404).json({ message: 'La sesión no existe' });
    }
    console.log('Sesion existe: ' + sessionExists);
      // Crear el nuevo producto en la base de datos
      const newProduct = await Product.create(session_id, radiometer_id, satellite_id);

      console.log('Nuevo producto creado:', newProduct);
  
      // Enviar respuesta con el nuevo producto creado
      res.status(201).json(newProduct);
    } catch (error) {
      // Manejar errores
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Error creating product' });
    }
};

  // Controlador para obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Controlador para obtener productos por session_id
const getProductsBySessionId = async (req, res) => {
  console.log('Esta entrando en getProductBysessionId');
  const { sessionId } = req.params;
  try {
    console.log('Buscando productos asociados al session_id:', sessionId);
    const products = await Product.getBySessionId(sessionId);
    console.log('Productos encontrados:', products);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al buscar productos por session id:', error);
    res.status(500).json({ message: 'Error al buscar productos por session id' });
  }
};



module.exports = { getAllProducts, getProductsBySessionId, createProduct };