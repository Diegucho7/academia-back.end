// import express from 'express';
const { response, request } = 'express';
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const { validationResult } = require('express-validator');

const validarCampos = ( req, res = response, next ) => {
   
    const errores = validationResult( req );

    if (!errores.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:errores.mapped()
        });
    }

    next();


}

const validarEmail = (req, res) => {

    

    // Clave secreta (obtenida de tu base de datos)
    const claveSecreta = process.env.JWT_SECRET;
    
    // Token recibido
    const tokenRecibido = req.params.token;
    
    // Verifica la firma del token
    jwt.verify(tokenRecibido, claveSecreta, (err, decoded) => {
      if (err) {
        console.log('El token no está firmado por tu base de datos');
        res.json('Token no firmado');
        
      } else {
        console.log('El token está firmado por tu base de datos');
        // console.log(decoded); // Imprime el contenido del token
        // console.log(decoded.uid)
        res.json('validarEmail');
        const uid = decoded.uid;
        actualizarEstado(uid);
    }
});



// res.json('validarEmail');
    // console.log(req.params);


    // const {token} = req.params;
    // // res.json(token);
    //        ValidateEmail(token)
    //         .then(() => res.json('Email Validado '))
    //         .catch((error) => this.handleError(error, res));

    // // res.json('ValidateEmail');
}


const actualizarEstado = async (req, res = request, response) => {
    
    const id  = req;
    console.log(id);
    // const uid = req.uid;

    try {

        const usuario = await Usuario.findById( id );
        if(!usuario){
            res.status(500).json({
                ok: false,
                msg: 'Usuario no encontrado'
                                })
                     }
                     
                usuario.emailValidated = true;
                await usuario.save();

                     const cambiosUsuario = {
                        ...req.body,
                        usuario: id
                     }

                const usuarioActualizado = await Usuario.findByIdAndUpdate( id, cambiosUsuario,{new:true});

            // hospital.nombre = req.body.nombre;
                     
        // REPARAR EN VEZ DE CONSOLE.LOG HACER RES.JSON !!!!!!!!!!!!11
            res.json({
            ok: true,
            usuario: usuarioActualizado
        })
        

        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }

    }


const ValidateEmail = async (token) => {

    const payload = await JwtAdapter.validateToken(token);
    if(!payload) throw CustomsError.internaServer('Error validating token');

    const {email} = payload ;

    if(!email) throw CustomsError.internaServer('Error validating token');

    const user = await UserModel.findOne({email});

    if(!user) throw CustomsError.internaServer('no user found');

    user.emailValidated = true;
    await user.save();
    return true;

}


module.exports = {
    validarCampos,
    validarEmail

}