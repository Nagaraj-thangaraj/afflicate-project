const express = require("express");
const Product = require("../models/Product");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const router = express.Router();

// Create Product
router.post("/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Products
// GET /api/products - Fetch paginated products
router.get("/products", async (req, res) => {
  try {
    // Extract page, limit, and genre from query parameters; set default values if not provided
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const genre = req.query.genre || ""; // Get genre from query parameters

    // Calculate the starting index for the current page
    const startIndex = (page - 1) * limit;

    // Build a filter object
    let filter = {};
    if (genre) {
      filter.productGenre = { $regex: new RegExp(genre, "i") }; // Case-insensitive regex match for genre
    }

    // Fetch the total number of products that match the filter
    const totalProducts = await Product.countDocuments(filter);

    // Fetch products with pagination and filtering
    const products = await Product.find(filter).skip(startIndex).limit(limit);

    // Send response with paginated products and additional pagination data
    res.json({
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Update Product
router.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const productData = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, productData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Delete Product
router.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
