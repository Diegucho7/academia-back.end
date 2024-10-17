const { response } = require("express")
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const {generarJwt} = require('../helpers/jwt')
const { googleVerify } = require("../helpers/google-verify")
const { getMenuFrontEnd } = require("../helpers/menu-frontend")
//Nota
const login = async(req, res = response)=>{

    const {email, password} = req.body;


    try {

        //verificar Email
        const usuarioDB = await Usuario.findOne({ email });


        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'El correo no existe'
            });
        }

        // Verificar contraseña
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validarPassword){
            return res.status(404).json({
                ok: false,
                msg: 'La contraseña esta incorrecta'
            });
        }

        // Generar el TOKEN -JWT
    
    const token = await generarJwt(usuarioDB.id);

        res.json({
            ok:true,
            token,
            menu: getMenuFrontEnd(usuarioDB.role)
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: ' Hable con el administrador'
        })

    }


}

const googleSignIn = async(req, res = response)=>{

    try {

        const {email, given_name, family_name,picture} = await googleVerify(req.body.token);

        const usuarioDB = await Usuario.findOne({email});

        let usuario;

        if(!usuarioDB){
            usuario = new Usuario({
                nombre: given_name,
                apellido: family_name,
                email: email,
                password:'@@@',
                img: picture,
                google: true
            })
        }else{
            usuario = usuarioDB;
            usuario.goole = true;
        }

        //Guardar Usuario
        await usuario.save();

        //Generar el Token - JWT
        const token = await generarJwt(usuario.id);

        res.json({
            ok:true,
            email, given_name,family_name, picture, token,
            menu:getMenuFrontEnd(usuario.role)
            
        });
    } catch (error) {
            console.log(error);
            res.status(400).json({
                ok:false,
                msg: "Token de google no es correcto"
            });
        
    }
}

const renewToken= async(req, res = response) =>{

    const uid = req.uid;

     //Generar el Token - JWT
     const token = await generarJwt(uid);

     // Retornar el usuario por UID
    const usuario = await Usuario.findById(uid); 

    res.json({
        ok:true,
        token,
        usuario, 
        menu:getMenuFrontEnd(usuario.role)
    })

}


const sendEmail = async(req, res = response) =>{
    const {to, subject, htmlBody, attachements = []} = req.body;

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

    } catch (error) {
        console.log(error);
    }
}
        // const info = await transporter.sendMail({
        //     from: process.env.EMAIL_FROM,



module.exports = {
    
    login,
    googleSignIn,
    renewToken,
    sendEmail
}
