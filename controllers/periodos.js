const {response} = require('express');
const  bcrypt  = require ('bcryptjs');
const {generarJwt} = require('../helpers/jwt')

const Periodos = require('../models/periodo');
const usuario = require('../models/usuario');

const getPeriodos = async (req, res) =>{

    const periodos = await Periodos.find()
                                    .populate('usuario','nombre apellido')
                                    .populate('anio','nombre  ')
                                    .populate('mes','nombre ')
                                    .populate('academia','nombre  ')
                                    .populate('curso', 'nombre')
                                    .populate('profesor', 'nombre apellido')
                                    .populate('modulos')
                                    .populate('valor')
    res.json({
        ok: true,
        periodos
    })

}

const getPeriodoById  = async (req, res) =>{

    const id = req.params.id;

    
    try {
        const periodo = await Periodos.findById(id)
                                        .populate('usuario','nombre apellido img')
                                        .populate('anio')
                                        .populate('mes')
                                        .populate('academia','nombre img')
                                        .populate('profesor','nombre apellido ')
                                        .populate('curso', 'nombre')
                                        .populate('modulos')
                                        .populate('valor')
        res.json({
            ok: true,
            periodo
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Hable con el administrador, programa no encontrado',
        })
        }

}

const crearPeriodos = async (req, res) =>{
    const uid =  req.uid;
    const periodo = new Periodos({
        usuario:uid,
        ...req.body
    });
    

    try {

        const periodoDB = await periodo.save();

        res.json({
            ok: true,
            periodo: periodoDB
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}


const actualizarPeriodos = async(req, res) =>{
    const id  = req.params.id;
    const uid = req.uid;

    try {

        const periodo = await Periodos.findById( id );
        if(!periodo){
            res.status(500).json({
                ok: false,
                msg: 'Periodo no encontrado'
                                })
                     }
                     
                     const cambiosPeriodo = {
                        ...req.body,
                        usuario: uid
                     }

                const periodoActualizado = await Periodos.findByIdAndUpdate( id, cambiosPeriodo,{new:true});

            // hospital.nombre = req.body.nombre;
                     
        
            res.json({
            ok: true,
            Periodo: periodoActualizado
        })
        



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const borrarPeriodos = async(req, res) =>{

    const id  = req.params.id;

    try {

        const periodo = await Periodos.findById( id );
        if(!periodo){
            res.status(500).json({
                ok: false,
                msg: 'Periodo no encontrado'
                                })
                     }
                     
                    
                await Periodos.findByIdAndDelete (id);

                     
        
            res.json({
            ok: true,
            msg:'Periodo Eliminado'
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
    getPeriodos,
    crearPeriodos,
    actualizarPeriodos,
    borrarPeriodos,
    getPeriodoById
}