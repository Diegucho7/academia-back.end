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
    }
},  { collection: 'academias'});

MateriasSchema.method('toJSON', function() {
    const { __v, password, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Academia', AcademiaSchema );
