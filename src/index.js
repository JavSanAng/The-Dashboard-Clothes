require('dotenv').config();

const express = require ('express');
const app = express();
const router = require('../src/routes/productRoutes')
const { dbConnection } = require('./config/db');


dbConnection();

const port = process.env.PORT || 1234;

app.use('/', router);

app.listen (port, () => {
    console.log (`Listening port http://localhost:${port}`)
});

