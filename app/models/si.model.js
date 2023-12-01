// models/si.model.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Si = sequelize.define("si", {
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   // autoIncrement: true,
    // },
    siNo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isSiNoValid(value) {
          // Validasi format "0000"
          if (!/^\d{4}$/.test(value)) {
            throw new Error("siNo must be in the format '0000'.");
          }
        },
        isSiNoInRange(value) {
          // Validasi range "0001" sampai "9999"
          const siNoInt = parseInt(value, 10);
          if (siNoInt < 1 || siNoInt > 9999) {
            throw new Error("siNo must be in the range of '0001' to '9999'.");
          }
        },
      },
    },
    siDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: new Date().toDateString(), // Mencegah tanggal yang lebih kecil dari hari ini
      },
    },
    siBatch: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["1", "2"]], // Hanya bisa bernilai "1" atau "2" siBatch ini adalah Rate pada Si
      },
    },
    
    numContainer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumContainerInRange(value) {
          // Validasi range 1 sampai 20
          const numContainerInt = parseInt(value, 10);
          if (!(numContainerInt >= 1 && numContainerInt <= 20)) {
            throw new Error("numContainer must be in the range of 1 to 20.");
          }
        },
      },
    },
    
    siDestination: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Nagoya", "Hakata", "Sendai"]], // Hanya bisa bernilai "Nagoya", "Hakata", atau "Sendai"
      },
    },
  });

  return Si;
};
