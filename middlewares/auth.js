const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const UnauthorizedError = require('../errors/401-unauthorized-error');
const ForbiddenError = require('../errors/403-forbidden-error');

dotenv.config();
const { JWT_SECRET, NODE_ENV } = process.env;

exports.Auth = (req, res, next) => {
  const token = req.cookies.userToken;

  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
  } catch (err) {
    throw new ForbiddenError('Не достаточно прав');
  }

  req.user = payload;

  return next();
};
