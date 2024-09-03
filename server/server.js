const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

// Load environment variables from .env file
require("dotenv").config();

const app = express();

// Middleware setup
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow these HTTP methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow these headers

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Send 200 OK for OPTIONS requests
  }

  next();
});

app.use(express.json());
app.use("/api", productRoutes);

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Check if MONGODB_URI is defined
if (!MONGODB_URI) {
  console.error("MongoDB URI is not defined in the environment variables.");
  process.exit(1); // Exit the application if MONGODB_URI is not set
}

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the application if the connection fails
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
