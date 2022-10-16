const { resolve } = require('path');
const express = require('express');
const { AppError } = require('../errors/AppError');
const router = require('../routes');
const { makeConnection } = require('../database/conn');

const tmpFolder = resolve(__dirname, '..', 'uploads');
const app = express();
app.use(express.json());

app.use('/src/uploads', express.static(`${tmpFolder}`));

makeConnection();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(router);

app.use((err, req, res, _) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

console.log(typeof app);

module.exports = app;
