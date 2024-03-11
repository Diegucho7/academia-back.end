const {Schema, model} = require('mongoose');

const EstudiantesSchema = Schema({
   
    img:{
        type: String
    },
    nombre:{
        type: String
    }
    ,
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
},  { collection: 'estudiantes'});

EstudiantesSchema.method('toJSON', function() {
    // const { __v, password, ...object } = this.toObject();
    const { __v, ...object} = this.toObject();
    return object;
})



module.exports = model( 'Estudiante', EstudiantesSchema );
