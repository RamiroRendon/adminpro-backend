const { response, json } = require('express');
const bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const { querySingle } = require('../../dal/data-access');

const login = async(req, res = response) => {
    const { email, password } = req.body;
    let usuario = null;
    const sqlParams = [{
        'name': 'email',
        'value': email
    }, ];

    usuario = await querySingle('stp_usuarios_login', sqlParams);

    if (!usuario) {
        res.json({
            status: false,
            message: 'Email no encontrado',
            data: null
        });
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
        return res.json({
            status: false,
            message: 'Contraseña incorrecta',
            data: null
        });
    }

    const token = await generateJWT(usuario.idUsuario);

    res.json({
        status: true,
        message: 'Acceso correcto',
        data: token
    });
}

const googleSingIn = async(req, res = response) => {
    const googleToken = req.body.token;
    let usuario = null;
    let sqlParams = null;

    try {
        const { name, email, picture } = await googleVerify(googleToken);
        sqlParams = [{
            'name': 'email',
            'value': email
        }];

        usuario = await querySingle('stp_usuarios_login', sqlParams);

        //verificar si existe en BD
        if (!usuario) {
            //crear usuario
            sqlParams = [{
                    'name': 'nombre',
                    'value': name
                },
                {
                    'name': 'email',
                    'value': email
                },
                {
                    'name': 'google',
                    'value': 1
                },
                {
                    'name': 'imagen',
                    'value': picture
                },
                {
                    'name': 'password',
                    'value': ''
                },
                {
                    'name': 'local',
                    'value': 0
                }
            ];
            usuario = await querySingle('stp_usuarios_add', sqlParams);
        } else {
            //actualizar usuario
            sqlParams = [{
                    'name': 'idUsuario',
                    'value': usuario.idUsuario
                },
                {
                    'name': 'nombre',
                    'value': usuario.nombre,

                },
                {
                    'name': 'email',
                    'value': usuario.email
                },
                {
                    'name': 'password',
                    'value': usuario.password
                },
                {
                    'name': 'imagen',
                    'value': usuario.imagen
                },
            ];
            console.log(sqlParams);
            usuario = await querySingle('stp_usuarios_update', sqlParams);
            console.log(usuario);
        }
        const token = await generateJWT(usuario.idUsuario);

        res.json({
            status: true,
            message: 'Acceso correcto',
            data: token
        });

    } catch (error) {
        res.json({
            status: false,
            error: 'Ocurrio un error',
            data: error
        });
    }
}

const loginToken = async(req, res = response) => {
    const { email, token } = req.body;
    const sqlParams = [{
        name: 'email',
        value: email,
    }, ];
    const usuario = await querySingle('stp_usuarios_login', sqlParams);
    const tokenNew = await generateJWT(usuario.idUsuario);
    res.json({
        status: true,
        message: 'Acceso correcto',
        data: tokenNew,
    });
};

module.exports = {
    login,
    googleSingIn,
    loginToken,
}