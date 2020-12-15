require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: true
}));
app.use(express.json());

//Directorio publico
app.use(express.static('public'));

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/docentes', require('./routes/docentes'));
app.use('/api/alumnos', require('./routes/alumnos'));
app.use('/api/materias', require('./routes/materias'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT);