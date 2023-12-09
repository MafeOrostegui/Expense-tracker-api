const { login } = require('../controllers/auth/authController');

module.exports = (app, nextMain) => {
  app.post('/login', login);

  return nextMain();
};
