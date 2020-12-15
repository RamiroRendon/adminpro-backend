const { response } = require('express');
const { query, querySingle, execute } = require('../../dal/data-access');

let materias = null;
let sqlParams = null;

// Obtener todas las materias
const getMaterias = async(req, res) => {
    try {
        materias = await query('stp_materias_getall');
        if (!materias) {
            res.json({
                status: true,
                message: 'Base de datos vacia, Ingrece materias',
                data: null
            });
        } else {
            res.json({
                status: true,
                message: 'Materias',
                data: materias
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            message: 'No se pueden obtener las materias, intentelo más tarde',
            data: err
        });
    }
}

// Obtener materias por ID
const getMateriasId = async(req, res) => {
    const idMateria = req.params.id;
    try {
        const sqlParams = [{
            'name': 'idMateria',
            'value': idMateria
        }];
        let materias = await querySingle('stp_materias_getbyid', sqlParams);
        if (!materias) {
            res.json({
                status: true,
                message: 'No se encuentra la materia',
                data: materias
            });
        } else {
            res.json({
                status: true,
                message: 'Materia encontrada',
                data: materias
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            message: 'Materia no encontrada, intentelo más tarde',
            data: err
        });
    }
}

// Agregar materia
const addMaterias = async(req, res) => {
    const { nombre, horas, horasp, horast, creditos } = req.body;
    try {
        const sqlParams = [{
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'horas',
                'value': horas
            },
            {
                'name': 'horasp',
                'value': horasp
            },
            {
                'name': 'horast',
                'value': horast
            },
            {
                'name': 'creditos',
                'value': creditos
            },
        ];
        let materias = await query('stp_materias_add', sqlParams);
        res.json({
            status: true,
            message: 'Materia agregada correctamente',
            data: { materias }
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            message: 'Materia agregada incorrectamente, llene todos los datos',
            data: err
        });
    }
}

// Editar Materia
const updateMaterias = async(req, res) => {
    const idMateria = req.params.id;
    const { nombre, horas, horasp, horast, creditos } = req.body;
    try {
        const sqlParams = [{
                'name': 'idMateria',
                'value': idMateria
            },
            {
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'horas',
                'value': horas
            },
            {
                'name': 'horasp',
                'value': horasp
            },
            {
                'name': 'horast',
                'value': horast
            },
            {
                'name': 'creditos',
                'value': creditos
            },
        ];
        let materias = await execute('stp_materias_update', sqlParams);
        res.json({
            status: true,
            message: 'Materia editada correctamente',
            data: materias
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            message: 'La materia no pudo ser editada',
            data: err
        });
    }
}

// Eliminar Materia
const deleteMateria = async(req, res) => {
    const idMateria = req.params.id;
    try {
        sqlParams = [{
            'name': 'idMateria',
            'value': idMateria
        }];
        let materias = await execute('stp_materias_delete', sqlParams);
        res.json({
            status: true,
            message: 'Materia eliminada correctamente',
            data: materias
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            message: 'Materia eliminada incorrectamente',
            data: err
        });
    }
}

module.exports = {
    getMaterias,
    getMateriasId,
    addMaterias,
    updateMaterias,
    deleteMateria,
}