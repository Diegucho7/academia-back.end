const {Schema, model} = require('mongoose');

const PizarraSchema = Schema({
    periodo:{
        type: String,
        required: true
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
    }
},  { collection: 'pizarra'});

PizarraSchema.method('toJSON', function() {
    const { __v, password, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Pizarra', PizarraSchema);
