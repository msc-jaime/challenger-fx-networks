const Sequelize = require('sequelize');
const db = require('../util/database');

const Subsidiaria = db.define('subsidiaria', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    razonSocial: Sequelize.STRING,
    direccion : Sequelize.STRING,
    telefono : Sequelize.STRING,
    email : Sequelize.STRING
});

module.exports = Subsidiaria;