//Ruta api/docentes
const { Router } = require('express');
const { check } = require('express-validator')
const { getDocentes, getDocentesId, addDocentes, updateDocentes, deleteDocente, } = require('../bml/controllers/docentes');

const router = Router();

// Obtener todos los docentes
router.get('/', getDocentes);
// Obtener docente por ID
router.get('/id/:id', getDocentesId);
// Agregar docente
router.post('/', [
        check('nombre', 'Nombre es requerido').not().isEmpty(),
        check('edad', 'edad es requerido').not().isEmpty(),
        check('titulo', 'sexo es requerido').not().isEmpty(),
        check('tipo', 'semestre es requerido').not().isEmpty(),
    ],
    addDocentes
);
// Editar docente
router.put('/:id', [
        check('nombre', 'Nombre es requerido').not().isEmpty(),
        check('edad', 'edad es requerido').not().isEmpty(),
        check('titulo', 'sexo es requerido').not().isEmpty(),
        check('tipo', 'semestre es requerido').not().isEmpty(),
    ],
    updateDocentes
);
// Eliminar docente
router.delete('/:id', deleteDocente);

module.exports = router;