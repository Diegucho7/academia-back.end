const {Schema, model} = require('mongoose');

const ReciboSchema = Schema({
    valor:{
        type: Number,
        required: true
    },
    img:{
        type: String
    },
    usuario: {
        // required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    pago: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Pago'
    },

    aprobado:{
        type: Boolean,
        default: false
    }
    ,
    
    fecha: {
        type: Date,
        default: Date.now 
    },
//     referencia:{
//     type: String,
//     unique: true
// }
    // ,
    
},  { collection: 'recibos'});

ReciboSchema.method('toJSON', function() {
    const { __v, password, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Recibo', ReciboSchema );
