const {Schema, model} = require('mongoose');
const moment = require('moment');




const PizarrasSchema = Schema({
    periodo:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Periodo'
    },
    asunto:{
        type: String,
        required: true
    },
    tarea:{
        type: String,
        required: true
    },
 
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fecha: {
        type: Date,
        default: Date.now
        
    }
},  { collection: 'pizarras'});

PizarrasSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();  
    return object;
})



module.exports = model( 'Pizarra', PizarrasSchema);
