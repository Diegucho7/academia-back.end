const {Schema, model} = require('mongoose');

const NotasSchema = Schema({
    

    estudiante:{
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    profesor: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
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
    modulos:[{
        required: true,
        type: Number,
        
    }],
},  { collection: 'notas'});

NotasSchema.method('toJSON', function() {
    // const { __v, password, ...object } = this.toObject();
    const { __v, ...object} = this.toObject();
    return object;
})



module.exports = model( 'Nota', NotasSchema );
