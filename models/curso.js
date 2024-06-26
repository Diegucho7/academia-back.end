const {Schema, model} = require('mongoose');

const CursosSchema = Schema({
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
    }
},  { collection: 'cursos'});

CursosSchema.method('toJSON', function() {
    const { __v, password, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Curso', CursosSchema);
