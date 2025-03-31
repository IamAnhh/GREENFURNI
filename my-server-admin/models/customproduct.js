const mongoose = require('mongoose');

const CustomproductSchema = new mongoose.Schema({
    Name: { type: String },
    Phonenumber: { type: String },
    Mail: { type: String },
    productName: { type: String },
    productDes: { type: String },
    productFile: { type: String }
});

const Customproduct = mongoose.model('customproduct', CustomproductSchema);
module.exports = Customproduct