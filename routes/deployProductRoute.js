const express = require("express");
const router = express.Router();
const Product = require("../model/product");

// set deploy property in product collection to true or false
router.put("/deployProduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    // console.log(productId);
    const product = await Product.findById(productId);
    const result = await Product.findByIdAndUpdate(productId, {
      deploy: !product.deploy,
    });
    // console.log(result);
    res.sendStatus(200);
  } catch (err) {
    console.log("Failed to set product deployment property", err.message);
  }
});

// Export router
module.exports = router;
