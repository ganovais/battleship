require('dotenv').config();
require('express-async-errors');
const app = require('./app');

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

module.exports = app;
