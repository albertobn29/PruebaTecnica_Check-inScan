const { Router } = require("express");

const { generateToken } = require('../controllers/authController')
const {
    getProductos,
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto
} = require('../controllers/productosController');
const { tokenValidator } = require('../middleware/authMiddleware');

const router = Router();

router.get('/getToken', generateToken);

router.get('/productos', tokenValidator, getProductos);
router.get('/producto/:id', tokenValidator, getProducto);
router.post('/createProducto', tokenValidator, createProducto);
router.put('/updateProducto/:id', tokenValidator, updateProducto);
router.delete('/deleteProducto/:id', tokenValidator, deleteProducto);

module.exports = router;