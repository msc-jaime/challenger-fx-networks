const Sequelize = require('sequelize');
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.PG_DB,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    //host: 'localhost',
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'production' ? true : false,
  }
);
module.exports = sequelize;