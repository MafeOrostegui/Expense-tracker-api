require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const errorHandler = require('./middleware/error');
const authHandler = require('./middleware/auth');
const routes = require('./routes');
const pkg = require('./package.json');

const { port, dbUrl, secret } = config;
const app = express();

app.set('config', config);
app.set('pkg', pkg);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(authHandler(secret));
app.use(express.json());

mongoose.Promise = Promise;
mongoose.connect(dbUrl);

const database = mongoose.connection;

database.on('error', (error) => {
  console.error('Database connection error:', error);
});

database.once('connected', () => {
  console.info('Database Connected');
});

routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.use(errorHandler);

  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
});
