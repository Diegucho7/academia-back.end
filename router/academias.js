/*
Academias
ruta: '/api/academias'
*/

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const { validarJWT } = require ('../middleware/validar-jwt');

const {
    getAcademias,
    crearAcademias,
    actualizarAcademias,
    borrarAcademias
} = require ('../controllers/academias')

const router = Router();

router.get( '/',validarJWT ,getAcademias);


router.post( '/', [
    validarJWT,
    check('nombre', 'El nombre de la academia es necesario').not().isEmpty(),
    validarCampos
] 
,crearAcademias);

router.put( '/:id',
[
    validarJWT,
    check('nombre', 'El nombre de la academia es necesario').not().isEmpty(),
]
,actualizarAcademias);

router.delete( '/:id',
[
    validarJWT
],
borrarAcademias);




module.exports = router;