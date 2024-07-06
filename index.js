require('dotenv').config();

const express = require('express');
const cors = require('cors');
const {dbConnection} = require ('./database/config');


// Crear el servidor express
const app = express();

// Configurar Cors
app.use(cors());

// Carpeta Pública
app.use(express.static('public'));

// Lectura y Parseo del body
app.use(express.json() );


// Base de datos
dbConnection();

// Rutas

app.use('/api/usuarios', require('./router/usuarios'));
app.use('/api/academias', require('./router/academias'));
app.use('/api/profesores', require('./router/profesores'));
app.use('/api/estudiantes', require('./router/estudiantes'));
app.use('/api/cursos', require('./router/cursos'));
app.use('/api/materias', require('./router/materias'));
app.use('/api/programas', require('./router/programas'));
app.use('/api/periodos', require('./router/periodos'));
app.use('/api/notas', require('./router/notas'));
app.use('/api/todo', require('./router/busquedas'));
app.use('/api/todo/coleccion', require('./router/busquedas'));
app.use('/api/login', require('./router/auth'));
app.use('/api/uploads', require('./router/uploads'));
app.use('/api/pagos', require('./router/pagos'));


    
app.listen(process.env.PORT ?? 3000, ()=>{
    console.log('Servidor corriendo en puerto '+ process.env.PORT )
});