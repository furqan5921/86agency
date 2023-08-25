const app = require("express").Router();
const { createUser, getUserById, updateUser, deleteUser, getTotalUsers, getTopActiveUsers } = require("../controller/userCtrl");



// Route to create a new user
app.post('/', createUser);

// Route to get a user by their ID
app.get('/:id', getUserById);

// Route to update a user's information by their ID
app.put('/:id', updateUser);

// Route to delete a user by their ID
app.delete('/:id', deleteUser);

module.exports = app;  
