/*
Pagos
ruta: '/api/pagos'
*/

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const { validarJWT } = require ('../middleware/validar-jwt');

const {
    getPagos,
    crearPagos,
    actualizarPagos,
    borrarPagos,
    getPagoById
} = require ('../controllers/pagos')

const router = Router();

router.get( '/',validarJWT ,getPagos);


router.post( '/', [
    // validarJWT,
    // check('valor', 'El valor de la nota es necesario').not().isEmpty(),
    // check('materia', 'El id del curso es necesario').not().isEmpty(),
    // check('materia', 'El curso id, debe de ser válido').isMongoId(),
    // check('estudiante', 'El id del curso es necesario').not().isEmpty(),
    // check('estudiante', 'El estudiante id, debe de ser válido').isMongoId(),
    validarCampos
] 
,crearPagos);

router.put( '/:id',
[
    validarJWT
]
,actualizarPagos);

router.delete( '/:id',
[
validarJWT
],
borrarPagos);

router.get('/:id',
[
validarJWT
],
getPagoById
);




module.exports = router;