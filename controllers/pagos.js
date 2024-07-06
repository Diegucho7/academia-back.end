const {response} = require('express');
const  bcrypt  = require ('bcryptjs');
const {generarJwt} = require('../helpers/jwt')

const Pago = require('../models/pago');

const getPagos = async (req, res) =>{
    
   
try {

    const pagos = await Pago.find()
                                    .populate('estudiante','nombre apellido')
                                    .populate('periodo', 'mes anio curso')
                                    .populate({path: 'periodo', 
                                        populate: { path: 'curso', 'select': 'nombre' }})
                                    .populate({
                                        path: 'periodo',
                                        
                                        populate: { path: 'academia', 'select': 'nombre' }
                                     });                               
                            
    res.json({
        ok: true,
        pagos
    })


}catch (error) {
    
}
}


const getPagoById  = async (req, res) =>{

    const id = req.params.id;

    
    try {
        const pago = await Pago.findById(id)
                                            .populate('estudiante','nombre apellido')
                                            .populate('periodo', 'mes anio curso')
                                            .populate({path: 'periodo', 
                                                populate: { path: 'curso', 'select': 'nombre' }})
                                            .populate({
                                                path: 'periodo',
                                                
                                                populate: { path: 'academia', 'select': 'nombre' }
                                            });                  
            res.json({
            ok: true,
            pago
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Hable con el administrador, nota no encontrada',
        })
        }

}

const crearPagos = async (req, res) =>{
    const uid =  req.uid;
    const pago = new Pago({
        usuario:uid,
        ...req.body
    });
    

    try {

        const pagoDB = await pago.save();

        res.json({
            ok: true,
            pago: pagoDB
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}


const actualizarPagos = async(req, res) =>{
    const id  = req.params.id;
    const uid = req.uid;

    try {

        const pago = await Pago.findById( id );
        if(!pago){
            res.status(500).json({
                ok: false,
                msg: 'Pago no encontrada'
                                })
                     }
                     
                     const cambiosPago = {
                        ...req.body,
                        usuario: uid
                     }

                const pagoActualizado = await Pago.findByIdAndUpdate( id, cambiosPago,{new:true});

            // hospital.nombre = req.body.nombre;
                     
        
            res.json({
            ok: true,
            Pago: pagoActualizado
        })
        



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const borrarPagos = async(req, res) =>{

    const id  = req.params.id;

    try {

        const nota = await Pago.findById( id );
        if(!nota){
            res.status(500).json({
                ok: false,
                msg: 'Pago no encontrado'
                                })
                     }
                     
                    
                await Pago.findByIdAndDelete (id);

                     
        
            res.json({
            ok: true,
            msg:'Pago Eliminado'
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
    getPagos,
    crearPagos,
    actualizarPagos,
    borrarPagos,
    getPagoById
}