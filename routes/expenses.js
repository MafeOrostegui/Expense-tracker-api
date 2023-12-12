const {
  getExpenses,
  getExpense,
  createExpense,
  editExpense,
  deleteExpense,
} = require('../controllers/expense/expenseController');
const { requireAuth } = require('../middleware/auth');

module.exports = (app, nextMain) => {
  app.get('/expenses', requireAuth, getExpenses);
  app.get('/expenses/:id', requireAuth, getExpense);
  app.post('/expenses', requireAuth, createExpense);
  app.patch('/expenses/:id', requireAuth, editExpense);
  app.delete('/expenses/:id', requireAuth, deleteExpense);

  return nextMain();
};
