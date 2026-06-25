const { DataTypes } = require('sequelize');
const Sequelize = require('../config/bd')

const Estudante = Sequelize.define(
    'Estudante',
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idade: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'estudantes',
        timestamps: true
    }
)

module.exports = Estudante;