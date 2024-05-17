const {Schema, model} = require('mongoose');

const ProfesoresSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    img:{
        type: String
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
    // materia: {
    //     required: true,
    //     type: Schema.Types.ObjectId,
    //     ref: 'Materia'
    // }
},  { collection: 'profesores'});

ProfesoresSchema.method('toJSON', function() {

    const { __v, ...object} = this.toObject();
    return object;
})



module.exports = model( 'Profesor', ProfesoresSchema );
