'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Usuario extends Model {
        static associate(models) {
            this.hasMany(models.Usuario_Producto, { foreignKey: 'usuarioId' });
        }
    }
    Usuario.init({
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0
        },
    }, {
        sequelize,
        modelName: 'Usuario',
    });
    return Usuario;
};