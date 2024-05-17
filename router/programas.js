/*
Medicos
ruta: '/api/programas'
*/

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const { validarJWT } = require ('../middleware/validar-jwt');

const {
    getProgramas,
    crearProgramas,
    actualizarProgramas,
    borrarProgramas,
    getProgramaById
} = require ('../controllers/programas')

const router = Router();

router.get( '/',validarJWT ,getProgramas);


router.post( '/', [
    validarJWT,
    check('anio', 'El año del programa es necesario').not().isEmpty(),
    check('mes', 'El mes es necesario').not().isEmpty(),
    check('academia', 'El id del academia es necesario').not().isEmpty(),
    check('curso', 'El curso es necesario').not().isEmpty(),
    check('modulos', 'Los módulos son necesarios').isMongoId(),
    validarCampos
] 
,crearProgramas);

router.put( '/:id',
[
    validarJWT
]
,actualizarProgramas);

router.delete( '/:id',
[
validarJWT
],
borrarProgramas);

router.get('/:id',
[
validarJWT
],
getProgramaById
);




module.exports = router;