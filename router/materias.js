/*
Materias
ruta: '/api/materias'
*/

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const { validarJWT } = require ('../middleware/validar-jwt');

const {
    getMaterias,
    crearMaterias,
    actualizarMaterias,
    borrarMaterias,
    getMateriaById,
    
} = require ('../controllers/materias')

const router = Router();

router.get( '/',validarJWT ,getMaterias);


router.post( '/', [
    validarJWT,
    check('nombre', 'El nombre de la materia es necesario').not().isEmpty(),
    check('curso', 'El id del curso es necesario').not().isEmpty(),
    check('curso', 'El curso id, debe de ser válido').isMongoId(),
    validarCampos
] 
,crearMaterias);

router.put( '/:id',
[
    validarJWT
]
,actualizarMaterias);

router.delete( '/:id',
[
validarJWT
],
borrarMaterias);

router.get('/:id',
[
validarJWT
],
getMateriaById
);




module.exports = router;