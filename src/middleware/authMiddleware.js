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
            // return;
        }
        next();

    } catch (err) {
        res.status(401).json({ msg: "TOKEN NO VALIDO" })
    }
}

module.exports = { tokenValidator }