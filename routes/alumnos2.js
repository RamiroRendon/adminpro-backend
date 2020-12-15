//Ruta api/alumnos
const { Router } = require('express');
const { check } = require('express-validator')
const { getAlumnos, getAlumnoId, addAlumno, updateAlumno, deleteAlumno, } = require('../bml/controllers/alumnos');

const router = Router();

// Obtener todos los alumnos
router.get('/', getAlumnos);

// Obtener alumno por ID
router.get('/id/:id', getAlumnoId);

// Agregar alumno
router.post('/', [
        check('nombre', 'Nombre es requerido').not().isEmpty(),
        check('edad', 'edad es requerido').not().isEmpty(),
        check('sexo', 'sexo es requerido').not().isEmpty(),
        check('semestre', 'semestre es requerido').not().isEmpty(),
        check('carrera', 'carrera es requerido').not().isEmpty(),
    ],
    addAlumno
);

// Editar Alumno
router.put('/:id', [
        check('nombre', 'Nombre es requerido').not().isEmpty(),
        check('edad', 'edad es requerido').not().isEmpty(),
        check('sexo', 'sexo es requerido').not().isEmpty(),
        check('semestre', 'semestre es requerido').not().isEmpty(),
        check('carrera', 'carrera es requerido').not().isEmpty(),
    ],
    updateAlumno
);

// Eliminar Alumno
router.delete('/:id', deleteAlumno);

module.exports = router;