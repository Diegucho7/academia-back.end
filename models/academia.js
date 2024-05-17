const {Schema, model} = require('mongoose');

const AcademiaSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    img:{
        type: String
    },
    usuario: {
        // required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
},  { collection: 'academias'});

AcademiaSchema.method('toJSON', function() {
    const { __v, password, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Academia', AcademiaSchema );
