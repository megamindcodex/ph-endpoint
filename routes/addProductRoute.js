const express = require("express");
const router = express.Router();
const Product = require("../model/product");

// create a new product in the products collection....route
router.post("/addproduct", async (req, res) => {
  try {
    const formData = req.body;
    const product = await Product.create(formData);
    // console.log("data to be sent", formData, product)
    res.status(201).json({ message: "product successfully created" });
    console.log("New product created successfully", product);
  } catch (err) {
    console.error("Error creating new product!", err.message);
  }
});

// Export router
module.exports = router;
