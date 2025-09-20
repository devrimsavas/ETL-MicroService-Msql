const Sequelize = require("sequelize");
const path = require("path");
const basename = path.basename(__filename);
require("dotenv").config();

require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.ADMIN_USERNAME,
  process.env.ADMIN_PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    port: 1433,
    dialectOptions: {
      options: {
        encrypt: false,
        //enableArithAbort: false,
      },
    },
  }
);
const db = {};
db.sequelize = sequelize;

module.exports = db;
