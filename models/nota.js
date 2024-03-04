const {Schema, model} = require('mongoose');

const NotasSchema = Schema({
    valor:{
        type: Number,
        required: true
    },

    estudiante:{
        type: String,
        require: true
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
    },
    materia: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Materia'
    }
},  { collection: 'notas'});

NotasSchema.method('toJSON', function() {
    // const { __v, password, ...object } = this.toObject();
    const { __v, ...object} = this.toObject();
    return object;
})



module.exports = model( 'Nota', NotasSchema );
