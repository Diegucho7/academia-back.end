const {Schema, model} = require('mongoose');

const MateriasSchema = Schema({
    nombre:{
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
    curso: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Curso'
    }
},  { collection: 'materias'});

MateriasSchema.method('toJSON', function() {
    // const { __v, password, ...object } = this.toObject();
    const { __v, ...object} = this.toObject();
    return object;
})



module.exports = model( 'Profesor', ProfesoresSchema );
