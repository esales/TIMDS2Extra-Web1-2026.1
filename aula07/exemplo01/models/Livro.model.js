const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Livro = sequelize.define(
    'Livro',
    {
        titulo: DataTypes.STRING,
        autor: DataTypes.STRING,
        ano: DataTypes.INTEGER,
    },
    {
        tableName: 'livros', 
        timestamps: true
    }
);

module.exports = Livro;