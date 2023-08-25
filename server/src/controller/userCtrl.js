// Import required modules and middleware
const User = require("../models/userModel");  // Import the User model
const asyncHandler = require("express-async-handler");  // Middleware for handling async operations
const argon2 = require("argon2");  // Password hashing library
const jwt = require("jsonwebtoken");  // JSON Web Token library
const validateMongodbId = require("../utils/validateMongodbId");  // Middleware to validate MongoDB IDs
const { generateToken } = require("../config/generateToken");  // Function to generate access tokens
const { generateRefreshToken } = require("../config/refreshToken");  // Function to generate refresh tokens

// Create a new user
const createUser = asyncHandler(async (req, res) => {
    try {
        // Create a new user instance
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            bio: req.body.bio
        });
        // Save the new user to the database
        await newUser.save();
        // Generate an access token for the newly created user
        const { _id, email } = newUser;
        const token = await generateToken(_id, email);
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// Retrieve a user by their ID
const getUserById = asyncHandler(async (req, res) => {
    try {
        // Find the user by ID in the database
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
});

// Update a user's information
const updateUser = asyncHandler(async (req, res) => {
    try {
        // Update the user's information based on their ID
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, bio: req.body.bio },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});

// Delete a user by their ID
const deleteUser = asyncHandler(async (req, res) => {
    try {
        // Delete the user from the database
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

// Get the total number of users
const getTotalUsers = asyncHandler(async (req, res) => {
    try {
        // Count the total number of users in the database
        const totalUsers = await User.countDocuments();
        res.json({ totalUsers });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving total users', error: error.message });
    }
});

// Get the top active users based on post count
const getTopActiveUsers = asyncHandler(async (req, res) => {
    try {
        // Aggregate to find the top active users
        const topActiveUsers = await User.aggregate([
            { $lookup: { from: 'posts', localField: '_id', foreignField: 'user_id', as: 'posts' } },
            { $addFields: { postCount: { $size: '$posts' } } },
            { $sort: { postCount: -1 } },
            { $limit: 5 }
        ]);
        res.json(topActiveUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving top active users', error: error.message });
    }
});


module.exports = { createUser, getUserById, updateUser, deleteUser, getTotalUsers, getTopActiveUsers };
