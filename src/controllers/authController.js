const jwt = require("jsonwebtoken");

function generateToken(req, res) {
    try {
        const token = jwt.sign(
            { msg: "token de autenticacion" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" })

        res.json({ token })
    } catch (err) {
        res.status(500).json({ msg: "ha petao" })
    }
}

module.exports = { generateToken }