const express = require("express");
const router = express.Router();
const Category = require("../../model/category");

// Get all Category that deploy property is equal to "ture" from the database....route
router.get("/deployedCategories", async (req, res) => {
  try {
    const categories = await Category.find({ deploy: true });
    if (categories.length === 0) {
      return res.status(204).json({ message: "No categories deployed" });
    }
    res.status(200).json(categories);
    // console.log("All Categories found", categories);
  } catch (err) {
    console.log("Error getting categories:", err.message);
    res.status(500).json({ error: "Error getting categories" });
  }
});

// Export router
module.exports = router;
