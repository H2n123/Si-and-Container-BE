// models/index.js

const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: true,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// model-model
db.Container = require("./container.model")(sequelize, Sequelize);
db.Si = require("./si.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
// db.Logbook = require('./logbook.model')(sequelize, Sequelize);

// Definisikan relasi 
db.Si.hasMany(db.Container, { as: "containers", foreignKey: "siId" });
db.Container.belongsTo(db.Si, { as: "Si", foreignKey: "siId" });

// Definisi relasi : database user_roles otomatis terbentuk dengan col. roleId dan userId
db.role.belongsToMany(db.user, { through: "user_roles", foreignKey: "roleId", otherKey: "userId" });
db.user.belongsToMany(db.role, { through: "user_roles", foreignKey: "userId", otherKey: "roleId" });

db.ROLES = ["user","admin","moderator"]; 

module.exports = db;
