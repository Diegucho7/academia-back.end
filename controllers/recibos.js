const {response} = require('express');
const  bcrypt  = require ('bcryptjs');
const {generarJwt} = require('../helpers/jwt')

const Recibo = require('../models/recibo');
const { default: mongoose } = require('mongoose');


const getRecibos =  async (req, res) =>{
    const recibos = await Recibo.find()
                                    .populate('usuario','nombre ')
    res.json({
        ok: true,   
        recibos
    })
}
const getRecibosPorId =  async (req, res) =>{
    const id =   req.params.id;
    try {
        const recibo = await Recibo.findById(id)
                                        // .populate('usuario','nombre apellido img')
                                        // .populate('academia','nombre img')
                                        // .populate('materia','nombre img');
        res.json({
            ok: true,
            recibo
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Hable con el administrador, recibo no encontrado',
        })
        }
}
const getRecibosporPago =  async (req, res) =>{
    const PagoId = req.params.id;
    const recibos = await Recibo.find({pago: PagoId})
                                    // .populate('usuario','nombre ')
    res.json({
        ok: true,   
        recibos
    })
}


const crearRecibos = async(req, res) =>{
    const pagoId= req.params.id
    const uid =  req.uid;
    const recibo = new Recibo({
        usuario:uid,
        pago: pagoId,
        ...req.body
    });
    

    try {

        const reciboDB = await recibo.save();

        res.json({
            ok: true,   
            recibo: reciboDB
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }

   
}


const actualizarRecibos = async(req, res) =>{

    const id  = req.params.id;
    const uid = req.uid;

    try {

        const academia = await Recibo.findById( id );
        if(!academia){
            res.status(500).json({
                ok: false,
                msg: 'Recibo no encontrado'
                                })
                     }
                     
                     const cambiosRecibo = {
                        ...req.body,
                        usuario: uid
                     }

                const academiaActualizado = await Recibo.findByIdAndUpdate( id, cambiosRecibo,{new:true});

            // hospital.nombre = req.body.nombre;
                     
        
            res.json({
            ok: true,
            academia: academiaActualizado
        })
        



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const borrarRecibos = async(req, res) =>{
    
    const id  = req.params.id;

    try {

        const academia = await Recibo.findById( id );
        if(!academia){
            res.status(500).json({
                ok: false,
                msg: 'Recibo no encontrada'
                                })
                     }
                     
                    
                await Recibo.findByIdAndDelete (id);

                     
        
            res.json({
            ok: true,
            msg:'Recibo Eliminada'
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
    getRecibosPorId,
    getRecibos,
    crearRecibos,
    actualizarRecibos,
    borrarRecibos,
    getRecibosporPago
}