const mysql = require('mysql2');
const { getEnv } = require('../utils/env');

const connectionInit = async () =>
  new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: getEnv('DB_HOST'),
      user: getEnv('DB_USER'),
      password: getEnv('DB_PWD'),
      port: getEnv('DB_PORT'),
    });

    connection.query(`CREATE DATABASE IF NOT EXISTS ${getEnv('DB_NAME')}`, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });

    connection.end;
  });

module.exports = connectionInit;
