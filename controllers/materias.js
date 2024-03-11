const {response} = require('express');
const  bcrypt  = require ('bcryptjs');
const {generarJwt} = require('../helpers/jwt')

const Materia = require('../models/materia');
const Curso = require('../models/curso');

// const getMaterias = async (req, res) =>{
//     const curso = req.params.id;    
//     const materias = await Materia.where({ curso: curso })
//                                     .populate('usuario','nombre ')
//                                     .populate('curso','nombre  ')
//     res.json({
//         ok: true,
//         materias 
//     })

// }
const getMaterias = async (req, res) =>{

    const materias = await Materia.find()
                                    .populate('usuario','nombre ')
                                    .populate('curso','nombre  ')
    res.json({
        ok: true,
        materias
    })

}

const getMateriasbyCurse = async (req, res) =>{
    // const id = req.params.id;
    const curso = req.params.id;    
    const materia = await Materia.find()
    .populate({
        path: 'curso',
        // match: { curso: ObjectId('65e003790724f2b7fb3edf50') }
      });
      
      const filtro = materia.filter(record => record.curso);
                                    // .populate('usuario','nota ')
                                    // .populate('materia','nombre  ')
    res.json({
        ok: true,
        filtro
    })

}

const getCursoById  = async (req, res) =>{

    const id = req.params.id;

    
    try {
        const curso = await Curso.findById(id)
                                        .populate('usuario','nombre  img')
                                            .populate('curso','nombre img');
            res.json({
            ok: true,
            curso
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Hable con el administrador, materia no encontrada',
        })
        }

}

const getMateriaById  = async (req, res) =>{

    const id = req.params.id;

    
    try {
        const materia = await Materia.findById(id)
                                        .populate('usuario','nombre  img')
                                            .populate('curso','nombre img');
            res.json({
            ok: true,
            materia
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Hable con el administrador, materia no encontrada',
        })
        }

}

const crearMaterias = async (req, res) =>{
    const uid =  req.uid;
    const materia = new Materia({
        usuario:uid,
        ...req.body
    });
    

    try {

        const materiaDB = await materia.save();

        res.json({
            ok: true,
            materia: materiaDB
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}


const actualizarMaterias = async(req, res) =>{
    const id  = req.params.id;
    const uid = req.uid;

    try {

        const materia = await Materia.findById( id );
        if(!materia){
            res.status(500).json({
                ok: false,
                msg: 'Materia no encontrada'
                                })
                     }
                     
                     const cambiosMateria = {
                        ...req.body,
                        usuario: uid
                     }

                const materiaActualizado = await Materia.findByIdAndUpdate( id, cambiosMateria,{new:true});

            // hospital.nombre = req.body.nombre;
                     
        
            res.json({
            ok: true,
            Materia: materiaActualizado
        })
        



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const borrarMaterias = async(req, res) =>{

    const id  = req.params.id;

    try {

        const materia = await Materia.findById( id );
        if(!materia){
            res.status(500).json({
                ok: false,
                msg: 'Materia no encontrado'
                                })
                     }
                     
                    
                await Materia.findByIdAndDelete (id);

                     
        
            res.json({
            ok: true,
            msg:'Materia Eliminado'
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
    getMaterias,
    crearMaterias,
    actualizarMaterias,
    borrarMaterias,
    getMateriaById,
    getMateriasbyCurse,
    getCursoById
}