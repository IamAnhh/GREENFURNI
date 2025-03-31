const express = require('express');
const Product = require('../models/product');
const router = express.Router();
const cors = require('cors');

// get all products
router.get('/', cors(), async (req, res) => {
    try{
        const products = await Product.find();
        res.status(200).json(products);
    } catch(error){
        res.status(500).json({message: "An error occured", error: error});
    }
});

// get product by id
router.get('/:id', cors(), async (req, res) => {
    try{
        const id = req.params.id;
        const product = await Product.findOne({_id: id});
        res.status(200).json(product)
    } catch (error){
        res.status(500).json({message: "An error occured", error: error});
    }
});

// Create a new product
router.post('/', cors(), async (req, res) => {
    try{
        const product = new Product({
            category1: req.body.category1,
            category2: req.body.category2,
            name: req.body.name,
            cost_of_capital: req.body.cost_of_capital,
            price: req.body.price,
            oldprice: req.body.oldprice,
            description: req.body.description,
            rating: req.body.rating,
            img: req.body.img,
            quantity: req.body.quantity,
            sold_quantity: req.body.sold_quantity,
            ask1: req.body.ask1,
            answer1: req.body.answer1,
            ask2: req.body.ask2,
            answer2: req.body.answer2,
            provider: req.body.provider,
            origin: req.body.origin,
            stock_status: req.body.stock_status, 
        });

        const savedProduct = await product.save();
        res.send(savedProduct);
    } catch (error){
        res.status(500).send('the product was not created');
    }
});

// Delete product
router.delete('/:id', cors(),async(req,res) =>{
    try{
        const id = req.params.id;
        const deletedProduct = await Product.deleteOne({_id: id});
        res.status(200).json(deletedProduct)
    } catch (error){
        res.status(500).json({message: "An error occured", error: error});
    }
})

// Update a product
router.put('/:id', cors(), async (req, res) => {
    try{
        const id = req.params.id;
        const product = await Product.findByIdAndUpdate(id, req.body, {new: true});
        res.send(product);
    } catch (error){
        res.status(500).json({message:"An error occurred", error: error});
    }
});

// save
router.post('/save', async (req, res) => {
    try {
        const products = req.body; // Danh sách sản phẩm gửi từ client

        if (!Array.isArray(products)) {
            return res.status(400).json({ error: 'Dữ liệu không hợp lệ, cần một mảng sản phẩm.' });
        }

        // Dùng `insertMany` để lưu nhiều sản phẩm cùng lúc
        const savedProducts = await Product.insertMany(products);

        res.status(201).json({ message: 'Dữ liệu đã được lưu thành công', savedProducts });
    } catch (error) {
        console.error('Lỗi khi lưu sản phẩm:', error);
        res.status(500).json({ error: 'Lỗi máy chủ, không thể lưu sản phẩm.' });
    }
});

module.exports = router;

