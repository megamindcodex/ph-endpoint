const express = require("express");
const router = express.Router();
const Product = require("../model/product");

// check if the product is alredy deployed or not
router.get("/checkDeploy/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    console.log(product.deploy);
    res.status(200).json(product.deploy);
  } catch (err) {
    console.error("Failed to check product deploy value", err.message);
  }
});

// Export router
module.exports = router;
