const { response } = require('express');
const { query, querySingle, execute } = require('../../dal/data-access');

let docentes = null;
let sqlParams = null;

// Obtener todos los docentes
const getDocentes = async(req, res) => {
    try {
        docentes = await query('stp_docentes_getall');
        if (!docentes) {
            res.json({
                status: true,
                message: 'Base de datos vacia, Ingresa algun docentes',
                data: null
            });
        } else {
            res.json({
                status: true,
                message: 'Docentes ingresados',
                data: docentes
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            message: 'No se pueden obtener los docentes, intentelo más tarde',
            data: err
        });
    }
}

// Obtener docente por ID
const getDocentesId = async(req, res) => {
    const idDocente = req.params.id;
    try {
        sqlParams = [{
            'name': 'idDocente',
            'value': idDocente
        }];
        let docentes = await querySingle('stp_docentes_getbyid', sqlParams);
        if (!docentes) {
            res.json({
                status: true,
                message: 'Docente no encontrado, No existe el docente',
                data: docentes
            });
        } else {
            res.json({
                status: true,
                message: 'Docente encontrado',
                data: docentes
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            message: 'Docente no encontrado, intentelo más tarde',
            data: err
        });
    }
}

// Agregar docente
const addDocentes = async(req, res) => {
    const { nombre, edad, titulo, tipo } = req.body;
    try {
        sqlParams = [{
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'edad',
                'value': edad
            },
            {
                'name': 'titulo',
                'value': titulo
            },
            {
                'name': 'tipo',
                'value': tipo
            },
        ];

        let docentes = await query('stp_docentes_add', sqlParams);
        res.json({
            status: true,
            message: 'Docente agregado correctamente',
            data: docentes
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            message: 'Docente agregado incorrectamente',
            data: err
        });
    }
}

// Editar docente
const updateDocentes = async(req, res) => {
    const idDocente = req.params.id;
    const { nombre, edad, titulo, tipo } = req.body;
    try {
        const sqlParams = [{
                'name': 'idDocente',
                'value': idDocente
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
                'name': 'titulo',
                'value': titulo
            },
            {
                'name': 'tipo',
                'value': tipo
            },
        ];

        let docentes = await execute('stp_docentes_update', sqlParams);
        res.json({
            status: true,
            message: 'Docente editado correctamente',
            data: docentes
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            message: 'Docente editado correctamente, intentelo más tarde',
            data: err
        });
    }
}

// Eliminar docente
const deleteDocente = async(req, res) => {
    const idDocente = req.params.id;
    try {
        const sqlParams = [{
            'name': 'idDocente',
            'value': idDocente
        }];
        let docentes = await execute('stp_docentes_delete', sqlParams);
        res.json({
            status: true,
            message: 'Docente eliminado correctamente',
            data: docentes
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            message: 'Docente eliminado incorrectamente, intentelo más tarde',
            data: err
        });
    }
}

module.exports = {
    getDocentes,
    getDocentesId,
    addDocentes,
    updateDocentes,
    deleteDocente,
}