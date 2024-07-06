const {response} = require('express');
const  bcrypt  = require ('bcryptjs');
const {generarJwt} = require('../helpers/jwt')
const Usuario = require('../models/usuario');
const Estudiante = require('../models/estudiante');
const Periodo = require('../models/periodo');
const { ObjectId } = require('mongoose').Types;



const getUsuarioByCurso  = async (req, res) =>{
    
    const cursoId = req.params.id;
    // const cursoId = '6647d598dc0644dd15c07c99'; // Reemplaza esto con el ID del curso que estás buscando
    
    const desde = Number(req.query.desde) || 0 ;
    
    // En el caso que quiera filtrar datos de mi consulta
    // const usuario = await Usuario.find({},'nombre apellido google email ');
    const [estudiante, total] = await Promise.all([
        Estudiante
        .find({curso: cursoId})
                                        .populate('usuario','id nombre apellido')
        .skip(desde)
        .limit(30),

        Estudiante.countDocuments() 

    ]);
   

    res.json({
        ok:true,
        estudiante,
        // total
        
    })

}


const getCursoByEstudiante  = async (req, res) =>{
    
    const EstudianteId = req.params.id;
    // const cursoId = '6647d598dc0644dd15c07c99'; // Reemplaza esto con el ID del curso que estás buscando
    
    const desde = Number(req.query.desde) || 0 ;
    
    // En el caso que quiera filtrar datos de mi consulta
    // const usuario = await Usuario.find({},'nombre apellido google email ');
    const [curso, total] = await Promise.all([
        Estudiante
        .find({usuario: EstudianteId})
                                        .populate('curso',' ')
                                        .skip(desde).populate({
                                            path: 'curso',
                                            populate: { path: 'curso', 'select': 'nombre' }
                                        })
                                        .skip(desde).populate({
                                            path: 'curso',
                                            populate: { path: 'academia', 'select': 'nombre' }
                                        })
        .limit(10),

        Estudiante.countDocuments() 

    ]);
   

    res.json({
        ok:true,
        curso,
        // total
        
    })

}
const getEstudiantes = async (req, res) =>{

    const estudiantes = await Estudiante.find()
                                    .populate('usuario',' ')
                                      .populate('curso','anio mes curso' )
                                      .populate({
                                        path: 'curso',
                                        populate: { path: 'curso', 'select': 'nombre' }
                                     });
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
                                        .populate('curso','anio mes curso' )
                                        .populate({
                                          path: 'curso',
                                          populate: { path: 'curso', 'select': 'nombre' }
                                       });
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

        const estudiante = await Estudiante.findById(id);
        if(!estudiante){
            res.status(500).json({
                ok: false,
                msg: 'Estudiante no encontrado'
                
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
            Estudiante: estudianteActualizado
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
    getCursoByEstudiante,
    getUsuarioByCurso,
    getEstudiantes,
    crearEstudiantes,
    actualizarEstudiantes,
    borrarEstudiantes,
    getEstudianteById
}