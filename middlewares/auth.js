const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'extremly_secret_key';

exports.Auth = (req, res, next) => {
  const token = req.cookies.userToken;

  if (!token) {
    return res.status(401).send({ message: 'Необходимо залогиниться' });
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    return res.status(403).send({ message: 'Не достаточно прав' });
  }

  req.user = payload;

  return next();
};
