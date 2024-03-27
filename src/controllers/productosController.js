const { Producto } = require('../db/models/index');

const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
});

function getProductos(req, res) {
    try {
        Producto.findAll().then(productos => {
            res.json({ productos });
        }).catch(err => {
            res.json(err);
        });
    } catch (err) {
        logger.error(err)
        res.status(500).json(err)
    }
}

function getProducto(req, res) {
    try {
        Producto.findOne({
            where: {
                id: req.params.id
            }
        }).then(producto => {
            if (producto === null) {
                logger.warn(`Producto con buscado no existe`);
                res.json({ producto, msg: "Producto no encontrado" });
            } else {
                logger.info(`Se ha encontrado el producto`);
                res.json({ producto, msg: "Producto encontrado" });
            }
        }).catch(err => {
            logger.error(err)
            res.status(500).json(err);
        });
    } catch (err) {
        logger.error(err)
        res.status(500).json(err)
    }
}

function createProducto(req, res) {
    if (!req.body.titulo) {
        logger.warn("No se ha informado del Título para crear un producto")
        res.status(400).json({ msg: "No se ha informado del titulo del producto" })
    }
    try {
        Producto.findOrCreate({
            where: {
                titulo: req.body.titulo
            },
            defaults: {
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                estado: req.body.estado
            }
        }).then(producto => {
            if (producto[1]) {
                logger.info("Se ha creado un producto")
                res.status(201).json({ producto: producto[0], msg: 'Creado correctamente' })
            } else {
                logger.info("Se ha intentado crear un producto que ya existía con el mismo nombre")
                res.json({ producto: producto[0], msg: `El producto:${producto[0].titulo} ya existía` })
            }
        }).catch(err => {
            logger.error(err)
            res.status(500).json({ err })
        })
    } catch (err) {
        logger.error(err)
        res.status(500).json(err)
    }
}

function updateProducto(req, res) {
    try {
        Producto.update(
            {
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                estado: req.body.estado
            },
            {
                where: {
                    id: req.params.id
                }
            }
        ).then(result => {
            return Producto.findOne({
                where: {
                    id: req.params.id
                }
            })
        }).then(producto => {
            if (!producto) {
                logger.warn("No se encontró el producto a modificar")
                res.status(400).json({ msg: "No se ha encontrado producto con ese ID" });
            } else {
                logger.info("Se ha modificado un producto")
                res.json({ producto, msg: `Producto: ${producto.titulo} modificado correctamente` })
            }
        }).catch(err => {
            logger.error(err)
            res.status(500).json({ err })
        })
    } catch (err) {
        logger.error(err)
        res.status(500).json(err)
    }
}

function deleteProducto(req, res) {
    try {
        Producto.destroy({
            where: {
                id: req.params.id
            }
        }).then(producto => {
            if (producto > 0) {
                res.json({ msg: `El producto ha sido eliminado` })
                logger.info("Se elimió un producto")
            } else {
                res.json({ msg: `El producto con ID:${req.params.id} no se ha encontrado` })
                logger.warn("No se encontró el producto a eliminar")
            }
        }).catch(err => {
            logger.error(err)
            res.status(500).json(err)
        })
    } catch (err) {
        logger.error(err)
        res.status(500).json(err)
    }
}

module.exports = { getProductos, getProducto, createProducto, updateProducto, deleteProducto }