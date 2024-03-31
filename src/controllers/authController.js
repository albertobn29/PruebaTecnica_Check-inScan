const jwt = require("jsonwebtoken");
const winston = require('winston');

const { Usuario } = require('../db/models/index')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
});

function generateToken(req, res) {
    try {
        const token = jwt.sign(
            { msg: "token de autenticacion" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" })

        res.status(200).json({ token })
    } catch (err) {
        logger.error(err)
        res.status(500).json({ msg: err })
    }
}

function login(req, res) {
    try {
        if (!req.body.email || !req.body.password) {
            throw "No se han informado de todos los campos necesarios (email, contraseña)";
        }

        Usuario.findOne({
            where: {
                email: req.body.email,
            }
        }).then(async (usuario) => {
            if (usuario == null) {
                res.status(400).json({ msg: "Usuario no encontrado" })
            }

            if (req.body.password == usuario.dataValues.password) {
                const token = jwt.sign(
                    {
                        id: usuario.dataValues.id,
                        email: usuario.dataValues.email,
                        isAdmin: usuario.dataValues.isAdmin
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1d",
                    }
                )
                res.status(200).json({ usuario, token });
            } else {
                res.status(400).json({ usuario, msg: "CONTRASEÑA INCORRECTA" })
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

module.exports = { generateToken, login }