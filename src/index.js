require('dotenv').config();

const express = require ('express');
const app = express();
const methodOverride = require('method-override');
const router = require('../src/routes/productRoutes')
const { dbConnection } = require('./config/db');


dbConnection();

const port = process.env.PORT || 1234;

app.use(express.json()); 
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));
app.use('/', router);

app.listen (port, () => {
    console.log (`Listening port http://localhost:${port}`)
});

