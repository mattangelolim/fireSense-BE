// models/User.js
const { DataTypes, Op } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  district: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  area:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "notActive", // Set the default value
  },
  user_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = { User, Op };
