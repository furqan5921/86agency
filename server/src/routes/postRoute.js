
const { createPost, getPostById, updatePost, deletePost, likePost, unlikePost } = require("../controller/postCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const app = require("express").Router();

// Post Endpoints

// Route to create a new post
app.post('/',authMiddleware ,createPost);

// Route to retrieve a post by ID
app.get('/:id', getPostById);

// Route to update a post by ID
app.put('/:id', updatePost);

// Route to delete a post by ID
app.delete('/:id', deletePost);

// Route to like a post by ID
app.post('/:id/like', likePost);

// Route to unlike a post by ID
app.post('/:id/unlike', unlikePost);


module.exports = app;
