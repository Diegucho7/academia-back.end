/*
Recibos
ruta: '/api/recibos'
*/

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const { validarJWT } = require ('../middleware/validar-jwt');

const {
    getRecibos,
    crearRecibos,
    actualizarRecibos,
    borrarRecibos,
    getRecibosporPago,
    getRecibosPorId
} = require ('../controllers/recibos')

const router = Router();

router.get( '/',validarJWT ,getRecibos);

router.get( '/:id',validarJWT ,getRecibosPorId);

router.get( '/pago/:id',validarJWT ,getRecibosporPago);


router.post( '/', [
    validarJWT, 
    check('valor', 'El valor del recibo es necesario').not().isEmpty(),
    check('pago', 'El id del pago es necesario').not().isEmpty(),
    validarCampos
] 
,crearRecibos);

router.put( '/:id',
[
    validarJWT,
    check('valor', 'El valor del recibo es necesario').not().isEmpty(),
]
,actualizarRecibos);

router.delete( '/:id',
[
    validarJWT
],
borrarRecibos);




module.exports = router;