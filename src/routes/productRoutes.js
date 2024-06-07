const express = require('express')
const router = express.Router();
const Product = require('../models/Product')

router.get('/products', async(req,res)=>{
    try{
        const products = await Product.find();
        res.status(200).json(tasks);
    }catch (error){
        console.error(error);
        res 
            .status(500)
            .send({message:'There was a problem to view all products'})
    }
});

router.get('/products/:productId', async(req,res)=>{
    const id = req.params._id;
    try{
        const productId = await Product.findById(id);
        if (!productId){
            return res.status(404).json({message: 'Product not found'});
        }
        console.log(productId);
        res.status(200).json(productId);
    } catch (error){
        console.error(error);
        res.status(500).json({message: 'There was a problem retrieving the product'});
    }
})

router.post ('')