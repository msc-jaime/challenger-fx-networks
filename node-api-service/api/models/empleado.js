const Sequelize = require('sequelize');
const db = require('../util/database');

const Empleado = db.define('empleado', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nombre: Sequelize.STRING,
    cedula: Sequelize.STRING,
    fechaContratacion: Sequelize.DATEONLY,
    puesto: Sequelize.STRING,
    oficina: Sequelize.STRING,
});

module.exports = Empleado;