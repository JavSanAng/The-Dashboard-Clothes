const Product = require('../models/Product')

const showProduct = async(req,res)=>{
        const products = await Product.find();
        res.status(200).send(products);
    }
    
const showProductById = async(req,res)=>{
    const id = req.params.productId
    const product = await Product.findById(id);
    if (!product){
        return res.status(404).json({message: 'Product not found'});
    }
    res.status(200).send(product);
    }

const showNewProduct = async (req,res) =>{
    res.send('<form></form>')
}