const {Schema, model} = require('mongoose');

const ProfesoresSchema = Schema({
    estudiante:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    curso:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Curso'
    },
    modulos:[{
        required: true,
        type: Number,
        notas:[{
            required: true,
            type: Number
        }],
    }],
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
