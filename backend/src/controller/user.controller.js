const { create, createAdmin, login } = require('../services/user.service');

exports.create = async (request, response) => {
  const { name, email, password } = request.body;

  const user = await create(name, email, password);

  delete user.password;
  return response.status(201).send({ user });
};

exports.createAdmin = async (request, response) => {
  const { name, email, password } = request.body;
  const userLoggedId = request.userId;
  const userRole = request.role;

  const userLogged = {
    id: userLoggedId,
    role: userRole,
  };

  const user = await createAdmin(name, email, password, userLogged);

  delete user.password;
  return response.status(201).send({ user });
};

exports.login = async (request, response) => {
  const { name } = request.body;

  if (!name) {
    return response.status(401).send({ message: 'All fields must be filled' });
  }

  const token = await login(name);
  return response.status(200).send({ token });
};
