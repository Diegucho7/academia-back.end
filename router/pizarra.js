/*
Pizarra
ruta: '/api/pizarra'
*/

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const { validarJWT } = require ('../middleware/validar-jwt');

const {
    // getPizarra,
    crearPizarra,
    // actualizarPizarra,
    // borrarPizarra
} = require ('../controllers/pizarra')

const router = Router();

// router.get( '/',validarJWT ,getPizarra);


router.post( '/', [
    // validarJWT,
    check('periodo', 'El periodo es necesario').not().isEmpty(),
    check('asunto', 'El asunto es necesario').not().isEmpty(),
    check('tarea', 'La tarea es necesaria').not().isEmpty(),
    validarCampos
] 
,crearPizarra);

// router.put( '/:id',
// [
//     validarJWT,
//     check('nombre', 'La tarea es necesaria').not().isEmpty(),
// ]
// ,actualizarPizarra);

// router.delete( '/:id',
// [
//     validarJWT
// ],
// borrarPizarra);




module.exports = router;