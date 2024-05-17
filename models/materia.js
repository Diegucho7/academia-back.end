const {Schema, model} = require('mongoose');

const MateriasSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    img:{
        type: String
    },
    curso: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Curso'
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
    
},  { collection: 'materias'});

MateriasSchema.method('toJSON', function() {
    // const { __v, password, ...object } = this.toObject();
    const { __v, ...object} = this.toObject();
    return object;
})



module.exports = model( 'Materia', MateriasSchema );
