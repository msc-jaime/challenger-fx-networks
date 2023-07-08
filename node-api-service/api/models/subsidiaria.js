//const Sequelize = require('sequelize');
const { DataTypes } = require("sequelize")
const db = require('../util/database');

const Subsidiaria = db.define('subsidiaria', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  razonSocial: DataTypes.STRING,
  telefono: DataTypes.STRING,
  email: DataTypes.STRING
});

Subsidiaria.associate = models => {
  Subsidiaria.hasMany(models.Empleado, { as: "empleado"});
}

module.exports = Subsidiaria;