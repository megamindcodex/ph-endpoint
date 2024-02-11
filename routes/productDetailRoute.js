const express = require("express");
const router = express.Router();
const Product = require("../model/product");

// Get specific product details from the database....route
router.get("/productDetail/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      // console.log("Product found", product);
      res.status(200).json(product);
    } else {
      console.log("Product not found");
      res.status(404).json({ message: "product not found" });
    }
  } catch (err) {
    console.log("Error getting product:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Export router
module.exports = router;
