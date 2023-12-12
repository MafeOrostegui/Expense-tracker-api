const authRoute = require('./auth');
const usersRoute = require('./users');
const categoriesRoute = require('./categories');
const accountsRoute = require('./accounts');
const incomesRoute = require('./incomes');

const root = (app, next) => {
  const pkg = app.get('pkg');
  app.get('/', (req, res) => res.json({ name: pkg.name, version: pkg.version }));
  app.all('*', (req, resp, nextAll) => nextAll(404));
  return next();
};

const registerRoutes = (app, routes, callback) => {
  if (!routes.length) {
    return callback();
  }

  routes[0](app, (error) => {
    if (error) {
      return callback(error);
    }
    return registerRoutes(app, routes.slice(1), callback);
  });
};

module.exports = (app, next) => registerRoutes(app, [
  authRoute, usersRoute, categoriesRoute, accountsRoute, incomesRoute, root], next);
