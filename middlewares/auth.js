const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/401-unauthorized-error');
const ForbiddenError = require('../errors/403-forbidden-error');

const JWT_SECRET_KEY = 'extremly_secret_key';

exports.Auth = (req, res, next) => {
  const token = req.cookies.userToken;

  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    throw new ForbiddenError('Не достаточно прав');
  }

  req.user = payload;

  return next();
};
