const { Router } = require("express");

const { login, generateToken } = require('../controllers/authController')
const {
    getProductos,
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto
} = require('../controllers/productosController');
const {
    getUsuarios,
    getUsuarioById,
    getUsuarioByEmail,
    createUsuario,
    updateUsuario,
    deleteUsuario
} = require('../controllers/usuariosController');
const {
    getProductoFromUsuario,
    updateProductoFromUsuario,
    addProductoToUsuario,
    deleteProductosFromUsuario
} = require('../controllers/usuariosProductosController')
const { tokenValidator, isAdmin } = require('../middleware/authMiddleware');

const router = Router();

router.get('/getToken', generateToken);
router.post('/login', login);

router.get('/usuarios', tokenValidator, getUsuarios);
router.get('/usuario/:id', tokenValidator, getUsuarioById);
router.post('/usuario', tokenValidator, getUsuarioByEmail);
router.post('/createUsuario', createUsuario);
router.put('/updateUsuario', tokenValidator, isAdmin, updateUsuario);
router.delete('/deleteUsuario/:id', tokenValidator, isAdmin, deleteUsuario);

router.get('/productos', tokenValidator, getProductos);
router.get('/producto/:id', tokenValidator, getProducto);
router.post('/createProducto', tokenValidator, isAdmin, createProducto);
router.put('/updateProducto/:id', tokenValidator, isAdmin, updateProducto);
router.delete('/deleteProducto/:id', tokenValidator, isAdmin, deleteProducto);

router.post('/getProductosFromUsuario', tokenValidator, isAdmin, getProductoFromUsuario);
router.put('/updateProductoFromUsuario', tokenValidator, isAdmin, updateProductoFromUsuario);
router.put('/addProductoToUsuario', tokenValidator, isAdmin, addProductoToUsuario);
router.delete('/deleteProductosFromUsuario', tokenValidator, isAdmin, deleteProductosFromUsuario)

module.exports = router;