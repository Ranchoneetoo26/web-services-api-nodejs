// src/Infrastructure/Express/Middlewares/AuthMiddleware.js

const jwt = require('jsonwebtoken');
const config = require('src/config');

// A função agora pode ser síncrona, o que simplifica o fluxo
module.exports = (tokenBlacklistRepository) => async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const isBlacklisted = await tokenBlacklistRepository.exists(token);
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token has been revoked. Please log in again.' });
    }

    const decoded = jwt.verify(token, config.jwt.secret);


    req.user = decoded;


    next();
  } catch (error) {

    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};