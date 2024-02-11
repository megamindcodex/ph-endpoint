const express = require("express");
const router = express.Router();
const Product = require("../model/product");

// Get specific product details where deploy property is true from the database....route
router.get("/deployedProductDetail/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId });
    const productDeployed = product.deploy;
    if (productDeployed) {
      // console.log("Product found", product);
      res.status(200).json(product);
    }
    // else {
    //   console.log("Product not found");
    //   res.status(409).json({ message: "product not found" });
    // }
  } catch (err) {
    console.log("Error getting product:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Export router
module.exports = router;
