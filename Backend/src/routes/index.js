const express = require('express');
const router = express.Router();

const sessionRoutes = require('./sessionRoutes');
const productsRoutes = require('./productRoutes');

router.use('/sessions', sessionRoutes);
router.use('/products',productsRoutes);

module.exports = router;
