/*
Medicos
ruta: '/api/profesores'
*/

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const { validarJWT } = require ('../middleware/validar-jwt');

const {
    getProfesores,
    crearProfesores,
    actualizarProfesores,
    borrarProfesores,
    getProfesorById
} = require ('../controllers/profesores')

const router = Router();

router.get( '/',validarJWT ,getProfesores);


router.post( '/', [
    validarJWT,
    check('nombre', 'El nombre del profesor es necesario').not().isEmpty(),
    check('apellido', 'El apellido del profesor es necesario').not().isEmpty(),
    check('academia', 'El id del academia es necesario').not().isEmpty(),
    check('academia', 'El academia id, debe de ser válido').isMongoId(),
    validarCampos
] 
,crearProfesores);

router.put( '/:id',
[
    validarJWT
]
,actualizarProfesores);

router.delete( '/:id',
[
validarJWT
],
borrarProfesores);

router.get('/:id',
[
validarJWT
],
getProfesorById
);




module.exports = router;