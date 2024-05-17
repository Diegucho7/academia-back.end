const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true

    },
    cedula:{
        type: String,
        required: true,
        unique: true
    },
    telefono:{
        type: String,
        required: true,
      
    },
    password:{
        type: String,
        required: true
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    estado:{
        type: Boolean,
        required: true,
        default: '0'
    },
    
    academia:{
        type: Schema.Types.ObjectId,
        ref: 'Academia',
        default: '664044122c736e2dc56eaaf9',
        required: true
    },
    google:{
        type: Boolean,
        default: false
    },
});

UsuarioSchema.method('toJSON', function() {
    const { __v, _id,password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model( 'Usuario', UsuarioSchema );
