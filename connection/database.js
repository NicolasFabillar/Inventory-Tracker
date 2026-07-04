const Sequelize = require("sequelize");

const dotenv = require("dotenv");

dotenv.config();

const sequelizeConnect = new Sequelize({
  dialect: "mysql",
  timezone: "+08:00",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

module.exports = sequelizeConnect;