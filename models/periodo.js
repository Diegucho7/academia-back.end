const {Schema, model} = require('mongoose');

const PeriodosSchema = Schema({
    anio:{
        type: String,
        required: true
    },
    mes:{
        type: String,
        required: true
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    academia: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Academia'
    },
    curso: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Curso'
    },
    profesor: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    modulos: {
        required: true,
        type: Number,
    },
    valor: {
        required: true,
        type: Number,
    }
},  { collection: 'periodos'});

PeriodosSchema.method('toJSON', function() {
    // const { __v, password, ...object } = this.toObject();
    const { __v, ...object} = this.toObject();  
    return object;
})



module.exports = model( 'Periodo', PeriodosSchema );
