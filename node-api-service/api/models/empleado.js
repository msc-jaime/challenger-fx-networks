//const Sequelize = require('sequelize');
const { DataTypes } = require("sequelize")
const db = require('../util/database');
//const Subsidiaria = require("./subsidiaria");

const Empleado = db.define('empleado', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nombre: DataTypes.STRING,
  cedula: DataTypes.STRING,
  fechaContratacion: DataTypes.DATEONLY,
  puesto: DataTypes.STRING,
  oficina: DataTypes.STRING,
  subsidiariaId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references:     {
      model: 'subsidiaria',
      key: 'id'
    },
    onDelete:       'cascade'
  }
});

Empleado.associate = (models) => {
  Empleado.belongsTo(models.Subsidiaria, {
    foreignKey: "subsidiariaId",
    as: "subsidiaria"
  });
}

module.exports = Empleado;