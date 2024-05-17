const {response} = require('express');
const  bcrypt  = require ('bcryptjs');
const {generarJwt} = require('../helpers/jwt')

const Programas = require('../models/programa');

const getProgramas = async (req, res) =>{

    const programas = await Programas.find()
                                    .populate('usuario','nombre apellido')
                                    .populate('academia','nombre  ')
                                    .populate('materia','nombre  ')
                                    .populate('profesor','nombre apellido ')
                                    // .populate('curso', 'nombre')
    res.json({
        ok: true,
        programas
    })

}

const getProgramaById  = async (req, res) =>{

    const id = req.params.id;

    
    try {
        const programa = await Profesores.findById(id)
                                        .populate('usuario','nombre apellido img')
                                        .populate('academia','nombre img')
                                        .populate('materia','nombre img');
        res.json({
            ok: true,
            programa
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Hable con el administrador, programa no encontrado',
        })
        }

}

const crearProgramas = async (req, res) =>{
    const uid =  req.uid;
    const programa = new Programas({
        usuario:uid,
        ...req.body
    });
    

    try {

        const programaDB = await programa.save();

        res.json({
            ok: true,
            programa: programaDB
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}


const actualizarProgramas = async(req, res) =>{
    const id  = req.params.id;
    const uid = req.uid;

    try {

        const programa = await Programas.findById( id );
        if(!programa){
            res.status(500).json({
                ok: false,
                msg: 'Programa no encontrado'
                                })
                     }
                     
                     const cambiosPrograma = {
                        ...req.body,
                        usuario: uid
                     }

                const programaActualizado = await Programas.findByIdAndUpdate( id, cambiosPrograma,{new:true});

            // hospital.nombre = req.body.nombre;
                     
        
            res.json({
            ok: true,
            Programa: programaActualizado
        })
        



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const borrarProgramas = async(req, res) =>{

    const id  = req.params.id;

    try {

        const programa = await Programas.findById( id );
        if(!programa){
            res.status(500).json({
                ok: false,
                msg: 'Programa no encontrado'
                                })
                     }
                     
                    
                await Programas.findByIdAndDelete (id);

                     
        
            res.json({
            ok: true,
            msg:'Programa Eliminado'
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
    getProgramas,
    crearProgramas,
    actualizarProgramas,
    borrarProgramas,
    getProgramaById
}