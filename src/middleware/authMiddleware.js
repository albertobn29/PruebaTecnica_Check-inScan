const jwt = require("jsonwebtoken");

function tokenValidator(req, res, next) {
    var token = req.headers.token;
    if (!token) {
        res.status(401).json({ mgs: "TOKEN NO ENCONTRADO" })
    }

    try {
        if (jwt.verify(token, process.env.JWT_SECRET)) {
            req.autorizado = true;
        } else {
            res.status(401).json({ mgs: "TOKEN NO AUTORIZADO" })
        }
        next();

    } catch (err) {
        res.status(401).json({ msg: "TOKEN NO VALIDO" })
    }
}

function isAdmin (req, res, next) { 
    var token = req.headers.token;
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if(!user.isAdmin){
            res.status(403).json({ mgs: `El usuario: ${user.email} NO es Administrador` })
        }
        next();
    } catch (err){
        res.status(401).json({ msg: "TOKEN NO VALIDO" })
    }
 }

module.exports = { tokenValidator, isAdmin }