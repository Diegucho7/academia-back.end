const {response} = require('express');
const  bcrypt  = require ('bcryptjs');
const {generarJwt} = require('../helpers/jwt')

const Curso = require('../models/curso');


const getCursos =  async (req, res) =>{
    const cursos = await Curso.find()
                                    .populate('usuario','nombre ')
    res.json({
        ok: true,   
        cursos
    })
}


const crearCursos = async(req, res) =>{

    const uid =  req.uid;
    const curso = new Curso({
        usuario:uid,
        ...req.body
    });
    

    try {

        const cursoDB = await curso.save();

        res.json({
            ok: true,   
            curso: cursoDB
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }

   
}


const actualizarCursos = async(req, res) =>{

    const id  = req.params.id;
    const uid = req.uid;

    try {

        const curso = await Curso.findById( id );
        if(!curso){
            res.status(500).json({
                ok: false,
                msg: 'Curso no encontrado'
                                })
                     }
                     
                     const cambiosCurso = {
                        ...req.body,
                        usuario: uid
                     }

                const cursoActualizado = await Curso.findByIdAndUpdate( id, cambiosCurso,{new:true});

            // hospital.nombre = req.body.nombre;
                     
        
            res.json({
            ok: true,
            curso: cursoActualizado
        })
        



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const borrarCursos = async(req, res) =>{
    
    const id  = req.params.id;

    try {

        const curso = await Curso.findById( id );
        if(!curso){
            res.status(500).json({
                ok: false,
                msg: 'Curso no encontrada'
                                })
                     }
                     
                    
                await Curso.findByIdAndDelete (id);

                     
        
            res.json({
            ok: true,
            msg:'Curso Eliminada'
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
    getCursos,
    crearCursos,
    actualizarCursos,
    borrarCursos
}