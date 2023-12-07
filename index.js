require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");

const { port } = config;
const app = express();
mongoose.connect(config.dbUrl);

app.set("config", config);

app.listen(port, () => {
  console.info(`App listening on port ${port}`);
});
