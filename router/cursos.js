/*
Cursos
ruta: '/api/cursos'
*/

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const { validarJWT } = require ('../middleware/validar-jwt');

const {
    getCursos,
    crearCursos,
    actualizarCursos,
    borrarCursos
} = require ('../controllers/cursos')

const router = Router();

router.get( '/',validarJWT ,getCursos);


router.post( '/', [
    validarJWT,
    check('nombre', 'El nombre del curso es necesario').not().isEmpty(),
    validarCampos
] 
,crearCursos);

router.put( '/:id',
[
    validarJWT,
    check('nombre', 'El nombre del curso es necesario').not().isEmpty(),
]
,actualizarCursos);

router.delete( '/:id',
[
    validarJWT
],
borrarCursos);




module.exports = router;