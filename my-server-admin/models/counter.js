const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Tên bộ đếm (ví dụ: 'ordernumber')
    value: { type: Number, default: 1000 }, // Giá trị bắt đầu
});

const Counter = mongoose.model('Counter', CounterSchema);

module.exports = Counter;