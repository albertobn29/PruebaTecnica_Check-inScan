'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Producto extends Model {
        static associate(models) { }
    }
    Producto.init({
        titulo: DataTypes.STRING,
        descripcion: DataTypes.STRING,
        estado: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Producto',
    });
    return Producto;
};