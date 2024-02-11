const express = require("express");
const router = express.Router();
const Product = require("../model/product");

// Get all products from the database....route
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    if (products) {
      res.status(200).json(products);
      // console.log("All Product found", products);
    }
  } catch (err) {
    console.log("Failed to get products:", err.message);
  }
});

// Export router
module.exports = router;
