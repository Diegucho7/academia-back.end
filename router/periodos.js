/*
Medicos
ruta: '/api/periodos'
*/

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const { validarJWT } = require ('../middleware/validar-jwt');

const {
    getPeriodos,
    crearPeriodos,
    actualizarPeriodos,
    borrarPeriodos,
    getPeriodoById
} = require ('../controllers/periodos')

const router = Router();

router.get( '/',validarJWT ,getPeriodos);


router.post( '/', [
    validarJWT,
    check('anio', 'El año del programa es necesario').not().isEmpty(),
    check('mes', 'El mes es necesario').not().isEmpty(),
    check('academia', 'El id del academia es necesario').not().isEmpty(),
    check('curso', 'El curso es necesario').not().isEmpty(),
    check('modulos', 'los módulos son necesarios').not().isEmpty(),
    validarCampos
] 
,crearPeriodos);

router.put( '/:id',
[
    validarJWT
]
,actualizarPeriodos);

router.delete( '/:id',
[
validarJWT
],
borrarPeriodos);

router.get('/:id',
[
validarJWT
],
getPeriodoById
);




module.exports = router;