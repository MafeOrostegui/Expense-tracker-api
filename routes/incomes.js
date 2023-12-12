const {
  getIncomes,
  getIncome,
  createIncome,
  editIncome,
  deleteIncome,
} = require('../controllers/income/incomeController');
const { requireAuth } = require('../middleware/auth');

module.exports = (app, nextMain) => {
  app.get('/incomes', requireAuth, getIncomes);
  app.get('/incomes/:id', requireAuth, getIncome);
  app.post('/incomes', requireAuth, createIncome);
  app.patch('/incomes/:id', requireAuth, editIncome);
  app.delete('/incomes/:id', requireAuth, deleteIncome);

  return nextMain();
};
