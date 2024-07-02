const {Schema, model} = require('mongoose');

const NotasSchema = Schema({
    
    usuario: {
        required: false,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

    estudiante:{
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
   
    periodo: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Periodo'
    },
    modulos:[{
        required: true,
        type: Number,
        modulos:[{
            required: true,
            type: Number
        }],
       
        
    }],
},  { collection: 'notas'});

NotasSchema.method('toJSON', function() {
    // const { __v, password, ...object } = this.toObject();
    const { __v, ...object} = this.toObject();
    return object;
})



module.exports = model( 'Nota', NotasSchema );
