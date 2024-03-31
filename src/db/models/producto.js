'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Producto extends Model {
        static associate(models) {
            this.hasMany(models.Usuario_Producto, { foreignKey: 'productoId' });
        }
    }
    Producto.init({
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0
        },
    }, {
        sequelize,
        modelName: 'Producto',
    });
    return Producto;
};