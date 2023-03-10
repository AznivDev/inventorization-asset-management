const express = require('express');
const cors = require('cors');

const { useEnv, getEnv } = require('./utils/env');
useEnv();

const connectionInit = require('./db/init');
const { sequelize } = require('./db/sequelize');
const { configureRouter } = require('./utils/app');
const { runMigrations } = require('./db/migrations');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

configureRouter(app);

const port = getEnv('PORT');

app.listen(port, () => {
  console.info(`Listening to ${port}`);

  connectionInit()
    .then((_) => sequelize.sync({ alter: false, force: false }).then((_) => runMigrations()))
    .catch((err) => console.error(err));
});
