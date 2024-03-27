const express = require('express');
const router = express.Router();

const sessionRoutes = require('./sessionRoutes');
const productsRoutes = require('./productRoutes');

router.use('/sessions', sessionRoutes);
router.use('/product',productsRoutes);

module.exports = router;
