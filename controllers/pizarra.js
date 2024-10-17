const {response} = require('express');
const  bcrypt  = require ('bcryptjs');
const {generarJwt} = require('../helpers/jwt')

const Pizarra = require('../models/pizarra');
// const pizarra = require('../models/pizarra');

// const getPizarra = async (req, res) =>{

//     const profesores = await Pizarra.find()
//                                     .populate('usuario','nombre apellido')
//                                     .populate('academia','nombre  ')
//     res.json({
//         ok: true,
//         profesores
//     })

// }

// const getProfesorById  = async (req, res) =>{

//     const id = req.params.id;

    
//     try {
//         const pizarra = await Pizarra.findById(id)
//                                         .populate('usuario','nombre apellido img')
//                                         .populate('academia','nombre img')
//                                         // .populate('materia','nombre img');
//         res.json({
//             ok: true,
//             pizarra
//         })
        
//     } catch (error) {
//         console.log(error)
//         res.json({
//             ok: false,
//             msg: 'Hable con el administrador, profesor no encontrado',
//         })
//         }

// }

const crearPizarra = async (req, res) =>{
    const uid =  req.uid;
    const pizarra = new Pizarra({
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


// const actualizarPizarra = async(req, res) =>{
//     const id  = req.params.id;
//     const uid = req.uid;

//     try {

//         const profesor = await Pizarra.findById( id );
//         if(!profesor){
//             res.status(500).json({
//                 ok: false,
//                 msg: 'Profesor no encontrado'
//                                 })
//                      }
                     
//                      const cambiosProfesor = {
//                         ...req.body,
//                         usuario: uid
//                      }

//                 const profesorActualizado = await Pizarra.findByIdAndUpdate( id, cambiosProfesor,{new:true});

//             // hospital.nombre = req.body.nombre;
                     
        
//             res.json({
//             ok: true,
//             Profesor: profesorActualizado
//         })
        



//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             ok: false,
//             msg: 'Hable con el administrador'
//         })
//     }
// }


// const borrarPizarra = async(req, res) =>{

//     const id  = req.params.id;

//     try {

//         const profesor = await Pizarra.findById( id );
//         if(!profesor){
//             res.status(500).json({
//                 ok: false,
//                 msg: 'Profesor no encontrado'
//                                 })
//                      }
                     
                    
//                 await Pizarra.findByIdAndDelete (id);

                     
        
//             res.json({
//             ok: true,
//             msg:'Profesor Eliminado'
//         })
        



//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             ok: false,
//             msg: 'Hable con el administrador'
//         })
//     }


    
// }




module.exports = {
    // getPizarra,
    crearPizarra,
    // actualizarPizarra,
    // borrarPizarra,
    // getProfesorById
}