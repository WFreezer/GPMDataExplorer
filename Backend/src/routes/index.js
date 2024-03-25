const express = require('express');
const router = express.Router();

const sessionRoutes = require('./sessionRoutes');

router.use('/sessions', sessionRoutes);


module.exports = router;
