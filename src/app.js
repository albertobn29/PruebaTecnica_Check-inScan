require("dotenv").config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json')
const { conectarDB } = require('./db/models/index');
const routes = require('./routes/routes');

const PORT = process.env.NODE_PORT || 3500;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('**', (req, res) => {
    res.status(404).send({ msg: "Ruta no encontrada" })
});

app.listen(PORT, function () {
    console.log(`App listening on http://localhost:${PORT}`);

    conectarDB(5);

});