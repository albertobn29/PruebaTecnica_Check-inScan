'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Usuario_Producto extends Model {
        static associate(models) {
            this.belongsTo(models.Usuario);
            this.belongsTo(models.Producto);
        }
    }
    Usuario_Producto.init({
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
    }, {
        sequelize,
        modelName: 'Usuario_Producto',
    });
    return Usuario_Producto;
};