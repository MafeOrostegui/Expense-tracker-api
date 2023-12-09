const {
  getUser,
  registerUser,
  editUser,
  deleteUser,
} = require('../controllers/user/userController');
const { requireOwnership } = require('../middleware/auth');

module.exports = (app, nextMain) => {
  app.get('/users/:uid', requireOwnership, getUser);
  app.post('/users', registerUser);
  app.patch('/users/:uid', requireOwnership, editUser);
  app.delete('/users/:uid', requireOwnership, deleteUser);
  return nextMain();
};
