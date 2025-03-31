const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: { type: String },
    date: { type: Date, default: Date.now },
    author: { type: String },
    content: { type: String },
    thumbnail: { type: String }
});

const Blog = mongoose.model('blog', BlogSchema);
module.exports = Blog;
