//Ruta api/materias
const { Router } = require('express');
const { check } = require('express-validator')
const { getMaterias, getMateriasId, addMaterias, updateMaterias, deleteMateria, } = require('../bml/controllers/materias');

const router = Router();

// Obtener todas las materias
router.get('/', getMaterias);

// Obtener materias por ID
router.get('/id/:id', getMateriasId);

// Agregar materia
router.post('/', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('horas', 'Las horas son requeridas').not().isEmpty(),
        check('horasp', 'Las horasp son requeridas').not().isEmpty(),
        check('horast', 'horast es requerido').not().isEmpty(),
        check('creditos', 'creditos es requerido').not().isEmpty(),
    ],
    addMaterias
);

// Editar Materia
router.put('/:id', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('horas', 'Las horas son requeridas').not().isEmpty(),
        check('horasp', 'Las horasp son requeridas').not().isEmpty(),
        check('horast', 'horast es requerido').not().isEmpty(),
        check('creditos', 'creditos es requerido').not().isEmpty(),
    ],
    updateMaterias
);

// Eliminar Materia
router.delete('/:id', deleteMateria);

module.exports = router;