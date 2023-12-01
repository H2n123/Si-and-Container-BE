// models/logbook.model.js
const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

const Logbook = sequelize.define('Logbook', {
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  siId: {
    type: DataTypes.INTEGER,
  },
  containerId: {
    type: DataTypes.INTEGER,
  },
   
});

module.exports = Logbook;
