const {Schema, model} = require('mongoose');

const PagosSchema = Schema({
   
    img:
    [{
        required: false,
        type: String,
        img:[{
            required: false,
            type: String
        }]
    }],
    
    usuario: {
        required: false,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    
    estudiante: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    periodo: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Periodo'
        
    },
    modulos:[{
        required: true,
        type: Number,
        modulos:[{
            required: true,
            type: Number
        }]
    }],
    estado:{
        default: false,
        required: true,
        type: Boolean
    }

   
  
    
},  { collection: 'pagos'});

PagosSchema.method('toJSON', function() {
    // const { __v, password, ...object } = this.toObject();
    const { __v, ...object} = this.toObject();
    return object;
})



module.exports = model( 'Pago', PagosSchema );
