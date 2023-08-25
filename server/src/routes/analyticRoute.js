const { getTotalUsers, getTopActiveUsers } = require("../controller/userCtrl");
const app = require("express").Router();

// Analytics Endpoints

// Route to retrieve the total number of users
app.get('/users', getTotalUsers);

// Route to retrieve the top active users based on post count
app.get('/users/top-active', getTopActiveUsers);

module.exports = app; 
