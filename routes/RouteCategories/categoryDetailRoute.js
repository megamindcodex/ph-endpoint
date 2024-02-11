const express = require("express");
const router = express.Router();
const Category = require("../../model/category");

// Get specific category details from the database....route
router.get("/categoryDetail/:name", async (req, res) => {
  try {
    const categoryName = req.params.name;
    // console.log(categoryName);
    const category = await Category.findOne({ name: categoryName });
    if (category) {
      // console.log("category found", category);
      res.status(200).json(category);
    } else {
      console.log("category not found");
      res.status(404).json({ message: "category not found" });
    }
  } catch (err) {
    console.log("Error getting category:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Export router
module.exports = router;
