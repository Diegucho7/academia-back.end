// getTodo
const { response } = require ('express');
const Usuario = require('../models/usuario');
const Profesores = require('../models/profesor');
const Academia = require('../models/academia');

const getTodo = async (req, res = response) =>{
    
    const busqueda = req.params.busqueda;
    const regex = new RegExp (busqueda, 'i');


    const [usuarios, profesores, academias] = await Promise.all([
              Usuario.find({nombre: regex }),
             Profesores.find({nombre: regex }),
              Academia.find({nombre: regex })
])

    res.json({
        ok: true,
        usuarios,
        profesores,
        academias
    })

}


const getDocumentoColeccion = async (req, res = response) =>{
    
    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp (busqueda, 'i');



    let data = [];

    switch (tabla) {
                case 'profesores':
                Profesores.find({nombre: regex });
                data = await Medicos.find({nombre: regex })
                                    .populate('usuario','nombre img')
                                    .populate('academia','nombre img')
            
            break;
                case 'academias':
                data = await Academia.find({nombre: regex })
                                    .populate('usuario','nombre img')
                
            
            break;
                case 'usuarios':
                data = await Usuario.find({nombre: regex });
               
                break;
    
        default:
                return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que contener usuarios/profesores/academias'
            });

                  }



                  res.json({
                    ok:true,
                    resultados: data
                    })
    

}




module.exports = {
    getTodo,
    getDocumentoColeccion
}