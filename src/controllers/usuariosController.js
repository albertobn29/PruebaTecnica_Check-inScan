const { Usuario } = require('../db/models/index')
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
});

function getUsuarios(req, res) {
    try {
        Usuario.findAll({
            attributes: {
                exclude: ["password"],
            }
        }).then(usuarios => {
            logger.info("Se ha obtenido la lista de Usuarios de forma correcta")
            res.status(200).json({ usuarios });
        }).catch(err => {
            logger.error(err)
            res.status(500).json({ msg: err })
        })
    } catch (err) {
        logger.error(err)
        res.status(500).json({ msg: err })
    }

}

function getUsuarioById(req, res) {
    try {
        Usuario.findOne({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ["password"],
            }
        })
            .then(usuario => {
                if (usuario === null) {
                    logger.warn(`Usuario con ID:${req.params.id} buscado no existe`);
                    res.status(400).json({ msg: "Usuario no encontrado" });
                } else {
                    logger.info(`Se ha encontrado el usuario`);
                    res.status(200).json({ usuario, msg: "Usuario encontrado" });
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

function getUsuarioByEmail(req, res) {
    try {
        if (!req.body.email) {
            throw "No se han informado del email del usuario"
        }

        Usuario.findOne({
            where: {
                email: req.body.email
            },
            attributes: {
                exclude: ["password"],
            }
        })
            .then(usuario => {
                if (usuario === null) {
                    logger.warn(`No se ha encontrado el usuario`);
                    res.status(400).json({ msg: `Usuario con email: ${req.body.email} no existe` });
                } else {
                    logger.info(`Se ha encontrado el usuario`);
                    res.status(200).json({ usuario, msg: "Usuario encontrado" });
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

function createUsuario(req, res) {
    try {
        if (!req.body.nombre || !req.body.email || !req.body.password) {
            throw "No se han informado de todos los campos necesarios (nombre, email, contraseña)";
        }

        Usuario.findOrCreate({
            where: {
                email: req.body.email
            },
            defaults: {
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                email: req.body.email,
                password: req.body.password,
                isAdmin: req.body.isAdmin
            }
        }
        ).then(usuario => {
            if (usuario[1]) {
                logger.info(`Usuario nuevo registrado de forma correcta`);
                res.status(200).json({ usuario: usuario[0], msg: "Correo registrado correctamente" })
            } else {
                logger.warn(`El correo a registrar ya existía`);
                res.status(400).json({ msg: `Correo ${usuario[0].email} ya registrado con anterioridad` })
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

function updateUsuario(req, res) {
    try {
        if (!req.body.email) {
            throw "No se han informado del email del usuario a modificar)";
        }
        if (req.body.password) {
            throw "WIP - La contraseña del usuario no es modificable";
        }

        Usuario.update(
            {
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                isAdmin: req.body.isAdmin
            },
            {
                where: {
                    email: req.body.email
                }
            }
        ).then(result => {
            return Usuario.findOne({
                where: {
                    email: req.body.email
                },
                attributes: {
                    exclude: ["password"],
                }
            })
        }).then(usuario => {
            if (usuario == null) {
                logger.warn("El correo a modificar no se ha encontrado")
                res.status(400).json({ msg: `No se ha encontrado ningun usuario con el correo ${req.body.email}` })
            } else {
                logger.info("El usuario ha sido modificado de forma correcta")
                res.status(200).json({ usuario, msg: `Usuario con correo ${req.body.email} modificado correctamente` })
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

function deleteUsuario(req, res) {
    try {
        Usuario.destroy({
            where: {
                id: req.params.id
            }
        }).then(usuario => {
            if (usuario == 1) {
                logger.info("El usuario ha sido eliminado de forma correcta")
                res.status(200).json({ msg: `Usuario con ID ${req.params.id} eliminado` })
            } else {
                logger.warn("El correo a eliminar no se ha encontrado")
                res.status(400).json({ msg: `El usuario con ID ${req.params.id} no se ha encontrado` })
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

module.exports = { getUsuarios, getUsuarioById, getUsuarioByEmail, createUsuario, updateUsuario, deleteUsuario }