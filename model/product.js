// import mongoose
// Define the product Schema field here
// Create and export the Product model Schema

// import mongoose
const mongoose = require("mongoose");

// Define the product Schema field here
const productSchema = new mongoose.Schema({
  deploy: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
  },
  tags: {
    type: Array,
    default: "stock",
  },
  productImageURL: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// create and export the product model schema
const Product = mongoose.model("Products", productSchema);
module.exports = Product;
