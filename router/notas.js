/*
Notas
ruta: '/api/notas'
*/

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const { validarJWT } = require ('../middleware/validar-jwt');

const {
    getNotas,
    crearNotas,
    actualizarNotas,
    borrarNotas,
    getNotaById
} = require ('../controllers/notas')

const router = Router();

router.get( '/',validarJWT ,getNotas);


router.post( '/', [
    // validarJWT,
    // check('valor', 'El valor de la nota es necesario').not().isEmpty(),
    // check('materia', 'El id del curso es necesario').not().isEmpty(),
    // check('materia', 'El curso id, debe de ser válido').isMongoId(),
    // check('estudiante', 'El id del curso es necesario').not().isEmpty(),
    // check('estudiante', 'El estudiante id, debe de ser válido').isMongoId(),
    validarCampos
] 
,crearNotas);

router.put( '/:id',
[
    validarJWT
]
,actualizarNotas);

router.delete( '/:id',
[
validarJWT
],
borrarNotas);

// router.get('/:id',
// [
// validarJWT
// ],
// getNotaById
// );




module.exports = router;