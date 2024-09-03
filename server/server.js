const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*", // Adjust this as needed
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MongoDB URI is not defined in the environment variables.");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });
app.use("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
