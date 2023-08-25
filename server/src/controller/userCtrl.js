const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");
const { generateToken } = require("../config/generateToken");


// Create a new user
const createUser = asyncHandler(async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            bio: req.body.bio
        });

        await newUser.save();
        const { _id, email } = newUser;
        const token = await generateToken(_id, email);
        res.status(201).send({ token, user: newUser });
    } catch (error) {
        throw new Error('Error creating user');
    }
});

// Retrieve a user by their ID
const getUserById = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new Error('User not found');
        }
        res.send(user);
    } catch (error) {
        throw new Error('Error retrieving user');
    }
});

// Update a user's information
const updateUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, bio: req.body.bio },
            { new: true }
        );
        if (!user) {
            throw new Error('User not found');
        }
        res.send(user);
    } catch (error) {
        throw new Error('Error updating user');
    }
});

// Delete a user by their ID
const deleteUser = asyncHandler(async (req, res) => {
    try {

        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            throw new Error('User not found');
        }
        res.send({ message: 'User deleted successfully' });
    } catch (error) {
        throw new Error('Error deleting user');
    }
});

// Get the total number of users
const getTotalUsers = asyncHandler(async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.send({ totalUsers });
    } catch (error) {
        throw new Error('Error retrieving total users');
    }
});

// Get the top active users based on post count
const getTopActiveUsers = asyncHandler(async (req, res) => {
    try {
        const topActiveUsers = await User.aggregate([
            { $lookup: { from: 'posts', localField: '_id', foreignField: 'user_id', as: 'posts' } },
            { $addFields: { postCount: { $size: '$posts' } } },
            { $sort: { postCount: -1 } },
            { $limit: 5 }
        ]);
        res.send(topActiveUsers);
    } catch (error) {
        throw new Error('Error retrieving top active users');
    }
});


module.exports = { createUser, getUserById, updateUser, deleteUser, getTotalUsers, getTopActiveUsers };
