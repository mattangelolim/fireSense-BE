// config/database.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("firesense", "admin", "9%D29!F!A4Ui", {
  host: "bingorepublic-rds.cpgb7oxrrgkv.ap-southeast-1.rds.amazonaws.com",
  dialect: "mysql",
});

module.exports = sequelize;
