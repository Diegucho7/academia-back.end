const {Schema, model} = require('mongoose');

const EstudiantesSchema = Schema({
   
    // img:{
    //     type: String
    // },
    
    
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    curso: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Periodo'
        
    },


    // prueba de unión

    modulos:[{
        default:[0],
        required: true,
        type: Number,
        modulos:[{
            
            required: true,
            type: Number,
            
        }]
    }],
    estado:{
        default: false,
        required: true,
        type: Boolean
    },
    aprobado:{
        default: false,
        required: true,
        type: Boolean
    },
    // pagos:[{
        
    //     required: true,
    //     type: Number,
    //     pagos:[{
            
    //         required: true,
    //         type: Number,
            
    //     }]
    // }],
    pagos: {
        type: Array,
        default: [0],
        required: true,
        items: {
            type: Number,
            required: true
        }
    }
    
},  { collection: 'estudiantes'});

EstudiantesSchema.method('toJSON', function() {
    // const { __v, password, ...object } = this.toObject();
    const { __v, ...object} = this.toObject();
    return object;
})



module.exports = model( 'Estudiante', EstudiantesSchema );
