const express = require('express');
const Discount = require('../models/discount');
const router = express.Router();
const cors = require('cors')

router.use(cors());

// get all discounts
router.get('/', cors(), async (req, res) =>{
    try {
        const discounts = await Discount.find();
        res.status(200).json(discounts);
    }
    catch(error){
        res.status(500).json({message:"An error occurred", error: error});
    }
});


// get discount by id
router.get('/:id',cors(), async(req,res)=>{
    try{
        const id = req.params.id;
        const discount = await Discount.findOne({_id: id});
        res.status(200).json(discount)
    }
    catch(error){
        res.status(500).json({message:"An error occurred", error: error});
    }
});


// create a new discount
router.post('/', cors(), async (req, res) =>{
    try{
        const discount = new Discount({
            code: req.body.code,
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            activate_date: req.body.activate_date,
            expired_date: req.body.expired_date,
            valuecode: req.body.valuecode,
            condition: req.body.condition,
            quantity: req.body.quantity,
            userids: req.body.userids
        });
        const savedDiscount = await discount.save();
        res.send(savedDiscount);
    }
    catch(error){
        res.status(500).send('the discount was not created');
    }
});


// delete a discount
router.delete('/:id', cors(), async (req, res) =>{
    try{
       const id=req.params.id
       let deletedDiscount = await Discount.deleteOne({_id:id});
       res.status(200).json(deletedDiscount)
    }
    catch(error){
    res.status(500).json({message:"An error occurred", error: error});
    }
})

// update the discount

router.put('/:id', cors(), async (req, res) =>{
    try{
        const id=req.params.id
        const discount = await Discount.findByIdAndUpdate(id, req.body, {new: true});
        res.send(discount);
    } catch(error){
        res.status(500).json({message:"An error occurred", error: error});
    }
});

module.exports = router;




