// models/container.model.js
const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  const Container = sequelize.define("container", {
     containerNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sealNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // siId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false
    // } // siId --> harus diisi di json Create 
  });

  return Container;
};

