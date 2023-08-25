const { getTotalPosts, getTopLikedPosts } = require("../controller/postCtrl");
const { getTotalUsers, getTopActiveUsers } = require("../controller/userCtrl");


const app = require("express").Router();

// Analytics Endpoints

// Route to retrieve the total number of users
app.get('/users', getTotalUsers);

// Route to retrieve the top active users based on post count
app.get('/users/top-active', getTopActiveUsers);

// Route to retrieve the total number of posts
app.get('/posts', getTotalPosts);

// Route to retrieve the top liked posts
app.get('/posts/top-liked', getTopLikedPosts);


module.exports = app;

