const {response} = require('express');
const  bcrypt  = require ('bcryptjs');
const {generarJwt} = require('../helpers/jwt')

const Nota = require('../models/nota');
const Materia = require('../models/materia');
const Estudiante = require('../models/estudiante');
const Curso = require('../models/curso');




const getNotas = async (req, res) =>{
    
   
try {

    const notas = await Nota.find()
                                    .populate('estudiante','nombre apellido')
                                    .populate('periodo', 'mes anio curso')
                                    .populate({
                                        path: 'periodo',
                                        populate: { path: 'curso', 'select': 'nombre' }
                                     });                               
                            
    res.json({
        ok: true,
        notas
    })


}catch (error) {
    
}
}


const getNotaById  = async (req, res) =>{

    const id = req.params.id;

    
    try {
        const nota = await Nota.findById(id)
                                        .populate('usuario','nombre  img')
                                            .populate('curso','nombre img');
            res.json({
            ok: true,
            nota
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Hable con el administrador, nota no encontrada',
        })
        }

}

const crearNotas = async (req, res) =>{
    const uid =  req.uid;
    const nota = new Nota({
        usuario:uid,
        ...req.body
    });
    

    try {

        const notaDB = await nota.save();

        res.json({
            ok: true,
            nota: notaDB
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}


const actualizarNotas = async(req, res) =>{
    const id  = req.params.id;
    const uid = req.uid;

    try {

        const nota = await Nota.findById( id );
        if(!nota){
            res.status(500).json({
                ok: false,
                msg: 'Nota no encontrada'
                                })
                     }
                     
                     const cambiosNota = {
                        ...req.body,
                        usuario: uid
                     }

                const notaActualizado = await Nota.findByIdAndUpdate( id, cambiosNota,{new:true});

            // hospital.nombre = req.body.nombre;
                     
        
            res.json({
            ok: true,
            Nota: notaActualizado
        })
        



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const borrarNotas = async(req, res) =>{

    const id  = req.params.id;

    try {

        const nota = await Nota.findById( id );
        if(!nota){
            res.status(500).json({
                ok: false,
                msg: 'Nota no encontrado'
                                })
                     }
                     
                    
                await Nota.findByIdAndDelete (id);

                     
        
            res.json({
            ok: true,
            msg:'Nota Eliminada'
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
    getNotas,
    crearNotas,
    actualizarNotas,
    borrarNotas,
    getNotaById
}