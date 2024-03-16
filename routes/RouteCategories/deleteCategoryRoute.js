const express = require("express");
const router = express.Router();
const Category = require("../../model/category");

// Delete product from the database by Id....route
router.post("/deleteCategory/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const result = await Category.findByIdAndDelete(categoryId);
    res.status(200).json(result);
  } catch (err) {
    console.error("Failed to delete product", err.message);
  }
});

// Export router
module.exports = router;
