const { Router } = require('express');
const { create } = require('../controller/user.controller');

const userRoutes = Router();

userRoutes.post('/', create);

module.exports = { userRoutes };
