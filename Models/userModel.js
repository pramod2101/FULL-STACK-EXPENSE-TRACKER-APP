const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Users = sequelize.define('expense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    expenseAmount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    chooseDescreption: {
        type: Sequelize.STRING,
        allowNull: false
    },
    chooseCategory: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Users;
