const {
  getAccounts,
  getAccount,
  createAccount,
  editAccount,
  deleteAccount,
} = require('../controllers/account/accountController');
const { requireAuth } = require('../middleware/auth');

module.exports = (app, nextMain) => {
  app.get('/accounts', requireAuth, getAccounts);
  app.get('/accounts/:id', requireAuth, getAccount);
  app.post('/accounts', requireAuth, createAccount);
  app.patch('/accounts/:id', requireAuth, editAccount);
  app.delete('/accounts/:id', requireAuth, deleteAccount);

  return nextMain();
};
