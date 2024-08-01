const fs = require('fs');

const Usuario = require('../models/usuario');
const Academia = require('../models/academia');
const Profesor = require('../models/profesor');
const Curso = require('../models/curso');
const Materia = require('../models/materia');
const Estudiante = require('../models/estudiante');
const Pago = require('../models/pago');
const Recibo = require('../models/recibo');

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';
    
    switch( tipo ) {
        case 'recibos':
            const recibo = await Recibo.findById(id);
            if ( !recibo ) {
                console.log('No es un médico por id');
                return false;
            }

            pathViejo = `./uploads/recibos/${ recibo.img }`;
            borrarImagen( pathViejo );

            recibo.img = nombreArchivo;
            await recibo.save();
            return true;

        break;
        
        case 'academias':
            const academia = await Academia.findById(id);
            if ( !academia ) {
                console.log('No es un academia por id');
                return false;
            }

            pathViejo = `./uploads/academias/${ academia.img }`;
            borrarImagen( pathViejo );

            academia.img = nombreArchivo;
            await academia.save();
            return true;

        break;
        
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        break;
    }


}



module.exports = { 
    actualizarImagen
}
