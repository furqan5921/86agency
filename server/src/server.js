// Load environment variables from .env file
require("dotenv").config();

// Import required modules
const express = require("express");
const cors = require("cors");

// Set the port number
const PORT = process.env.PORT || 8080;

// Import the database connection function
const connection = require("./config/DBconnect");

// Import user and post routers
const userRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRoute");
const analyticsRouter = require("./routes/analyticRoute")
const { notFound, errorHandler } = require("./middlewares/errorHanler");

// Create an instance of Express
const app = express();

// Enable CORS for cross-origin requests
app.use(cors());

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes for user and post operations
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/analytics", analyticsRouter)

// Handle not found and error middleware
app.use(notFound);
app.use(errorHandler);

// Connect to the database
connection();

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});
