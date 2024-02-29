const mongoose = require('mongoose');

const dbConnection = async() => {
 
    try {
        //Codigo original - funcional
        await mongoose.connect(process.env.DB_CNN);

        //Codigo build
        // await mongoose.connect(process.env.DB_CNN,{
        //     dbName: process.env.MONGO_DB_NAME
        // });
 
        console.log('DB OnLine');
 
    } catch (error) {
 
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver Logs')
    }
 
}

module.exports = {
    dbConnection
}
// mongodb+srv://dvelarde:KYzgXFbyPlwmWikA@mongodb.z8yy9sp.mongodb.net/