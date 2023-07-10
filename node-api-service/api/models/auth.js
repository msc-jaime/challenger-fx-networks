const Sequelize = require('sequelize');
const db = require('../util/database');

const Auth = db.define('auth', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING
});

module.exports = Auth;