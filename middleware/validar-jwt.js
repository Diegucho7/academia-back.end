const jwt = require  ('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT =(req, res, next) =>{

    //Leer el Token
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const {uid} = jwt.verify(token,process.env.JWT_SECRET);
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }
}

const validarADMIN_ROLE = async(req, resp, next) =>{
        
        const uid = req.uid;

        try {

            const usuarioDb = await Usuario.findById(uid);

            if (!usuarioDb.role) {
                return resp.status(404).json({
                    ok: false,
                    msg: 'Usuario no existe'                

                })
            }
            if (usuarioDb.role !== 'ADMIN_ROLE') {
                return resp.status(403).json({
                    ok: false,
                    msg: 'No tiene permisos para realizar la función'                

                })  
            }

            next();
             
            
        } catch (error) {
            resp.status(500).json({
                ok:false,
                msg: 'Hable con el administrador'
            })
        }
}


const validarADMIN_ROLE_o_mismoUsuario = async(req, resp, next) =>{
        
        const uid = req.uid;
        const id = req.params.id;
        try {

            const usuarioDb = await Usuario.findById(uid);

            if (!usuarioDb) {
                return resp.status(404).json({
                    ok: false,
                    msg: 'Usuario no existe'                

                })
            }
            if (usuarioDb.role === 'ADMIN_ROLE'  || uid === id) {
            next();
                
            }else{  
                return resp.status(403).json({
                    ok: false,
                    msg: 'No tiene permisos para realizar la función'                

                })  ;

            }

             
            
        } catch (error) {
            resp.status(500).json({
                ok:false,
                msg: 'Hable con el administrador'
            })
        }
}
const validarADMIN_ROLE_o_Estudiante = async(req, resp, next) =>{
        
        const uid = req.uid;
        const id = req.params.id;
        try {

            const usuarioDb = await Usuario.findById(uid);

            if (!usuarioDb) {
                return resp.status(404).json({
                    ok: false,
                    msg: 'Usuario no existe'                

                })
            }
            if (usuarioDb.role === 'ADMIN_ROLE'  || usuarioDb.role === 'ESTUDIANTE_ROLE') {
            next();
                
            }else{  
                return resp.status(403).json({
                    ok: false,
                    msg: 'No tiene permisos para realizar la función'                

                })  ;

            }

             
            
        } catch (error) {
            resp.status(500).json({
                ok:false,
                msg: 'Hable con el administrador'
            })
        }
}


module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_mismoUsuario,
    validarADMIN_ROLE_o_Estudiante
        
}