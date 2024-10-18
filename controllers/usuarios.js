const {response} = require('express');
const  bcrypt  = require ('bcryptjs');
const Usuario = require('../models/usuario');
const {generarJwt} = require('../helpers/jwt');
const nodemailer  = require('nodemailer');


const { auth } = require('google-auth-library');

const SendMailOptions = {
    to: String | [],
    subject: String,
    htmlBody: String,
    // attachements: Attachement | []
}
// const Attachement = {
//     filename: String,
//     path: String
//   }


const getUsuarioByRoleProfesor  = async (req, res) =>{

    const desde = Number(req.query.desde) || 0 ;
    
    // En el caso que quiera filtrar datos de mi consulta
    // const usuario = await Usuario.find({},'nombre apellido google email ');
    const [usuarios, total] = await Promise.all([
        Usuario
        .find({"role":"PROFESOR_ROLE"},'nombre apellido email role telefono cedula academia estado google img')
        .skip(desde)
        .limit(10),

        Usuario.countDocuments() 

    ]);
   

    res.json({
        ok:true,
        usuarios,
        total
        
    })

}
const getUsuarioByCurso  = async (req, res) =>{

    const uid = req.params.id;
    // En el caso que quiera filtrar datos de mi consulta
    // const usuario = await Usuario.find({},'nombre apellido google email ');
    const usuarios = await Promise.all([
        Usuario
        .findById(uid,'nombre apellido email role telefono cedula academia estado google img')
        ,

        Usuario.countDocuments() 

    ]);
   

    res.json({
        ok:true,
        usuarios,
        
        
    })

}
const getUsuarioById  = async (req, res) =>{

    const uid = req.params.id;
    // En el caso que quiera filtrar datos de mi consulta
    // const usuario = await Usuario.find({},'nombre apellido google email ');
    const usuarios = await Promise.all([
        Usuario
        .findById(uid)
                                    // .populate('nombre','_id')
                                    //   .populate('curso','anio mes curso' )
                                    //   .populate({
                                    //     path: 'curso',
                                    //     populate: { path: 'curso', 'select': 'nombre' }
                                    //  })
        ,

        Usuario.countDocuments() 

    ]);
   

    res.json({
        ok:true,
        usuarios,
        
        
    })

}
const getUsuarioByRoleEstudiante  = async (req, res) =>{

    const desde = Number(req.query.desde) || 0 ;
    
    // En el caso que quiera filtrar datos de mi consulta
    // const usuario = await Usuario.find({},'nombre apellido google email ');
    const [usuarios, total] = await Promise.all([
        Usuario
        .find({"role":"ESTUDIANTE_ROLE"},'nombre apellido email role telefono cedula academia estado google img')
        .skip(desde)
        .limit(20),

        Usuario.countDocuments() 

    ]);
   

    res.json({
        ok:true,
        usuarios,
        total
        
    })

}
const getUsuarios = async (req, res) =>{

    const desde = Number(req.query.desde) || 0 ;
    
    // En el caso que quiera filtrar datos de mi consulta
    // const usuario = await Usuario.find({},'nombre apellido google email ');
    const [usuarios, total] = await Promise.all([
        Usuario
        .find({},'nombre apellido email role telefono cedula academia estado google img')
        .skip(desde)
        .limit(5),

        Usuario.countDocuments() 

    ]);
   

    res.json({
        ok:true,
        usuarios,
        total
        
    })

}
const crearUsuarios = async(req, res = response) => {

    const { email, password } = req.body;
    try {
        const existeEmail = await Usuario.findOne({ email });
        if ( existeEmail  ) {


            if (existeEmail.emailValidated === true) {

            // console.log(existeEmail.emailValidated);
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado y validado'
            });
            }
            if (existeEmail.emailValidated === false) {
            
               await borrarUsuariosNoAutenticado(existeEmail._id);
                
            }

            }



           
        // }


        const usuario = new Usuario( req.body );    
    
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        //Eviar correo
        
        // Guardar usuario
        await usuario.save();
        
        
        //generar el JWT
        const token = await generarJwt(usuario.id);
        sendEmailValidationLink(token,email);
        
        res.json({
            ok: true,
            usuario,
            token
            
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const actualizarUsuario = async (req, res = response) => {
    
    //TODO: Validar Token y comprobar si es el usuario correcto

    const uid = req.params.id;
    
    try {
        const usuarioDB = await Usuario.findById(uid);
        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'no existe un usuario con ese id'
            });
        }
        // Actualizaciones

        const { password, google, email,  ...campos} = req.body;
        if( usuarioDB.email !== email ){
            const existeEmail = await Usuario.findOne({email });
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con este email'
                })
            }
        }
        
        if(!usuarioDB.google){
            campos.email = email;
        }else if(usuarioDB.email != email){
            return res.status(400).json({
                ok: false,
                msg: 'Usuarios de Google no pueden cambiar su correo'
            })
        }


        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});
        res.json({
            ok:true,
            usuario: usuarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const borrarUsuarios = async(req, res= response)=>{
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if( !usuarioDB ){               
            return res.status(404).json({
                ok: false,
                msg: 'no existe un usuario con ese id'
            });
        }
        await Usuario.findByIdAndDelete(uid);
            res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const borrarUsuariosNoAutenticado = async(req, res= response)=>{
    console.log(req);
    // return
    const uid = req;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if( !usuarioDB ){               
            return res.status(404).json({
                ok: false,
                msg: 'no existe un usuario con ese id'
            });
        }
        await Usuario.findByIdAndDelete(uid);
           
           return  console.log("borrado");
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const sendEmailValidationLink = async ( token, correo) => {
   
    const config = {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "academiavna12@gmail.com",
            pass: "jzww oagf bzgh qhvm"
        }
    }
   
    // let mailService = "gmail";
    // let mailEmail = "dvelarde140@gmail.com";
    // let mailSecretKey= "sqvr zucy wqbl rurw";

    const mensaje = {
        from: "academiavna12@gmail.com",
        to: correo,
        subject: "Validar Email",
        html: `<h1>Validar Email</h1>
        <p>Para validar el email haga click en el siguiente link</p>
        <a href="http://localhost:3000/api/auth/validar-email/${token}">Validar Email:${correo}</a>`
    }


    const transporter = nodemailer.createTransport(config);
    const info = await transporter.sendMail(mensaje);
    console.log(info);

    }

    const validarToken = async(token) => {
    
        const payload = await JwtAdapter.validateToken(token);
        if(!payload) throw CustomsError.internaServer('Error validating token');

        const {email} = payload ;

        // if(!email) throw CustomsError.internaServer('Error validating token');

        const user = await UserModel.findOne({email: email});

        // if(!user) throw CustomsError.internaServer('no user found');

        user.emailValidated = true;
        await user.save();
        return true;
        

    }
module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuarios,
    getUsuarioByRoleProfesor,
    getUsuarioByRoleEstudiante,
    getUsuarioByCurso,
    getUsuarioById
}