//ruta api/usuarios

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, getUsuario, addUsuario, updateUsuario, deleteUsuario } = require('../bml/controllers/usuarios');
const { validarCampos } = require('../bml/middlewares/validar-campos');
const { validarJWT } = require('../bml/middlewares/validar-jwt');

const router = Router();
//getall
router.get('/',
    validarJWT,
    getUsuarios);

//getbyid
router.get('/:id',
    validarJWT,
    getUsuario);
//add
router.post('/', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos,
    ],
    addUsuario
);
//update
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos,
    ],
    updateUsuario
);
//delete
router.delete('/:id',
    validarJWT,
    deleteUsuario);

module.exports = router;