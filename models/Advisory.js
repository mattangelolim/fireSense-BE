const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Advisory = sequelize.define("Advisory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  announcement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  alert: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Advisory;
