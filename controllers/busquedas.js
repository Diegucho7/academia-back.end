// getTodo
const { response } = require ('express');
const Usuario = require('../models/usuario');
const Profesores = require('../models/profesor');
const Academia = require('../models/academia');
const Estudiante = require('../models/estudiante');
const Periodos = require('../models/periodo');
const Pizarras = require('../models/pizarra');

const getTodo = async (req, res = response) =>{
    
    const busqueda = req.params.busqueda;
    const regex = new RegExp (busqueda, 'i');


    const [usuarios, profesores, academias,estudiantes] = await Promise.all([
              Usuario.find({nombre: regex }),
             Profesores.find({nombre: regex }),
              Academia.find({nombre: regex }),
            //   Estudiante.find({usuario: regex })
              Estudiante.find({usuario: busqueda })
])

    res.json({
        ok: true,
        usuarios,
        profesores,
        academias,
        estudiantes
    })

}


const getDocumentoColeccion = async (req, res = response) =>{
    
    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp (busqueda, 'i');



    let data = [];

    switch (tabla) {
                
                case 'academias':
                data = await Academia.find({nombre: regex })
                                    .populate('usuario','nombre img')
                
            
            break;
                case 'usuarios':
                data = await Usuario.find({
                    $or: [{nombre: regex}, {apellido: regex}, {cedula: regex}],
                    });
               

            break;
               
                case 'estudiantes':
                data = await Estudiante.find({usuario:busqueda})
                                       .populate('usuario','nombre apellido ')
                                        .populate('curso',' ')
                                        .populate({
                                            path: 'curso',
                                            populate: { path: 'curso', 'select': 'nombre' }
                                        })
                                       .populate({
                                            path: 'curso',
                                            populate: { path: 'academia', 'select': 'nombre' }
                                        })
               
                break;
                case 'estudiantesCedula':
                    try {
                        
                        data = await Estudiante.findById({usuario:busqueda})
                                               .populate('usuario','nombre apellido ')
                                                .populate('curso',' ')
                                                .populate({
                                                    path: 'curso',
                                                    populate: { path: 'curso', 'select': 'nombre' }
                                                })
                                               .populate({
                                                    path: 'curso',
                                                    populate: { path: 'academia', 'select': 'nombre' }
                                                })
                       
                        break;
                    } catch (error) {
                        console.log(error)
                    }

                case 'profesores':
                    // Profesores.find({rol: busqueda });
                    data = await Periodos.find({profesor: busqueda })
                                                .populate('curso',' ')
                                                // .populate({
                                                //     path: 'curso',
                                                //     populate: { path: 'curso', 'select': 'nombre' }
                                                // })
                                                // .populate({
                                                //     path: 'curso',
                                                //     populate: { path: 'academia', 'select': 'nombre' }
                                                // })
                                        // .populate('usuario','nombre img')
                                        // .populate('academia','nombre img')
                
                break;

                case 'notas':

                data = await Estudiante.find({curso:busqueda})
                                       .populate('usuario','nombre apellido ')
                                        .populate('curso',' ')
                                        .populate('modulos',' ')
                                        .populate({
                                            path: 'curso',
                                            populate: { path: 'curso', 'select': 'nombre' }
                                        })
                                       .populate({
                                            path: 'curso',
                                            populate: { path: 'academia', 'select': 'nombre' }
                                        })
               
                break;
                
                // case 'notas':

                // data = await Estudiante.find({curso:busqueda})
                //                        .populate('usuario','nombre apellido ')
                //                         .populate('curso',' ')
                //                         .populate('modulos',' ')
                //                         .populate({
                //                             path: 'curso',
                //                             populate: { path: 'curso', 'select': 'nombre' }
                //                         })
                //                        .populate({
                //                             path: 'curso',
                //                             populate: { path: 'academia', 'select': 'nombre' }
                //                         })
               
                // break;


                case 'periodoTareas':

                data = await Pizarras.find({periodo:busqueda})
                                    //    .populate('usuario','nombre apellido ')
                                        // .populate('usuario',' ')
                                    //     .populate('modulos',' ')
                                        .populate({
                                            path: 'periodo',
                                             populate:{ path: 'curso', 'select': 'nombre' } ,                                           // .populate('anio','nombre  ')
                                            //  populate:{ path: 'profesor', 'select': 'nombre' }                                            // .populate('anio','nombre  ')
                                            
                                        })
                                        .populate({
                                            path: 'periodo',
                                             populate:{ 
                                                path: 'profesor',
                                                 'select': 'nombre apellido ' 
                                                },                                     
                                        })
                                    //    .populate({
                                    //         path: 'curso',
                                    //         populate: { path: 'academia', 'select': 'nombre' }
                                    //     })
               
                break;
                case 'periodos':

                data = await Periodos.findById({_id:busqueda})
                                    //    .populate('usuario','nombre apellido ')
                                        .populate('curso',' ')
                                    //     .populate('modulos',' ')
                                    //     .populate({
                                    //         path: 'curso',
                                    //         populate: { path: 'curso', 'select': 'nombre' }
                                    //     })
                                    //    .populate({
                                    //         path: 'curso',
                                    //         populate: { path: 'academia', 'select': 'nombre' }
                                    //     })
               
                break;
               
    
        default:
                return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que contener un valor valido'
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