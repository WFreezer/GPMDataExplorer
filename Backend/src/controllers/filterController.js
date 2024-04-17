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
        const newFilter = await filterModel.createFilter(req.body);
        res.json(newFilter);
    } catch (error) {
        console.error('Error al crear un nuevo filtro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Función para obtener un filtro por id_filter
const getFilterById = async (req, res) => {
    const id_filter = req.params.id_filter;
    try {
        const filter = await filterModel.getFilterById(id_filter);
        if (!filter) {
            res.status(404).json({ message: 'Filtro no encontrado' });
            return;
        }
        res.json(filter);
    } catch (error) {
        console.error('Error al obtener un filtro por id_filter:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Función para obtener un filtro por product_id
const getFilterByProductId = async (req, res) => {
    const product_id = req.params.product_id;
    try {
        const filter = await filterModel.getFilterByProductId(product_id);
        if (!filter) {
            res.status(404).json({ message: 'Filtro no encontrado' });
            return;
        }
        res.json(filter);
    } catch (error) {
        console.error('Error al obtener un filtro por product_id:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportar las funciones del controlador
module.exports = {
    getVariables,
    getLayers,
    createFilter,
    getFilterById,
    getFilterByProductId
};