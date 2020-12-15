const { response } = require('express');
const { query, querySingle, execute } = require('../../dal/data-access');

let alumnos = null;
let sqlParams = null;

//Obtener Todos los Alumnos 
const getAlumnos = async(req, res) => {
    try {
        alumnos = await query('stp_alumnos_getall');
        if (!alumnos) {
            res.json({
                status: true,
                message: ' Base de datos vacia, Ingresar alumnos al registro',
                data: null
            });
        } else {
            res.json({
                status: true,
                message: 'Alumnos agregados',
                data: alumnos
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            message: 'No se encuentran los alumnos',
            data: err
        });
    }
}

// Obtener alumno por ID
const getAlumnoId = async(req, res) => {
    const idAlumno = req.params.id;
    try {
        sqlParams = [{
            'name': 'idAlumno',
            'value': idAlumno
        }];
        let alumnos = await querySingle('stp_alumnos_getbyid', sqlParams);
        if (!alumnos) {
            res.json({
                status: true,
                message: 'No se encuentra el alumno, registrelo',
                data: alumnos
            });
        } else {
            res.json({
                status: true,
                message: 'Alumno encontrado',
                data: alumnos
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            message: 'Alumno no encontrado, intentelo mas tarde',
            data: err
        });
    }
}

// Agregar alumno
const addAlumno = async(req, res) => {
    const { nombre, edad, sexo, semestre, carrera } = req.body;
    try {
        const sqlParams = [{
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'edad',
                'value': edad
            },
            {
                'name': 'sexo',
                'value': sexo
            },
            {
                'name': 'semestre',
                'value': semestre
            },
            {
                'name': 'carrera',
                'value': carrera
            },
        ];
        let alumnos = await query('stp_alumnos_add', sqlParams);
        res.json({
            status: true,
            message: 'Alumno agregado correctamente',
            data: alumnos
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            message: 'Alumno agregado incorrectamente, intentelo mas tarde',
            data: err
        });
    }
}

// Editar Alumno
const updateAlumno = async(req, res) => {
    const idAlumno = req.params.id;
    const { nombre, edad, sexo, semestre, carrera } = req.body;
    try {
        const sqlParams = [{
                'name': 'idAlumno',
                'value': idAlumno
            },
            {
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'edad',
                'value': edad
            },
            {
                'name': 'sexo',
                'value': sexo
            },
            {
                'name': 'semestre',
                'value': semestre
            },
            {
                'name': 'carrera',
                'value': carrera
            }
        ];
        let alumnos = await execute('stp_alumnos_update', sqlParams);
        res.json({
            status: true,
            message: 'Alumno editado correctamente',
            data: alumnos
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            message: 'Alumno editado incorrectamente, intentelo mas tarde',
            data: err
        });
    }
}

// Eliminar Alumno
const deleteAlumno = async(req, res) => {
    const idAlumno = req.params.id;
    try {
        sqlParams = [{
            'name': 'idAlumno',
            'value': idAlumno
        }];
        let alumnos = await execute('stp_alumnos_delete', sqlParams);
        res.json({
            status: true,
            message: 'Alumno eliminado',
            data: alumnos
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            message: 'Alumno no eliminado, intentelo mas tarde',
            data: err
        });
    }
}

module.exports = {
    getAlumnos,
    getAlumnoId,
    addAlumno,
    updateAlumno,
    deleteAlumno,
}