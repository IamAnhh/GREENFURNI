const express = require('express');
const router = express.Router();
const cors = require('cors');
const Blog = require('../models/blog');

// get blogs
router.get('/', cors(), async(req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "an error occurred", error: error });
    }
})

// get blog by id

router.get('/:id', cors(), async(req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findOne({ _id: id });
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json({ message: "an error occurred", error: error });
    }
});

// create blog

router.post('/', cors(), async(req, res) => {
    try {
        const blog = new Blog({
            title: req.body.title,
            date: req.body.date || new Date(), // Sử dụng ngày hiện tại nếu không có ngày
            author: req.body.author,
            content: req.body.content,
            thumbnail: req.body.thumbnail
        });
        const savedBlog = await blog.save();
        res.status(201).send(savedBlog); // Trả về mã 201 Created
    } catch (error) {
        console.error(error); // Log lỗi
        res.status(500).send('Internal Server Error');
    }
});

// delete
router.delete('/:id', cors(), async(req, res) => {
    try {
        const id = req.params.id;
        let deletedBlog = await Blog.deleteOne({ _id: id });
        res.status(200).json(deletedBlog)
    } catch (error) {
        res.status(500).json({ message: "an error occurred", error: error });
    }
});

// update the blog
router.put('/:id', cors(), async(req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        res.send(blog);
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error });
    }
});

module.exports = router;