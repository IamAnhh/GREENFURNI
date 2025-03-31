const express = require('express');
const router = express.Router();
const cors = require('cors');
const Customproduct = require('../models/customproduct')

// get all customproducts
router.get('/', cors(), async(req, res) => {
    try {
        const customproducts = await Customproduct.find();
        res.status(200).json(customproducts);
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error });
    }
});

// get discount by id
router.get('/:id', cors(), async(req, res) => {
    try {
        const id = req.params.id;
        const customproduct = await Customproduct.findOne({ _id: id });
        res.status(200).json(customproduct)
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error });
    }
});

// post
router.post('/', cors(), async(req, res) => {
    try {
        const customproduct = new Customproduct({
            Name: req.body.Name,
            Phonenumber: req.body.Phonenumber,
            Mail: req.body.Mail,
            productName: req.body.productName,
            productDes: req.body.productDes,
            productFile: req.body.productFile
        });
        const savedProduct = await customproduct.save()

        res.status(201).send(savedProduct)
    } catch (error) {
        res.status(500).send('the product was not created')
    }
});

module.exports = router;