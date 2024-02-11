const express = require("express");
const router = express.Router();
const Product = require("../model/product");

// Get all Products that deploy property is equal to "ture" from the database....route
router.get("/productsByCategory", async (req, res) => {
  try {
    const categoryName = req.query.categoryName;
    console.log(categoryName);
    const products = await Product.find({
      deploy: true,
      category: { $regex: new RegExp(categoryName, "i") },
    });
    if (products) {
      res.status(200).json(products);
      // console.log("All Product found", products);
    }
  } catch (err) {
    console.log("Failed to get all products:", err, err.message);
    res.status(500).json({ error: "Failed to get products" });
  }
});

// Export router
module.exports = router;
