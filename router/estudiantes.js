/*
Academias
ruta: '/api/estudiantes'
*/

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const { validarJWT } = require ('../middleware/validar-jwt');

const {
    getEstudiantes,
    crearEstudiantes,
    actualizarEstudiantes,
    borrarEstudiantes,
    getEstudianteById,
    getUsuarioByCurso,
    getCursoByEstudiante
} = require ('../controllers/estudiantes')

const router = Router();

router.get( '/',validarJWT ,getEstudiantes);
router.get( '/curso/:id',validarJWT ,getUsuarioByCurso);
router.get( '/estudiante/:id',validarJWT ,getCursoByEstudiante);


router.post( '/', [
    validarJWT,
    check('curso', 'El curso es necesario').not().isEmpty(),
    validarCampos
] 
,crearEstudiantes);

router.put( '/:id',
[
    validarJWT,
    check('curso', 'El nombre del estudiante es necesario').not().isEmpty(),
]
,actualizarEstudiantes);

router.delete( '/:id',
[
    validarJWT
],
borrarEstudiantes);
router.get('/:id',
[
validarJWT
],
getEstudianteById
);



module.exports = router;