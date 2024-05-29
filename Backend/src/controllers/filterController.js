// Importar el modelo
const filterModel = require('../models/filter');

// Función para obtener los datos de la tabla variables_select
const getVariables = async (req, res) => {
    try {
        const variables = await filterModel.getVariables();
        res.json(variables);
    } catch (error) {
        console.error('Error al obtener los datos de la tabla variables_select:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Función para obtener los datos de la tabla layer_values
const getLayers = async (req, res) => {
    try {
        const layers = await filterModel.getLayers();
        res.json(layers);
    } catch (error) {
        console.error('Error al obtener los datos de la tabla layer_values:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};



// Función para crear un nuevo filtro
const createFilter = async (req, res) => {
    try {
        const filterData = req.body; 
        const newFilter = await filterModel.createFilter(filterData);
        res.status(201).json({ success: true, filter: newFilter });
    } catch (error) {
        console.error('Error al crear el filtro:', error);
        res.status(500).json({ success: false, message: 'Error al crear el filtro' });
    }
};



const getFilterById = async (req, res) => {
    const id_filter = req.params.id_filter;
    try {
        const filter = await filterModel.getFilterById(id_filter);
        if (filter) {
            console.log('Filter found:', filter); // Registro para verificar el filtro encontrado
            res.status(200).json({ success: true, filter });
        } else {
            console.log('Filter not found for id:', id_filter); // Registro para indicar que el filtro no se encontró
            res.status(404).json({ success: false, message: 'Filter not found' });
        }
    } catch (error) {
        console.error('Error fetching filter by id:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Función para obtener los filtros con product_id
const getFilterByProductId = async (req, res) => {
    const product_id = req.params.product_id;
    console.log('Searching for filters with product_id:', product_id); // Agregar log para el product_id recibido
    try {
        const filter = await filterModel.getFilterByProductId(product_id);
        if (filter) {
            console.log('Filters found:', filter); // Agregar log para los filtros encontrados
            res.status(200).json({ success: true, filter });
        } else {
            console.log('Filters not found for product_id:', product_id); // Agregar log para indicar que no se encontraron filtros
            res.status(404).json({ success: false, message: 'Filters not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


// Función para obtener las fechas disponibles para un producto específico
const getAvailableDatesForProduct = async (req, res) => {
    const product_id = req.params.product_id;
    try {
        const availableDates = await filterModel.getAvailableDatesForProduct(product_id);
        if (!availableDates) {
            res.status(404).json({ message: 'Fechas disponibles no encontradas para el producto especificado' });
            return;
        }
        res.json(availableDates);
    } catch (error) {
        console.error('Error al obtener las fechas disponibles para un producto específico:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportar las funciones del controlador
module.exports = {
    getVariables,
    getLayers,
    createFilter,
    getFilterById,
    getFilterByProductId,
    getAvailableDatesForProduct
};


