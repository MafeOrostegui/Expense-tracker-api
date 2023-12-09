const {
  getCategories,
  getCategory,
  createCategory,
  editCategory,
  deleteCategory,
} = require('../controllers/category/categoryController');
const { requireAuth } = require('../middleware/auth');

module.exports = (app, nextMain) => {
  app.get('/categories', requireAuth, getCategories);
  app.get('/categories/:categoryid', requireAuth, getCategory);
  app.post('/categories', requireAuth, createCategory);
  app.patch('/categories/:categoryid', requireAuth, editCategory);
  app.delete('/categories/:categoryid', requireAuth, deleteCategory);

  return nextMain();
};
