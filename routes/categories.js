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
  app.get('/categories/:id', requireAuth, getCategory);
  app.post('/categories', requireAuth, createCategory);
  app.patch('/categories/:id', requireAuth, editCategory);
  app.delete('/categories/:id', requireAuth, deleteCategory);

  return nextMain();
};
