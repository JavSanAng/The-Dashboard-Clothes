require('dotenv').config();

const express = require ('express');
const app = express();

const { dbConnection } = require('./config/db');


dbConnection();

const port = process.env.PORT || 1234;

app.listen (port, () => {
    console.log (`Listening port http://localhost:${port}`)
})