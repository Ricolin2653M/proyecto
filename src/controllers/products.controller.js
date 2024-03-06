import { response } from 'express';
import Product from '../models/Product'; 

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);  // Enviar el array de productos
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, price, category, imgURL } = req.body;
        const newProduct = new Product({ name, price, category, imgURL });
        const productSave = await newProduct.save();

        res.status(201).json({message: "producto guardado"});
        //res.status(201).json(productSave);  
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { name, price, category, imgURL } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, price, category, imgURL },
            { new: true } // Para obtener el producto actualizado
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(201).json({message: "Cambios aplicados al producto"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.productId;

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}