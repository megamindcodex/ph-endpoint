const express = require("express");
const router = express.Router();
const Category = require("../../model/category");

// Update category from the database by Id....route
router.put("/updateCategory/:name", async (req, res) => {
  try {
    const categoryName = req.params.name;
    const categoryToUpdate = req.body;
    const updatedCategory = await Category.findOneAndUpdate(
      { name: categoryName },
      categoryToUpdate,
      { new: true }
    );

    res.status(200).json(updatedCategory);
    console.log("Updated category");
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update category", message: err.message });
  }
});

// Export router
module.exports = router;
