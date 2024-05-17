const {Schema, model} = require('mongoose');

const ProgramasSchema = Schema({
    anio:{
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
    profesor: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Profesor'
    },
    materia: [{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Materia'
    }]
},  { collection: 'programas'});

ProgramasSchema.method('toJSON', function() {
    // const { __v, password, ...object } = this.toObject();
    const { __v, ...object} = this.toObject();
    return object;
})



module.exports = model( 'Programa', ProgramasSchema );
