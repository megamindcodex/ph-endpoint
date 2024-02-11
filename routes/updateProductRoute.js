const express = require("express");
const router = express.Router();
const Product = require("../model/product");

// Update product from the database by Id....route
router.put("/updateProduct/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const productToUpdate = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      productToUpdate,
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update product", message: err.message });
  }
});

// Export router
module.exports = router;
