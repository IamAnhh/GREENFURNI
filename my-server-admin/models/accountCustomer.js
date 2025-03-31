const mongoose = require('mongoose');

const AccountCustomerSchema = mongoose.Schema({
    nickname: {
        type: String,
        default: null,
    },
    Name: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    Mail: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    userid: {
        type: Number,
    },
    gender: {
        type: String,
        default: null,
    },
    dob: {
        type: String,
        default: null,
    },
    avatar: {
        type: String,
        default: null,
    },
    addresses: [{
        country: { type: String, default: 'Việt Nam' },
        postcodeZip: { type: String, default: '' },
        province: { type: String },
        district: { type: String },
        addressDetail: { type: String },
        isDefault: { type: Boolean, default: false },
    }, ],
});


const AccountCustomer = mongoose.model('accountCustomer', AccountCustomerSchema);

module.exports = AccountCustomer;
