const fs = require('fs')
const { model } = require("mongoose");
const Usuario = require('../models/usuario');
const Academia = require('../models/academia');
const Profesor = require('../models/profesor');
const Curso = require('../models/curso');
const Materia = require('../models/materia');
// const hospital = require('../models/hospital');

let pathViejo = '';
const borarImagen = (path) =>{
    
    
    // const pathViejo = `./uploads/medicos/${medico.img}`;
            if(fs.existsSync(path)){
                //borrar la imagen anterior
                fs.unlinkSync(path);
            }
}

const actualizarImagen = async(tipo, id, nombreArchivo) =>{


    switch (tipo) {
        case 'profesores':
            const profesor = await Profesor.findById(id);
            if(!profesor){
                console.log('No es un profesor por id');
                return false;
            }            
             pathViejo = `./uploads/profesores/${profesor.img}`;
            
            borarImagen(pathViejo);

            profesor.img = nombreArchivo;
            await profesor.save();
            return true;

            break;
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if(!usuario){
                console.log('No es un usuario por id');
                return false;
            }        

             pathViejo = `./uploads/usuario/${usuario.img}`;
            
            borarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;

        case 'academias':
            const academia = await Academia.findById(id);
            if(!academia){
                console.log('No es un academia por id');
                return false;
            }        

             pathViejo = `./uploads/academia/${academia.img}`;
            
            borarImagen(pathViejo);

            academia.img = nombreArchivo;
            await academia.save();
            return true;
            break;

        case 'cursos':
            const curso = await Curso.findById(id);
            if(!curso){
                console.log('No es un curso por id');
                return false;
            }        

             pathViejo = `./uploads/curso/${curso.img}`;
            
            borarImagen(pathViejo);

            curso.img = nombreArchivo;
            await curso.save();
            return true;
            break;

        case 'materias':
            const materia = await Materia.findById(id);
            if(!materia){
                console.log('No es un materia por id');
                return false;
            }        

             pathViejo = `./uploads/materia/${materia.img}`;
            
            borarImagen(pathViejo);

            materia.img = nombreArchivo;
            await materia.save();
            return true;
            break;
    
        default:
            break;
    }


}






module.exports = {
    actualizarImagen
}