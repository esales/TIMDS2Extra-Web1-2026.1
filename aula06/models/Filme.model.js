const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Filme = sequelize.define(
    'Filme',
    {
        titulo: DataTypes.STRING,
        sinopse: DataTypes.TEXT,
    },
    {
        tableName: 'exemplo_filmes',
        timestamps: true,
    }
)

module.exports = Filme;