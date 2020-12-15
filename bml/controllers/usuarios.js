const bcrypt = require('bcryptjs');
const { query, querySingle, execute } = require('../../dal/data-access');

const getUsuarios = async(req, res) => {
    const usuarios = await query('stp_usuarios_getall');
    res.json({
        status: true,
        message: 'Listado de usuarios',
        data: usuarios
    });
}

const getUsuario = async(req, res) => {
    const idUsuario = req.params.id;
    const sqlParams = [{
        'name': 'idUsuario',
        'value': idUsuario
    }];
    const usuario = await querySingle('stp_usuarios_getbyid', sqlParams);
    res.json({
        status: false,
        message: `Usuario ${idUsuario}`,
        data: usuario
    });
}

const addUsuario = async(req, res) => {
    const { nombre, email, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const newPassword = bcrypt.hashSync(password, salt);
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'email',
            'value': email
        },
        {
            'name': 'password',
            'value': newPassword
        },
        {
            'name': 'google',
            'value': 0
        },
        {
            'name': 'local',
            'value': 1
        },
        {
            'name': 'imagen',
            'value': null
        },
    ];
    const usuario = await querySingle('stp_usuarios_add', sqlParams);
    if (usuario) {
        res.json({
            status: true,
            message: 'Registro Exitoso',
            data: usuario
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error',
            data: null
        });
    }
    if (resp > 0) {
        res.json({
            status: false,
            message: 'Usuario agregado correctamente',
            data: `Registros afectados ${resp}`
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al agregar el usuario',
            data: `Registros afectados ${resp}`
        });
    }
}

const updateUsuario = async(req, res = response) => {
    const idUsuario = req.params.id;
    const { nombre, email, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const newPassword = bcrypt.hashSync(password, salt);
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre,

        },
        {
            'name': 'email',
            'value': email
        },
        {
            'name': 'password',
            'value': newPassword
        },
        {
            'name': 'imagen',
            'value': ''
        },
    ];
    const resp = await execute('stp_usuarios_update', sqlParams);
    if (resp > 0) {
        res.json({
            status: false,
            message: 'Usuario actualizado correctamente',
            data: `Registros afectados ${resp}`
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al actualizar el usuario',
            data: `Registros afectados ${resp}`
        });
    }
}

const deleteUsuario = async(req, res) => {
    const idUsuario = req.params.id;
    const sqlParams = [{
        'name': 'idUsuario',
        'value': idUsuario
    }];
    const usuario = await querySingle('stp_usuarios_delete', sqlParams);
    res.json({
        status: false,
        message: `Usuario ${idUsuario}`,
        data: usuario
    });
}

module.exports = {
    getUsuarios,
    getUsuario,
    addUsuario,
    updateUsuario,
    deleteUsuario
}