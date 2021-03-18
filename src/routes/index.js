const mainRoutes = require('express').Router();

const authRoutes = require('./AuthRoutes');

mainRoutes.use('/auth', authRoutes);

module.exports = mainRoutes;