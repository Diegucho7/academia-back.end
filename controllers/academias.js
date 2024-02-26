const {response} = require('express');
const  bcrypt  = require ('bcryptjs');
const {generarJwt} = require('../helpers/jwt')

const Academia = require('../models/academia');


const getAcademias =  async (req, res) =>{
    const academias = await Academia.find()
                                    .populate('usuario','nombre ')
    res.json({
        ok: true,   
        academias
    })
}


const crearAcademias = async(req, res) =>{

    const uid =  req.uid;
    const academia = new Academia({
        usuario:uid,
        ...req.body
    });
    

    try {

        const academiaDB = await academia.save();

        res.json({
            ok: true,   
            academia: academiaDB
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }

   
}


const actualizarAcademias = async(req, res) =>{

    const id  = req.params.id;
    const uid = req.uid;

    try {

        const academia = await Academia.findById( id );
        if(!academia){
            res.status(500).json({
                ok: false,
                msg: 'Academia no encontrado'
                                })
                     }
                     
                     const cambiosAcademia = {
                        ...req.body,
                        usuario: uid
                     }

                const academiaActualizado = await Academia.findByIdAndUpdate( id, cambiosAcademia,{new:true});

            // hospital.nombre = req.body.nombre;
                     
        
            res.json({
            ok: true,
            academia: academiaActualizado
        })
        



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const borrarAcademias = async(req, res) =>{
    
    const id  = req.params.id;

    try {

        const academia = await Academia.findById( id );
        if(!academia){
            res.status(500).json({
                ok: false,
                msg: 'Academia no encontrada'
                                })
                     }
                     
                    
                await Academia.findByIdAndDelete (id);

                     
        
            res.json({
            ok: true,
            msg:'Academia Eliminada'
        })
        



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}




module.exports = {
    getAcademias,
    crearAcademias,
    actualizarAcademias,
    borrarAcademias
}