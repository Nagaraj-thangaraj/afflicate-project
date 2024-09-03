const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productPrice: { type: String, required: true },
  productGenre: { type: String, required: true },
  productUrl: { type: String, required: true },
  productDescription: { type: String, required: true },
  productLink: { type: String, required: true },
});

module.exports = mongoose.model("Product", ProductSchema);
