const app = require("express").Router();
const { createUser, getUserById, updateUser, deleteUser, getTotalUsers, getTopActiveUsers, getAllUsers } = require("../controller/userCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware")

// User Endpoints

// Route to get All users
app.get('/', authMiddleware, getAllUsers);

// Route to create a new user
app.post('/', createUser);

// Route to get a user by their ID
app.get('/:id', authMiddleware, getUserById);

// Route to update a user's information by their ID
app.put('/:id', updateUser);

// Route to delete a user by their ID
app.delete('/:id', deleteUser);


module.exports = app;  
