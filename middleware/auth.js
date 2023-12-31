const jwt = require('jsonwebtoken');

module.exports = (secret) => (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return res.status(401).json({ error: 'Invalid token type' });
  }

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err || !decodedToken.id) {
      return res.status(403).json({ error: 'Access denied', details: err.message });
    }

    req.user = decodedToken;
    next();
  });
};

module.exports.isAuthenticated = (req) => !!req.user;

module.exports.requireAuth = (req, resp, next) => {
  if (!module.exports.isAuthenticated(req)) {
    return next(401);
  }

  next();
};

module.exports.requireOwnership = (req, res, next) => {
  if (req.user && req.params.uid === req.user.id) {
    return next();
  }
  return res.status(403).json({ error: 'You do not have permission to access this resource' });
};
