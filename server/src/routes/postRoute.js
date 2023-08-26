
const { createPost, getPostById, updatePost, deletePost, likePost, unlikePost, getAllPosts } = require("../controller/postCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const app = require("express").Router();

// Post Endpoints

// Route to get all posts
app.get('/', authMiddleware, getAllPosts);

// Route to create a new post
app.post('/', authMiddleware, createPost);

// Route to retrieve a post by ID
app.get('/:id', authMiddleware, getPostById);

// Route to update a post by ID
app.put('/:id', authMiddleware, updatePost);

// Route to delete a post by ID
app.delete('/:id', authMiddleware, deletePost);

// Route to like a post by ID
app.post('/:id/like', authMiddleware, likePost);

// Route to unlike a post by ID
app.post('/:id/unlike', authMiddleware, unlikePost);


module.exports = app;
