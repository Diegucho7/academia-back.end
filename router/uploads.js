/*
ruta:    /api/uploads/
*/
const {Router} = require ('express');
const expressFileUpload = require('express-fileupload');

const {validarJWT,validarADMIN_ROLE, validarADMIN_ROLE_o_mismoUsuario} =require('../middleware/validar-jwt');
const {fileUpload, retornaImagen} = require('../controllers/uplaods')

 
const router = Router();

router.use( expressFileUpload() );  

router.put( '/:tipo/:id',[validarJWT,validarADMIN_ROLE_o_mismoUsuario] ,fileUpload);

// router.get( '/:tipo/:foto',validarJWT ,retornaImagen);
router.get( '/:tipo/:foto' ,retornaImagen);


module.exports = router;    