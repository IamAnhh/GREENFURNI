const mongoose = require('mongoose');
const DiscountSchema = mongoose.Schema(
    {
        code: { type: String},
        title: { type: String },
        description: { type: String },
        status: { type: String, enum: ['active', 'inactive'], default: 'active' },
        activate_date: { type: String },
        expired_date: { type: String },
        valuecode: { type: Number},
        condition: { type: Number},
        quantity: { type: Number },
        userids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        createAt: { type: Date, default: Date.now }
    }
);

const Discount = mongoose.model('discount', DiscountSchema);

module.exports = Discount;
