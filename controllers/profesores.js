const {response} = require('express');
const  bcrypt  = require ('bcryptjs');
const {generarJwt} = require('../helpers/jwt')

const Profesores = require('../models/profesor');

const getProfesores = async (req, res) =>{

    const profesores = await Profesores.find()
                                    .populate('usuario','nombre apellido')
                                    .populate('academia','nombre  ')
    res.json({
        ok: true,
        profesores
    })

}

const getProfesorById  = async (req, res) =>{

    const id = req.params.id;

    
    try {
        const profesor = await Profesores.findById(id)
                                        .populate('usuario','nombre apellido img')
                                        .populate('academia','nombre img')
                                        // .populate('materia','nombre img');
        res.json({
            ok: true,
            profesor
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Hable con el administrador, profesor no encontrado',
        })
        }

}

const crearProfesores = async (req, res) =>{
    const uid =  req.uid;
    const profesor = new Profesores({
        usuario:uid,
        ...req.body
    });
    

    try {

        const profesorDB = await profesor.save();

        res.json({
            ok: true,
            profesor: profesorDB
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}


const actualizarProfesores = async(req, res) =>{
    const id  = req.params.id;
    const uid = req.uid;

    try {

        const profesor = await Profesores.findById( id );
        if(!profesor){
            res.status(500).json({
                ok: false,
                msg: 'Profesor no encontrado'
                                })
                     }
                     
                     const cambiosProfesor = {
                        ...req.body,
                        usuario: uid
                     }

                const profesorActualizado = await Profesores.findByIdAndUpdate( id, cambiosProfesor,{new:true});

            // hospital.nombre = req.body.nombre;
                     
        
            res.json({
            ok: true,
            Profesor: profesorActualizado
        })
        



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const borrarProfesores = async(req, res) =>{

    const id  = req.params.id;

    try {

        const profesor = await Profesores.findById( id );
        if(!profesor){
            res.status(500).json({
                ok: false,
                msg: 'Profesor no encontrado'
                                })
                     }
                     
                    
                await Profesores.findByIdAndDelete (id);

                     
        
            res.json({
            ok: true,
            msg:'Profesor Eliminado'
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
    getProfesores,
    crearProfesores,
    actualizarProfesores,
    borrarProfesores,
    getProfesorById
}