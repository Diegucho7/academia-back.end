const {response} = require('express');
const  bcrypt  = require ('bcryptjs');
const {generarJwt} = require('../helpers/jwt')
const moment = require('moment');

const Pizarras = require('../models/pizarra');
const usuario = require('../models/usuario');

const getPizarra = async (req, res) =>{

    const pizarra = await Pizarras.find()
                                    .populate('usuario','nombre apellido')
                                    // .populate('pizarra')
    res.json({
        ok: true,
        pizarra
    })

}

const getPizarraById  = async (req, res) =>{

    const id = req.params.id;

    
    try {
        const pizarra = await Pizarras.findById(id)
                                        .populate('usuario','nombre apellido')
                                        // .populate('academia','nombre img')
                                        // .populate('materia','nombre img');
        res.json({
            ok: true,
            pizarra
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Hable con el administrador, tarea no encontrada',
        })
        }

}

const crearPizarra = async (req, res) =>{
   
    const uid =  req.uid;
    const pizarra = new Pizarras({
       
        usuario:uid,
        ...req.body
    });
    

    try {

        const pizarrasDB = await pizarra.save();

        res.json({
            ok: true,
            pizarra: pizarrasDB
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}


const actualizarPizarra = async(req, res) =>{
    const id  = req.params.id;
    const uid = req.uid;

    try {

        const pizarra = await Pizarras.findById( id );
        if(!pizarra){
            res.status(500).json({
                ok: false,
                msg: 'Tarea no encontrado'
                                })
                     }
                     
                     const cambiosTarea = {
                        ...req.body,
                        usuario: uid
                     }

                const pizarraActualizado = await Pizarras.findByIdAndUpdate( id, cambiosTarea,{new:true});

            // hospital.nombre = req.body.nombre;
                     
        
            res.json({
            ok: true,
            Tarea: pizarraActualizado
        })
        



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const borrarPizarra = async(req, res) =>{

    const id  = req.params.id;

    try {

        const pizarra = await Pizarras.findById( id );
        if(!pizarra){
            res.status(500).json({
                ok: false,
                msg: 'Tarea no encontrada'
                                })
                     }
                     
                    
                await Pizarras.findByIdAndDelete (id);

                     
        
            res.json({
            ok: true,
            msg:'Tarea Eliminada'
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
    crearPizarra,
    getPizarra,
    getPizarraById,
    actualizarPizarra,
    borrarPizarra,
}