require('dotenv').config();

const mongoose = require ('mongoose');

const dbConnection = async ()=>{
    try {
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conection with database done');
    } catch (error) {
        console.error('Error with the conection of the database');
        throw new Error ('Error initializing the database');
    }
};

module.exports = {
    dbConnection,
};