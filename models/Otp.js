// models/Otp.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Otp = sequelize.define("Otp", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Otp;
