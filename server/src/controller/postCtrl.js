const Post = require('../models/postModel');
const asyncHandler = require("express-async-handler");

// Create a new post
const createPost = asyncHandler(async (req, res) => {
    try {
        const newPost = new Post({
            user_id: req.user._id,
            content: req.body.content
        });
        await newPost.save();
        res.status(201).send(newPost);
    } catch (error) {
        throw new Error('Error creating post');
    }
});

// Get a post by ID
const getPostById = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            throw new Error('Post not found');
        }
        res.send(post);
    } catch (error) {
        throw new Error('Error retrieving post');
    }
});

// Update a post by ID
const updatePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { content: req.body.content },
            { new: true }
        );
        if (!post) {
            throw new Error('Post not found');
        }
        res.send(post);
    } catch (error) {
        throw new Error('Error updating post');
    }
});

// Delete a post by ID
const deletePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            throw new Error('Post not found');
        }
        res.send({ message: 'Post deleted successfully' });
    } catch (error) {
        throw new Error('Error deleting post');
    }
});

// Like a post by ID
const likePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (!post) {
            throw new Error('Post not found');
        }
        res.send(post);
    } catch (error) {
        throw new Error('Error liking post');
    }
});

// Unlike a post by ID
const unlikePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: -1 } },
            { new: true }
        );
        if (!post) {
            throw new Error('Post not found');
        }

        if (post.likes < 0) {
            post.likes = 0;
            await post.save();
        }
        res.send(post);
    } catch (error) {
        throw new Error('Error unliking post');
    }
});

// Get the total number of posts
const getTotalPosts = asyncHandler(async (req, res) => {
    try {
        const totalPosts = await Post.countDocuments();
        res.send({ totalPosts });
    } catch (error) {
        throw new Error('Error retrieving total posts');
    }
});

// Get the top liked posts
const getTopLikedPosts = asyncHandler(async (req, res) => {
    try {
        const topLikedPosts = await Post.find().sort({ likes: -1 }).limit(5);
        res.send(topLikedPosts);
    } catch (error) {
        throw new Error('Error retrieving top liked posts');
    }
});

module.exports = {
    createPost,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    getTotalPosts,
    getTopLikedPosts
};




