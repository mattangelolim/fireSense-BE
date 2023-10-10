const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Live = sequelize.define(
  "Live",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    startLive: {
      type: DataTypes.TIME, // Set data type to TIME
      allowNull: true,
    },
    endLive: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    tableName: "Lives",
  }
);

// Live.sync();

module.exports = Live;
