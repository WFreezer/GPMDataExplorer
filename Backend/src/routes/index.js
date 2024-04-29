const express = require('express');
const router = express.Router();

const sessionRoutes = require('./sessionRoutes');
const productsRoutes = require('./productRoutes');
const radiometerRoutes = require('./radiometerRoutes');
const satelliteRoutes = require('./satelliteRoutes');
const filterRoutes = require('./filterRoutes');
const opendapRoutes= require('./opendapRoutes');

router.use('/sessions', sessionRoutes);
router.use('/products',productsRoutes);
router.use('/radiometers', radiometerRoutes);
router.use('/satellites',satelliteRoutes);
router.use('/filter', filterRoutes);
router.use('/opendap', opendapRoutes);

module.exports = router;
