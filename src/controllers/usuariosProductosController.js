const { Usuario_Producto, Producto } = require('../db/models/index');

const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
});

function getProductoFromUsuario(req, res) {
    try {
        if (!req.body.usuarioId) {
            throw "No se han informado del ID del usuario"
        }

        Usuario_Producto.findAll({
            where: {
                usuarioId: req.body.usuarioId
            },
            include: Producto
        }).then(result => {
            logger.info("Productos de un usuario obtenidos de forma correcta")
            res.status(200).json({ result })
        }).catch(err => {
            logger.error(err)
            res.status(500).json({ msg: err })
        })
    } catch (err) {
        logger.error(err)
        res.status(500).json({ msg: err })
    }
}

function updateProductoFromUsuario(req, res) {
    try {
        if (!req.body.usuarioId || !req.body.productoId || !req.body.cantidad) {
            throw "No se han informado de todos los campos necesarios"
        }

        Usuario_Producto.update(
            { cantidad: req.body.cantidad },
            {
                where: {
                    usuarioId: req.body.usuarioId,
                    productoId: req.body.productoId,
                }
            }
        ).then(result => {
            return Usuario_Producto.findAll({
                where: {
                    usuarioId: req.body.usuarioId,
                    productoId: req.body.productoId,
                },
                include: Producto
            })
        }).then(usuario_producto => {
            logger.info("Actualizacion de un producto de un usuario realizado de forma correcta")
            res.status(200).json({ usuario_producto })
        }).catch(err => {
            logger.error(err)
            if (err.name == "SequelizeForeignKeyConstraintError") {
                res.status(400).json({ msg: "El Producto o Usuario con ese ID no existe" })
            } else {
                res.status(500).json({ msg: err })
            }
        })
    } catch (err) {
        logger.error(err)
        res.status(500).json({ msg: err })
    }
}

function addProductoToUsuario(req, res) {
    try {
        if (!req.body.usuarioId || !req.body.productoId || !req.body.cantidad) {
            throw "No se han informado de todos los campos necesarios"
        }

        Usuario_Producto.findAll({
            where: {
                usuarioId: req.body.usuarioId,
                productoId: req.body.productoId,
            }
        }).then(result => {
            if (result.length > 0) {
                req.body.cantidad += result[0].dataValues.cantidad;
                module.exports.updateProductoFromUsuario(req, res);
            } else {
                Usuario_Producto.create({
                    usuarioId: req.body.usuarioId,
                    productoId: req.body.productoId,
                    cantidad: req.body.cantidad
                }).then(usuario_producto => {
                    logger.info("Actualizacion de un producto de un usuario realizado de forma correcta")
                    res.status(200).json({ usuario_producto })
                }).catch(err => {
                    logger.error(err)
                    if (err.name == "SequelizeForeignKeyConstraintError") {
                        res.status(400).json({ msg: "El Producto o Usuario con ese ID no existe" })
                    } else {
                        res.status(500).json({ msg: err })
                    }
                })
            }
        }).catch(err => {
            logger.error(err)
            res.status(500).json({ msg: err })
        })
    } catch (err) {
        logger.error(err)
        res.status(500).json({ msg: err })
    }
}

function deleteProductosFromUsuario(req, res) {
    try {
        if (!req.body.usuarioId) {
            throw "No se han informado del ID del usuario"
        }

        Usuario_Producto.destroy({
            where: {
                usuarioId: req.body.usuarioId
            }
        }).then(usuario_producto => {
            logger.info("Borrado de los productos de un usuario realizado de forma correcta")
            if (usuario_producto > 0) {
                res.status(200).json({ msg: `Se han eliminado todos los productos del usuario ${req.body.usuarioId}` })
            } else {
                res.status(200).json({ msg: `El usuario ${req.body.usuarioId} no tenía productos asignados` })
            }
        }).catch(err => {
            logger.error(err)
            res.status(500).json({ msg: err })
        })
    } catch (err) {
        logger.error(err)
        res.status(500).json({ msg: err })
    }
}

module.exports = { getProductoFromUsuario, updateProductoFromUsuario, addProductoToUsuario, deleteProductosFromUsuario }