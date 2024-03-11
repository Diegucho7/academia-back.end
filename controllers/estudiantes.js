const {response} = require('express');
const  bcrypt  = require ('bcryptjs');
const {generarJwt} = require('../helpers/jwt')

const Estudiante = require('../models/estudiante');

const getEstudiantes = async (req, res) =>{

    const estudiantes = await Estudiante.find()
                                    .populate('usuario','nombre ')
                                      .populate('curso','nombre  ')
    res.json({
        ok: true,
        estudiantes
    })

}

const getEstudianteById  = async (req, res) =>{

    const id = req.params.id;

    
    try {
        const estudiante = await Estudiante.findById(id)
                                        .populate('usuario','nombre img ')
                                            .populate('curso','nombre img');
            res.json({
            ok: true,
            estudiante
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Hable con el administrador, estudiante no encontrado',
        })
        }

}

const crearEstudiantes = async (req, res) =>{
    const uid =  req.uid;
    const estudiante = new Estudiante({
        usuario:uid,
        ...req.body
    });
    

    try {

        const estudianteDB = await estudiante.save();

        res.json({
            ok: true,
            estudiante: estudianteDB
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}


const actualizarEstudiantes = async(req, res) =>{
    const id  = req.params.id;
    const uid = req.uid;

    try {

        const estudiante = await Estudiante.findById( id );
        if(!estudiante){
            res.status(500).json({
                ok: false,
                msg: 'Estudiante no encontrada'
                                })
                     }
                     
                     const cambiosEstudiante = {
                        ...req.body,
                        usuario: uid
                     }

                const estudianteActualizado = await Estudiante.findByIdAndUpdate( id, cambiosEstudiante,{new:true});

            // hospital.nombre = req.body.nombre;
                     
        
            res.json({
            ok: true,
            Materia: estudianteActualizado
        })
        



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const borrarEstudiantes = async(req, res) =>{

    const id  = req.params.id;

    try {

        const estudiante = await Estudiante.findById( id );
        if(!estudiante){
            res.status(500).json({
                ok: false,
                msg: 'Estudiante no encontrado'
                                })
                     }
                     
                    
                await Estudiante.findByIdAndDelete (id);

                     
        
            res.json({
            ok: true,
            msg:'Estudiante Eliminado'
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
    getEstudiantes,
    crearEstudiantes,
    actualizarEstudiantes,
    borrarEstudiantes,
    getEstudianteById
}