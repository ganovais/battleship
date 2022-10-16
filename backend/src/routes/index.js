const { Router } = require('express');
const { login } = require('../controller/user.controller');
const { userRoutes } = require('./user.routes');

const router = Router();

router.use('/users', userRoutes);
router.post('/login', login);

module.exports = router;
