const mysql = require("mysql");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const db = mysql.createConnection({
  host: process.env.SQL_SERVER,
  user: process.env.SQL_LOGIN, 
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB_NAME, 
});

const pool = mysql.createPool({
  connectionLimit: 20,
  host: process.env.SQL_SERVER,
  user: process.env.SQL_LOGIN, 
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB_NAME, 
});

module.exports = pool; 
