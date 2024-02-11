const express = require("express");
const router = express.Router();
const Product = require("../model/product");

// Delete product from the database by Id....route
router.post("/deleteProduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await Product.findByIdAndDelete(productId);
    res.status(200).json(result);
  } catch (err) {
    console.error("Failed to delete product", err.message);
  }
});

// Export router
module.exports = router;
