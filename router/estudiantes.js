/*
Academias
ruta: '/api/academias'
*/

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const { validarJWT } = require ('../middleware/validar-jwt');

const {
    getEstudiantes,
    crearEstudiantes,
    actualizarEstudiantes,
    borrarEstudiantes
} = require ('../controllers/estudiantes')

const router = Router();

router.get( '/',validarJWT ,getEstudiantes);


router.post( '/', [
    validarJWT,
    check('nombre', 'El nombre del estudiante es necesario').not().isEmpty(),
    validarCampos
] 
,crearEstudiantes);

router.put( '/:id',
[
    validarJWT,
    check('nombre', 'El nombre del estudiante es necesario').not().isEmpty(),
]
,actualizarEstudiantes);

router.delete( '/:id',
[
    validarJWT
],
borrarEstudiantes);




module.exports = router;