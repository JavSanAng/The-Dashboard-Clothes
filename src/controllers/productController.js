const Product = require('../models/Product');


const showProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const productsHtml = products.map(product => `
            <li>
                <h2>${product.nombre}</h2>
                <p>${product.Descripcion}</p>
                <img src="${product.Imagen}" alt="${product.nombre}">
                <p>Categoría: ${product.Categoria}</p>
                <p>Talla: ${product.Talla}</p>
            </li>`).join('');

        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Products</title>
            </head>
            <body>
                <h1>List of Products</h1>
                <ul>
                    ${productsHtml}
                </ul>
            </body>
            </html>
        `;
        res.status(200).send(html);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: 'There was a problem viewing all products' });
    }
};

const showProductById = async (req, res) => {
    try {
        const id = req.params.productId;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Product by Id</title>
            </head>
            <body>
                <h1>Product Details</h1>
                <div>
                    <h2>${product.nombre}</h2>
                    <p>${product.Descripcion}</p>
                    <img src="${product.Imagen}" alt="${product.nombre}">
                    <p>Categoría: ${product.Categoria}</p>
                    <p>Talla: ${product.Talla}</p>
                </div>
            </body>
            </html>
        `;
        res.status(200).send(html);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: 'There was a problem viewing the product' });
    }
};

const showNewProduct = async (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Product</title>
    </head>
    <body>
        <h1>Add New Product</h1>
        <form action="/products" method="POST">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
            <label for="Descripcion">Descripción:</label>
            <textarea id="Descripcion" name="Descripcion" required></textarea>
            <label for="Imagen">Imagen URL:</label>
            <input type="text" id="Imagen" name="Imagen" required>
            <label for="Categoria">Categoría:</label>
            <select id="Categoria" name="Categoria" required>
                <option value="Camisetas">Camisetas</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Zapatos">Zapatos</option>
                <option value="Accesorios">Accesorios</option>
            </select>
            <label for="Talla">Talla:</label>
            <select id="Talla" name="Talla" required>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>
            <button type="submit">Add Product</button>
        </form>
    </body>
    </html>
    `);
};

const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.redirect('/dashboard'); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'There was a problem creating the new product' });
    }
};

const showEditProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Update Product</title>
        </head>
        <body>
            <h1>Update Product</h1>
            <form action="/dashboard/${product._id}" method="POST">
                <input type="hidden" name="_method" value="PUT">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value="${product.nombre}" required>
                <label for="Descripcion">Descripción:</label>
                <textarea id="Descripcion" name="Descripcion" required>${product.Descripcion}</textarea>
                <label for="Imagen">Imagen URL:</label>
                <input type="text" id="Imagen" name="Imagen" value="${product.Imagen}" required>
            <label for="Categoria">Categoría:</label>
            <select id="Categoria" name="Categoria" required>
                <option value="Camisetas">Camisetas</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Zapatos">Zapatos</option>
                <option value="Accesorios">Accesorios</option>
            </select>
            <label for="Talla">Talla:</label>
            <select id="Talla" name="Talla" required>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>
            <button type="submit">Update Product</button>
        </form>
    </body>
    </html>
    `);
    }catch (error){
        res.status(500).send ("Error updating product")
    }
    };

    const updateProduct = async (req, res) => {
        try {
            await Product.findByIdAndUpdate(req.params.productId, req.body);
            res.redirect('/dashboard'); 
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem updating the product' });
        }
    };


    const deleteProduct = async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.productId);
            res.redirect('/dashboard'); 
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem deleting the product' });
        }
    };

    module.exports = {
        showProducts,
        showProductById,
        showNewProduct,
        createProduct,
        showEditProduct,
        updateProduct,
        deleteProduct
    }