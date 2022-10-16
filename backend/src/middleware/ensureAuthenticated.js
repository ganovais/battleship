const { verify } = require('jsonwebtoken');

const { AppError } = require('../errors/AppError');
const { findById } = require('../services/user.service');

exports.ensureAuthenticated = async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('missing auth token', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, 'e815d71ce6e97fef83815bd851361823');
    const data = JSON.parse(sub);

    const user = await findById(data.userId);

    if (!user) {
      throw new AppError('jwt malformed', 401);
    }

    request.userId = data.userId;

    next();
  } catch (error) {
    throw new AppError('jwt malformed', 401);
  }
};
