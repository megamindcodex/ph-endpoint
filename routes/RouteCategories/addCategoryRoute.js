const express = require("express");
const router = express.Router();
const Category = require("../../model/category");

// create a new product in the products collection....route
router.post("/addCategory", async (req, res) => {
  try {
    const formData = req.body;

    const category = await Category.create(formData);
    res.status(201).json({ message: " New Category created successfully" });
    console.log("New Category created successfully");
  } catch (err) {
    console.log("Error creating new category", err.message);
  }
});

// Export router
module.exports = router;
