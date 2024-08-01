/*
ruta:    /api/uploads/
*/
const {Router} = require ('express');
const expressFileUpload = require('express-fileupload');

const {validarJWT,validarADMIN_ROLE, validarADMIN_ROLE_o_mismoUsuario,validarADMIN_ROLE_o_Estudiante} =require('../middleware/validar-jwt');
const {fileUpload, retornaImagen,filePagosUpload} = require('../controllers/uplaods')

 
const router = Router();

router.use( expressFileUpload() );

router.put('/:tipo/:id', validarJWT , fileUpload );

router.get( '/:tipo/:foto' ,retornaImagen);


module.exports = router;    