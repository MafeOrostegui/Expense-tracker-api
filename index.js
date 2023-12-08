require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');
const errorHandler = require('./middleware/error');
const pkg = require('./package.json');

const { port } = config;
const app = express();
const database = mongoose.connection;
mongoose.connect(config.dbUrl);

database.on('error', (error) => {
  console.error(error);
});

database.once('connected', () => {
  console.info('Database Connected');
});

app.set('config', config);
app.set('pkg', pkg);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.use(errorHandler);

  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
});
